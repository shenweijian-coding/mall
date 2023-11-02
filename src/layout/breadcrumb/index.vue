<template>
  <a-breadcrumb>
    <a-breadcrumb-item v-for="(href, i) in breadcrumbRoutes" :key="i">
      <router-link v-if="href.to" :to="href.to">{{ href.label }}</router-link>
      <span v-else>{{ href.label }}</span>
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>
<script setup>
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'
  const route = useRoute()
  console.log(route)
  const breadcrumbRoutes = computed(() => {
    // 根据当前路由生成面包屑导航
    const matchedRoutes = route.matched
    const breadcrumbRoutes = []

    for (const routeRecord of matchedRoutes) {
      // if (routeRecord.meta?.belong) {
      //   breadcrumbRoutes.push({
      //     to: routeRecord.meta?.belong,
      //     label: route.matched.find((o) => o.path == routeRecord.meta?.belong)
      //       .meta?.title,
      //   })
      // }
      breadcrumbRoutes.push({
        to: routeRecord.path == route.path ? '' : routeRecord.path,
        label: routeRecord.meta.title,
      })
    }

    return breadcrumbRoutes
  })
</script>
