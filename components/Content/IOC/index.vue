<template>
  <div class="sm:pl-[18rem] fixed h-screen w-screen p-8">

    <p class="font-semibold text-lg">Indicator of Compromise Checker</p>
    <form>
      <div class="my-5">
        <input type="email" id="email"
          class="inline-block bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-96 p-2.5"
          placeholder="125.9.37.99, freegames.com, 50d858e0985ec..." v-model="payload" required />
      </div>
      <div class="my-5">
        <div class="flex">
          <span class="font-semibold pr-8">Type: </span>
          <div class="flex gap-6">
            <label for="sha256-radio-ioc-type"><input v-model="rbType" type="radio" name="radio-ioc-type"
                id="hash-radio-ioc-type" value="hash" checked>&nbsp;Hash</label>
            <label for="ip-radio-ioc-type"><input v-model="rbType" type="radio" name="radio-ioc-type"
                id="ip-radio-ioc-type" value="ip">&nbsp;IP</label>
            <label for="domain-radio-ioc-type"><input v-model="rbType" type="radio" name="radio-ioc-type"
                id="domain-radio-ioc-type" value="domain">&nbsp;Domain</label>
          </div>
        </div>
      </div>
      <button type="button" @click="search"
        class="text-white bg-[#153a99] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-8 py-2.5 me-2 mb-2">Search</button>
    </form>


    <div>
      <ContentIOCResult />
    </div>
  </div>
</template>

<script>
import { useIOCStore } from "~/store/ioc"
import { useMainStore } from "~/store/main"

export default {
  data() {
    return {
      rbType: 'hash',
      payload: ''
    }
  },
  methods: {
    async search() {
      const store = useIOCStore()
      store.clear()
      store.update({ pd: this.payload })

      const mainStore = useMainStore()

      try {
        mainStore.updateMainLoadingData({
          title: 'Loading',
          msg: 'Scraping security engine website...'
        })
        mainStore.enableMainLoading()
        const res = await fetch(`/api/ioc?payload=${encodeURIComponent(this.payload)}&type=${this.rbType}`);
        mainStore.disableMainLoading()
        const json = await res.json();
        console.log(json)

        if (json.success) {
          const { data } = json

          store.update({
            cs: data.cs || '',
            lbl: data.lbl || '',
            fl: data.fl || '',
            tc: data.tc || '',
            as: data.as || '',
            img: data.img || '',
            reg: data.reg || '',
            type: data.type || '',
            link: data.link || ''
          })
        } else {
          mainStore.updateMainModalData({
            title: "Error",
            msg: "Web Scrapping Failed"
          })
          mainStore.enableMainModal()
        }
      } catch (err) {
        console.log(err)
      }

    }
  }
}
</script>