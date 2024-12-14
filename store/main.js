import { defineStore } from "pinia"

export const useMainStore = defineStore("main", {
  state: () => ({
    mainLoading: false,
    mainModal: false,
    mainModalData: {
      title: '',
      msg: '',
    },
    mainLoadingData: {
      title: '',
      msg: ''
    }
  }),

  getters: {
    isMainLoading: (state) => state.mainLoading,
    isMainModal: (state) => state.mainModal,
    getMainModalData: (state) => state.mainModalData,
    getMainLoadingData: (state) => state.mainLoadingData
  },

  actions: {
    enableMainLoading() {
      this.mainLoading = true
    },

    disableMainLoading() {
      this.mainLoading = false
      this.mainLoadingData.title = ''
      this.mainLoadingData.msg = ''
    },

    enableMainModal() {
      this.mainModal = true
    },

    disableMainModal() {
      this.mainModal = false
      this.mainModalData.title = ''
      this.mainModalData.msg = ''
    },

    updateMainLoadingData({ title, msg }) {
      this.mainLoadingData.title = title
      this.mainLoadingData.msg = msg
    },

    updateMainModalData({ title, msg }) {
      this.mainModalData.title = title
      this.mainModalData.msg = msg
    }
  }
})