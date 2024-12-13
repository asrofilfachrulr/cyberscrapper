import { defineStore } from "pinia";

export const useIOCStore = defineStore("ioc", {
  state: () => ({
    cs: '', // Example score
    lbl: '', // Label for the type of threat
    fl: [], // Label for the threat family
    tc: [], // Array of threat categories
    link: '', // Link to the threat origin,
    pd: ''
  }),

  getters: {
    // Getter for a summary object (useful for display or APIs)
    getData: (state) => ({
      cs: state.cs,
      lbl: state.lbl,
      fl: state.fl,
      tc: state.tc,
      link: state.link
    }),
    getPd: (state) => state.pd
  },

  actions: {
    clear() {
      this.cs = '';
      this.lbl = '';
      this.fl = [];
      this.tc = [];
      this.link = '';
      this.pd = '';
    },

    update({ cs, lbl, fl, tc, link, pd }) {
      if (cs !== undefined) this.cs = cs;
      if (lbl !== undefined) this.lbl = lbl;
      if (fl !== undefined) this.fl = fl;
      if (tc !== undefined) this.tc = tc;
      if (link !== undefined) this.link = link;
      if (pd !== undefined) this.pd = pd;
    },
  },
});
