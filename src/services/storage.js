import { ref } from 'vue';
import { supabase } from '@/libs/supabase';
import Day from '@/services/date';
import History from '@/services/history';

const TABLE = 'STORAGE';

export default class Storage {
  static arr = ref([]);
  static expired = ref(false);
  static load = ref(false);

  static async read() {
    this.load.value = false;
    await this.clear();

    let { data: ARRAY, error } = await supabase
      .from(TABLE)
      .select(`ITEMS(id, name, ci, isLoss, CATEGORIES(name, id)), count, loss`)
      .order('name', { referencedTable: 'ITEMS', ascending: true });
    if (error) return;
    this.arr.value = ARRAY;
    this.expired.value = searchExpired(this.arr.value);
    this.load.value = true;
  }

  static async clear() {
    let { data: ARRAY } = await supabase.from(TABLE).select(`id, item, count, loss`).order('item', { ascending: true });

    let association = Object.groupBy(ARRAY, ({ item }) => item);

    for (const item in association) {
      if (association[item].length < 2) continue;
      for (let i = 0; i < association[item].length; i++) {
        for (let j = i + 1; j < association[item].length; j++) {
          if (association[item][i].count === 0 || association[item][j].count === 0) continue;
          if (association[item][i].loss !== association[item][j].loss) continue;
          await assoc(association[item][i], association[item][j]);
          association[item][i].count += association[item][j].count;
          association[item][j].count = 0;
        }
      }
    }
    await supabase.from(TABLE).delete().lte('count', 0);
  }

  static async accept(donator, items) {
    const payload = [];
    items.forEach((item) => {
      payload.push({
        item: item.item.id,
        count: item.count,
        loss: Day.getDateForDB(item.loss),
      });
    });
    const { error } = await supabase.from(TABLE).insert(payload);

    if (error) return false;
    History.accept(donator, items);
    this.read();
    return true;
  }

  static async donate(acceptor, items) {
    const payload = [];
    items.forEach((item) => {
      payload.push({
        item: item.item.ITEMS.id,
        count: item.count,
        countOld: item.countOld,
        loss: item.item.loss,
      });
    });

    let err = null;
    for await (const i of payload) {
      const { error } = await supabase
        .from(TABLE)
        .update({ count: i.countOld - i.count })
        .eq('item', i.item)
        .eq('loss', i.loss);
      if (error) err = true;
    }

    if (err) return false;
    History.donate(acceptor, items);
    this.read();
    return true;
  }
}

async function assoc(one, two) {
  const { error } = await supabase
    .from(TABLE)
    .update({ count: one.count + two.count })
    .eq('id', one.id);

  if (error) return;
  await supabase.from(TABLE).update({ count: 0 }).eq('id', two.id);
}

function searchExpired(items) {
  const dateExpired = Day.getDateExpired();
  const itemsWithLoss = items.filter((i) => i.ITEMS.isLoss);
  const expiredItems = itemsWithLoss.filter((i) => Day.comparisonDateExpired(dateExpired, i.loss));
  return !!expiredItems.length;
}
