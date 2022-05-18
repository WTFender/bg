<template>
  <q-card class="blank-card">
    <ContentLoader 
        :speed=speed
        width=300
        height=240
    >
      <rect x="16" y="30" rx="3" ry="3" width="260" height="100" />
      <rect x="16" y="140" rx="3" ry="3" width="150" height="20" /> 
      <rect x="16" y="170" rx="3" ry="3" width="260" height="12" /> 
      <rect x="16" y="188" rx="3" ry="3" width="260" height="12" /> 
      <rect x="16" y="206" rx="3" ry="3" width="260" height="12" /> 
    </ContentLoader>
  </q-card>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
export default {
  name: "BlankCard",
  components: { ContentLoader },
  data(){
    return {
      speed: 2
    }
  }
};
</script>

<style scoped lang="sass">
.blank-card
  width: 300px !important
  height: 240px !important
</style>
