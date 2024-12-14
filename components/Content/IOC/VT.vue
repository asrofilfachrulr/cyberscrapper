<template>
  <div>
    <div class="flex items-center border-b-[1px] border-black p-4">
      <img class="inline" src="/static/vt.png" alt="">
      <span class="inline ms-4 font-semibold">VirusTotal</span>
    </div>
    <div v-if="data.type == 'h'">
      <div class="flex flex-nowrap my-8">
        <p class="font-semibold w-96">Community Score</p>
        <div v-if="data.cs != ''">

          <p class="text-red-600">{{ data.cs }}</p>
        </div>
      </div>
      <div class="flex flex-nowrap my-8">
        <p class="font-semibold w-96">Threat Label</p>
        <div v-if="data.lbl != ''">

          <p class="text-red-600">{{ data.lbl }}</p>
        </div>
      </div>
      <div class="flex flex-nowrap my-8 items-center">
        <p class="font-semibold w-96">Family Label</p>
        <div v-if="data.fl.length > 0" class="flex gap-2">

          <p v-for="x in data.fl" class="text-red-600 px-3 py-1 rounded-full bg-[#EFAEAE] font-semibold">{{
            x }}</p>
        </div>
      </div>
      <div class="flex flex-nowrap my-8 items-center">
        <p class="font-semibold w-96">Threat Categories</p>

        <div v-if="data.tc.length > 0" class="flex gap-2">
          <p v-for="x in data.tc" class="text-red-600 px-3 py-1 rounded-full bg-[#EFAEAE] font-semibold">
            {{
              x }}
          </p>
        </div>
      </div>
      <a v-if="data.link != ''" class="text-black mt-8 underline-offset-1 underline block" :href='data.link'
        target="_blank">Original Page
        Link</a>
      <a v-if="data.lbl != ''" class="text-black mt-4 underline-offset-1 underline block"
        :href='`https://www.google.com/search?q=${encodeURIComponent(data.lbl)}`' target="_blank">Search this label at
        Google</a>

    </div>
    <div v-else-if="data.type == 'i'">
      <div class="flex flex-nowrap my-8">
        <p class="font-semibold w-96">Community Score</p>
        <div v-if="data.cs != ''">

          <p class="text-red-600">{{ data.cs }}</p>
        </div>
      </div>
      <div class="flex flex-nowrap my-8">
        <p class="font-semibold w-96">AS</p>
        <div v-if="data.as != ''">

          <p class="text-red-600">{{ data.as }}</p>
        </div>
      </div>
      <div class="flex flex-nowrap my-8">
        <p class="font-semibold w-96">Country</p>
        <div v-if="data.img != ''">
          <img :src="data.img" alt="#">
        </div>
      </div>
      <a v-if="data.link != ''" class="text-black mt-8 underline-offset-1 underline block" :href='data.link'
        target="_blank">Original Page
        Link</a>
    </div>
    <div v-else-if="data.type == 'd'">
      <div class="flex flex-nowrap my-8">
        <p class="font-semibold w-96">Community Score</p>
        <div v-if="data.cs != ''">

          <p class="text-red-600">{{ data.cs }}</p>
        </div>
      </div>
      <div class="flex flex-nowrap my-8">
        <p class="font-semibold w-96">Registrar</p>
        <div v-if="data.reg != ''">
          <p class="text-red-600">{{ data.reg }}</p>
        </div>
      </div>
      <a v-if="data.link != ''" class="text-black mt-8 underline-offset-1 underline block" :href='data.link'
        target="_blank">Original Page
        Link</a>

    </div>
  </div>
</template>
<script>
import { useIOCStore } from '~/store/ioc'

export default {
  computed: {
    data() {
      const store = useIOCStore()
      return store.getData
    },

  }
}
</script>
