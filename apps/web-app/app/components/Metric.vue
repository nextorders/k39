<template>
  <ClientOnly v-if="isProd">
    <noscript>
      <img src="https://mc.yandex.ru/watch/105112583" style="position:absolute; left:-9999px;" alt="" />
    </noscript>
  </ClientOnly>
</template>

<script setup lang="ts">
const isProd = !import.meta.dev

useHead({
  script: [isProd && {
    src: '/js/wthgiyojuv0xgxgrpn5wd6xz.min.js',
  }],
})
</script>
