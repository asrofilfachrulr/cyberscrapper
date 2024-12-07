<template>
  <div class="relative">
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
import index from '../components/Content/Index.vue'
import ioc from '../components/Content/IOC/index.vue'
import db from '../components/Content/DBreach.vue'
import te from '../components/Content/TExplorer.vue'


export default {
  data() {
    return {
      currentComponent: index
    }
  },
  methods: {
    sidebarMenuChange(p) {
      console.log(`change menu to ${p}`)
      switch (p) {
        case "ioc":
          this.currentComponent = ioc
          break
        case "db":
          this.currentComponent = db
          break
        case "te":
          this.currentComponent = te
          break
        default:
          this.currentComponent = index
      }
    }
  }
}
</script>