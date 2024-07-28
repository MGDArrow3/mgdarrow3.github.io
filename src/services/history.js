import { supabase } from '@/libs/supabase';
import Auth from '@/services/auth';
import Day from '@/services/date';

const TABLE = 'HISTORY';

export default class History {
  static async read(start, end) {
    let { data: HISTORY } = await supabase
      .from('HISTORY')
      .select(`created_at, created_user, ITEMS(name, ci, isLoss), count, loss, DONORS(name), GIVERS(name)`)
      .order('created_at', { ascending: false })
      .range(start, end);
    return HISTORY;
  }

  static async readMonth(date) {
    const startDate = Day.getStartDate(date);
    const endDate = Day.getEndDate(date);

    let { data: ARRAY } = await supabase
      .from(TABLE)
      .select(`created_at, created_user, ITEMS(name, ci, isLoss), count, loss, DONORS(name), GIVERS(name)`)
      .gte('created_at', startDate)
      .lte('created_at', endDate);
    return ARRAY;
  }

  static async accept(donator, items) {
    const payload = [];
    items.forEach((item) => {
      payload.push({
        created_user: Auth.username.value,
        item: item.item.id,
        count: item.count,
        loss: Day.getDateForDB(item.loss),
        donator: donator.id,
      });
    });
    const { error } = await supabase.from(TABLE).insert(payload);
    if (error) return false;
    return true;
  }

  static async donate(acceptor, items) {
    const payload = [];
    items.forEach((item) => {
      payload.push({
        created_user: Auth.username.value,
        item: item.item.ITEMS.id,
        count: item.count,
        loss: item.item.loss,
        giver: acceptor.id,
      });
    });
    const { error } = await supabase.from(TABLE).insert(payload);
    if (error) return false;
    return true;
  }
}
