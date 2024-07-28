import { ref } from 'vue';
import { supabase } from '@/libs/supabase';
import Auth from '@/services/auth';
import Categories from '@/services/categories';
import Storage from '@/services/storage';

const TABLE = 'ITEMS';

export default class Items {
  static arr = ref([]);
  static load = ref(false);

  static async read() {
    this.load.value = false;
    let { data: ARRAY, error } = await supabase
      .from(TABLE)
      .select(`id, name, created_at, created_user, ci, isLoss, CATEGORIES(name, id)`)
      .order('name', { ascending: true });
    if (error) return;
    this.arr.value = ARRAY;
    Storage.read();
    this.load.value = true;
  }

  static async create(name, category, ci, isLoss) {
    let cies = ci;
    if (Object.keys(cies).length === 0) {
      cies = {
        one: 'штука',
        two: 'штуки',
        five: 'штук',
      };
    }
    const { error } = await supabase
      .from(TABLE)
      .insert([{ name, created_user: Auth.username.value, category: category.id, ci: cies, isLoss }])
      .select();

    if (error) return false;
    Categories.read();
    this.read();
    return true;
  }

  static async update(name, id, category, ci, isLoss) {
    const { error } = await supabase.from(TABLE).update({ name, category, ci, isLoss }).eq('id', id).select();

    if (error) return false;
    // eslint-disable-next-line prefer-destructuring
    Categories.read();
    this.read();
    return true;
  }

  static async delete(id) {
    const { error } = await supabase.from(TABLE).delete().eq('id', id);
    if (error) return false;

    Categories.read();
    this.read();
    return true;
  }
}
