import { ref } from 'vue';
import { supabase } from '@/libs/supabase';
import Auth from '@/services/auth';

const TABLE = 'GIVERS';

export default class Givers {
  static arr = ref([]);
  static load = ref(false);

  static async read() {
    this.load.value = false;
    let { data: ARRAY, error } = await supabase
      .from(TABLE)
      .select(`id, name, created_at, created_user`)
      .order('name', { ascending: true });
    if (error) return;
    this.arr.value = ARRAY;
    this.load.value = true;
  }

  static async create(name) {
    const { error } = await supabase
      .from(TABLE)
      .insert([{ name, created_user: Auth.username.value }])
      .select();

    if (error) return false;
    this.read();
    return true;
  }

  static async update(name, id) {
    const { error } = await supabase.from(TABLE).update({ name: name }).eq('id', id).select();

    if (error) return false;
    // eslint-disable-next-line prefer-destructuring
    this.read();
    return true;
  }

  static async delete(id) {
    const { error } = await supabase.from(TABLE).delete().eq('id', id);
    if (error) return false;

    this.read();
    return true;
  }
}
