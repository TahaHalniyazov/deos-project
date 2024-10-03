<template>
    <div v-if="isMobile" class="search-input">
      <input type="text" v-model="query" placeholder="Поиск..." />
    </div>
  </template>
  
  <script>

  export default {
   
    data() {
      return {
        query: '',
        isMobile: false,
      };
    },
    mounted() {
      this.checkIfMobile();
      window.addEventListener('resize', this.checkIfMobile);
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.checkIfMobile);
    },
    methods: {
      checkIfMobile() {
        this.isMobile = window.innerWidth <= 768; // Например, если ширина <= 768px, то это мобильная версия
      },
    },
  };
  </script>
  
  <style lang="sass" scoped>
  .search-input 
    margin-top: 10px 
    display: flex
  
  input 
    width: 85%
    
    border-radius: 20px
    border: 1px solid $active-color
  
  </style>
  