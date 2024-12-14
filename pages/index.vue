<template>
  <div class="relative">
    <div
      :class="'fixed top-0 left-0 w-screen h-screen z-50 bg-black/65 flex items-center justify-center' + (isLoading ? '' : ' hidden')">
      <dialog id="mainLoading" class="modal" :open="isLoading">
        <div class="modal-box">
          <h3 id="mainLoadingTitle" class="text-lg font-bold">{{ mainLoadingData.title }}</h3>
          <p v-if="isLoading" id="mainLoadingMsg" class="py-4 flex justify-start items-center gap-3"><span
              class="loading loading-ring loading-lg"></span>
            <span>{{ mainLoadingData.msg }}</span>
          </p>
        </div>
      </dialog>
    </div>
    <div
      :class="'fixed top-0 left-0 w-screen h-screen z-50 bg-black/65 flex items-center justify-center' + (isModal ? '' : ' hidden')">
      <dialog id="mainModal" class="modal" :open="isModal">
        <div class="modal-box">
          <h3 id="mainModalTitle" class="text-lg font-bold">{{ mainModalData.title }}</h3>
          <p id="mainModalMsg" class="py-4">{{ mainModalData.msg }}</p>
          <div class="modal-action">
            <form method="dialog">
              <button class="btn" @click="disableMainModal">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
    <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar"
      type="button"
      class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
      <span class="sr-only">Open sidebar</span>
      <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg">
        <path clip-rule="evenodd" fill-rule="evenodd"
          d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z">
        </path>
      </svg>
    </button>
    <Sidebar @sidebarMenuClicked="sidebarMenuChange" />
    <Transition name="fade">
      <component :is="currentComponent" />
    </Transition>
  </div>
</template>

<script>
import { shallowRef } from 'vue'

import index from '../components/Content/Index.vue'
import ioc from '../components/Content/IOC/index.vue'
import db from '../components/Content/DBreach.vue'
import te from '../components/Content/TExplorer.vue'

import { useMainStore } from '~/store/main'

export default {
  data() {
    return {
      currentComponent: shallowRef(index)
    }
  },

  computed: {
    isLoading() {
      const store = useMainStore()
      return store.isMainLoading
    },
    mainLoadingData() {
      const store = useMainStore()
      return store.getMainLoadingData
    },
    isModal() {
      const store = useMainStore()
      return store.isMainModal
    },
    mainModalData() {
      const store = useMainStore()
      return store.getMainModalData
    }
  },

  methods: {
    sidebarMenuChange(p) {
      console.log(`change menu to ${p}`)
      switch (p) {
        case "ioc":
          this.currentComponent = shallowRef(ioc)
          break
        case "db":
          this.currentComponent = shallowRef(db)
          break
        case "te":
          this.currentComponent = shallowRef(te)
          break
        default:
          this.currentComponent = shallowRef(index)
      }
    },
    disableMainModal() {
      const store = useMainStore()
      store.disableMainModal()
    }
  }
}
</script>