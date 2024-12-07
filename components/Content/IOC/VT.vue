<template>
  <div>
    <div class="flex items-center border-b-[1px] border-black p-4">
      <img class="inline" src="/static/vt.png" alt="">
      <span class="inline ms-4 font-semibold">VirusTotal</span>
    </div>
    <div>
      <div class="flex flex-nowrap mt-4">
        <p class="font-semibold w-96">Community Score</p>
        <p class="text-red-600">{{ comScore }}</p>
      </div>
      <div class="flex flex-nowrap mt-4">
        <p class="font-semibold w-96">Threat Label</p>
        <p class="text-red-600">{{ threatLabel }}</p>
      </div>
      <div class="flex flex-nowrap mt-4 items-center">
        <p class="font-semibold w-96">Family Label</p>
        <p class="text-red-600 px-3 py-1 rounded-full bg-[#EFAEAE] font-semibold">{{ familyLabel }}</p>
      </div>
      <div class="flex flex-nowrap mt-4 items-center">
        <p class="font-semibold w-96">Threat Categories</p>

        <div class="flex gap-2">
          <p v-for="x in threatCategories" class="text-red-600 px-3 py-1 rounded-full bg-[#EFAEAE] font-semibold">{{
            x }}
          </p>
        </div>
      </div>
      <a class="text-blue-700 mt-8 underline-offset-1 underline block" :href='originLink'>Original Page Link</a>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      comScore: "59/72",
      threatLabel: "trojan.zenpak/graftor",
      familyLabel: "trojan",
      threatCategories: ["zenpak", "graftor", "dridex"],
      originLink: "https://www.virustotal.com/gui/file/178ba564b39bd07577e974a9b677dfd86ffa1f1d0299dfd958eb883c5ef6c3e1"
    }
  },
}
</script>
