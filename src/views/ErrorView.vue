<template>
  <h1>Error</h1>
  <h3>{{ err }}</h3>
</template>

<script>
export default {
  name: "ErrPage",
  data() {
    return {
      err: this.$route.params.err,
    }
  },
}
</script>
