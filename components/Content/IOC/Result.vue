<template>
  <div class="bg-white w-full min-h-96 max-h-[600px] mt-8 overflow-hidden rounded-md p-8">
    <p class="font-semibold">Security Engine Result<span v-if="payload != ''"> for {{ payload }}</span></p>

    <div class="max-h-[540px] overflow-auto mt-6">
      <ContentIOCVT />
    </div>

  </div>
</template>

<script>
import { useIOCStore } from "~/store/ioc"

export default {
  computed: {
    payload() {
      const store = useIOCStore()
      return store.getPd
    }
  }
}
</script>