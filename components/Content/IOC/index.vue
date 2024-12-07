<template>
  <div class="sm:pl-[18rem] fixed h-screen w-screen p-8">

    <p class="font-semibold text-lg">Indicator of Compromise Checker</p>
    <form>
      <div class="my-5">
        <input type="email" id="email"
          class="inline-block bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-96 p-2.5"
          placeholder="125.9.37.99, freegames.com, 50d858e0985ec..." required />
      </div>
      <div class="my-5">
        <div class="flex">
          <span class="font-semibold pr-8">Type: </span>
          <div class="flex gap-6">
            <label for="ip-radio-ioc-type"><input type="radio" name="radio-ioc-type"
                id="ip-radio-ioc-type">&nbsp;IP</label>
            <label for="domain-radio-ioc-type"><input type="radio" name="radio-ioc-type"
                id="domain-radio-ioc-type">&nbsp;Domain</label>
            <label for="sha256-radio-ioc-type"><input type="radio" name="radio-ioc-type"
                id="sha256-radio-ioc-type">&nbsp;SHA256</label>
            <label for="md5-radio-ioc-type"><input type="radio" name="radio-ioc-type"
                id="md5-radio-ioc-type">MD5</label>
          </div>
        </div>
      </div>
      <button type="button"
        class="text-white bg-[#153a99] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-8 py-2.5 me-2 mb-2">Search</button>
    </form>


    <div>
      <ContentIOCResult />
    </div>
  </div>
</template>