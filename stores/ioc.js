import { defineStore } from "pinia";

export const useIOCStore = defineStore("ioc", {
  state: () => ({
    comScore: 0, // Example score
    threatLabel: '', // Label for the type of threat
    familyLabel: '', // Label for the threat family
    threatCategories: [], // Array of threat categories
    originLink: '', // Link to the threat origin
  }),

  getters: {
    // Getter for a summary object (useful for display or APIs)
    summary: (state) => ({
      score: state.comScore,
      threat: state.threatLabel,
      family: state.familyLabel,
      categories: state.threatCategories,
      link: state.originLink,
    }),
  },

  actions: {
    // Action to set the comScore
    setComScore(score) {
      this.comScore = score;
    },

    // Action to set the threat label
    setThreatLabel(label) {
      this.threatLabel = label;
    },

    // Action to set the family label
    setFamilyLabel(label) {
      this.familyLabel = label;
    },

    // Action to add a category to threatCategories
    setThreatCategory(categories) {
      this.threatCategories = categories

    },

    // Action to clear all threat categories
    clearThreatCategories() {
      this.threatCategories = [];
    },

    // Action to set the origin link
    setOriginLink(link) {
      this.originLink = link;
    },

    // Action to update multiple fields at once
    updateIOCData({ comScore, threatLabel, familyLabel, threatCategories, originLink }) {
      if (comScore !== undefined) this.comScore = comScore;
      if (threatLabel !== undefined) this.threatLabel = threatLabel;
      if (familyLabel !== undefined) this.familyLabel = familyLabel;
      if (threatCategories !== undefined) this.threatCategories = threatCategories;
      if (originLink !== undefined) this.originLink = originLink;
    },
  },
});
