import { defineStore } from "pinia";

export const useNewsStore = defineStore("news", {
  state: () => ({
    news: []
  }),

  getters: {
    // Getter for a summary object (useful for display or APIs)
    getNews: (state) => state.news
  },

  actions: {
    update(news) {
      this.news = news
    }
  }
})
