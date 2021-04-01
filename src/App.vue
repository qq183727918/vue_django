<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {
      containerHeight: {
        height: ''
      }
    }
  },
  created () {
    var docHeight = document.documentElement.clientHeight
    this.containerHeight.height = docHeight - 20 + 'px'
  },
  handleOpen (key, keyPath) {
    console.log(key, keyPath)
  },
  handleClose (key, keyPath) {
    console.log(key, keyPath)
  }
}
</script>

<style>
</style>
