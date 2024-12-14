<template>
  <div class="p-8 sm:ml-64">
    <h3 class="text-lg font-semibold">Trending News powered by <a class="underline"
        href="https://thehackernews.com/">thehackernews.com</a></h3>
    <div class="flex w-100 gap-8 flex-wrap mt-8">
      <div v-for="news in getNews" class="card bg-base-100 w-56 flex-shrink-0">
        <figure>
          <img style="width: 100% !important; max-height: 120px; object-fit: cover" :src="news.imgLink" alt="Shoes" />
        </figure>
        <div class="card-body">
          <p class="text-sm">{{ news.title }}</p>
          <div class="card-actions justify-end">
            <a :href="news.link" target="_blank"><button class="btn btn-primary text-white">Visit</button></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useNewsStore } from '~/store/news'
import { useMainStore } from "~/store/main"

export default {

  computed: {
    getNews() {
      const store = useNewsStore()
      return store.getNews
    }
  },
  async mounted() {
    const mainStore = useMainStore()

    try {
      mainStore.updateMainLoadingData({
        title: 'Loading',
        msg: 'Scraping security news website...'
      })
      mainStore.enableMainLoading()
      const res = await fetch("http://localhost:8080/scrape-news")
      mainStore.disableMainLoading()
      const json = await res.json()
      console.log(json)


      if (json.success) {
        const { news } = json
        const store = useNewsStore()
        store.update(news)
      } else {
        mainStore.updateMainModalData({
          title: "Error",
          msg: "Web Scrapping Failed"
        })
        mainStore.enableMainModal()
      }
    } catch (e) {
      console.log(e)
    }
  }
}
</script>