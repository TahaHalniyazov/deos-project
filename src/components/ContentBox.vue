<template>
    <div class="content-box">
      <component :is="currentComponent" @notify="notify" />
    </div>
  </template>
  
  <script>
  export default {
    props: {
      currentComponent: {
        type: [Object, String],
        required: true
      }
    },
    methods: {
      notify(message) {
        this.$emit('notify', message);
      }
    }
  }
  </script>
  
  <style lang="sass" scoped>
 

  </style>
  