import { ref } from 'vue';
import { supabase } from '@/libs/supabase';

export default class Auth {
  static user = ref(null);
  static username = ref(null);

  static async getUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;
    this.user.value = user;
    this.username.value = user.user_metadata.username;
  }

  static async signUp(payload) {
    let { data, error } = await supabase.auth.signUp({
      email: payload.email,
      password: payload.password,
      options: {
        data: {
          username: payload.username,
        },
      },
    });

    if (error) return false;

    this.user.value = data.user;
    this.username.value = data.user.user_metadata.username;

    return true;
  }

  static async signIn(payload) {
    let { data, error } = await supabase.auth.signInWithPassword({
      email: payload.email,
      password: payload.password,
    });

    if (error) return false;

    this.user.value = data.user;
    this.username.value = data.user.user_metadata.username;

    return true;
  }

  static async isAuthenticated() {
    if (this.user.value !== null) return true;

    await this.getUser();

    if (this.user.value !== null) return true;

    return false;
  }

  static async updateUsername(username) {
    const { data, error } = await supabase.auth.updateUser({
      data: {
        username: username,
      },
    });
    if (error) return false;

    this.user.value = data.user;
    this.username.value = data.user.user_metadata.username;
    return true;
  }

  static async logOut() {
    await supabase.auth.signOut();
    this.user.value = null;
    this.username.value = null;
  }
}
