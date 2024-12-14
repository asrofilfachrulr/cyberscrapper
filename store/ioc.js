import { defineStore } from "pinia";

export const useIOCStore = defineStore("ioc", {
  state: () => ({
    cs: '', // Example score
    lbl: '', // Label for the type of threat
    fl: [], // Label for the threat family
    tc: [], // Array of threat categories
    as: '',
    img: '',
    reg: '',
    link: '', // Link to the threat origin,
    type: '',
    pd: ''
  }),

  getters: {
    // Getter for a summary object (useful for display or APIs)
    getData: (state) => ({
      cs: state.cs,
      lbl: state.lbl,
      fl: state.fl,
      tc: state.tc,
      as: state.as,
      img: state.img,
      reg: state.reg,
      type: state.type,
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
      this.as = ''
      this.img = ''
      this.reg = ''
      this.link = '';
      this.type = ''
      this.pd = '';
    },

    update({ cs, lbl, fl, tc, as, img, reg, link, pd, type }) {
      if (cs !== undefined) this.cs = cs;
      if (lbl !== undefined) this.lbl = lbl;
      if (fl !== undefined) this.fl = fl;
      if (tc !== undefined) this.tc = tc;
      if (as !== undefined) this.as = as;
      if (img !== undefined) this.img = img;
      if (reg !== undefined) this.reg = reg;
      if (link !== undefined) this.link = link;
      if (pd !== undefined) this.pd = pd;
      if (type !== undefined) this.type = type;
    },
  },
});
