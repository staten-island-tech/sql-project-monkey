import { defineStore } from 'pinia'
import supabase from '../lib/supabaseClient'

export const authStore = defineStore('auth', {
  state: () => {
    return {
      currentuser: null
    }
  },

  actions: {
    loaduser() {
      this.currentuser = supabase.auth.user()
    }
  },
  clearuser() {
    this.currentuser = null
  },
  getters: {
    isAuthenticated() {
      return !!this.currentuser
    }
  }
})
