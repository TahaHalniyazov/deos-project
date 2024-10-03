<template>
    <div class="host-list-main">
      <div class="host-list-container" v-if="!selectedHost">
        <div class="search-filter">
          <div class="search-container">
            <input type="text" placeholder="Найти" v-model="searchQuery" />
            <img :src="require('@/assets/image/Search.svg')" alt="" />
          </div>
          <div class="filter-options">
            <button>Фильтр</button>       
            <img :src="require('@/assets/image/Swap.svg')" alt="" />
          </div>
        </div>
        <div class="host-list">
          <div class="host-card" v-for="host in filteredHosts" :key="host.name" @click="selectHost(host)">
            <h3>{{ host.name }}</h3>
            <p>Логин: {{ host.login }}</p>
          </div>
        </div>      
      </div>
      <HostActiveEventDetail 
        v-if="selectedHost" 
        :host="selectedHost" 
        @host-deleted="onHostDeleted" 
      />
    </div>
  </template>
  
  <script>
  import HostActiveEventDetail from './HostActiveEventDetail.vue';
  import HostDelete from './HostDelete.vue';
  
  export default {
    name: 'HostActive',
    components: {
      HostActiveEventDetail,
      HostDelete
    },
    data() {
      return {
        searchQuery: '',
        selectedHost: null
      };
    },
    computed: {
      hosts() {
        return this.$store.getters.hosts;
      },
      filteredHosts() {
        return this.hosts.filter(host =>
          host.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
    },
    methods: {
      selectHost(host) {
        this.selectedHost = host;
      },
      onHostDeleted() {
        this.selectedHost = null; // Сбрасываем выбранного ведущего после удаления
      }
    }
  };
  </script>
  
  <style scoped lang="sass">
  .host-list-main 
    display: flex
    flex-direction: column
    transition: 0.5s all
  
  .host-list-container
    padding: 20px
    background: $second-active-color
    max-width: 380px
    border-radius: 20px
    margin-left: -30px
    height: 83vh
    overflow: hidden
  
  .search-filter
    display: flex
    justify-content: space-between
    flex-direction: column
  
    input
      margin-bottom: 0
      padding: 0   
      
    .filter-options
      display: flex
      justify-content: space-between
      background: white
      border: 1px solid white
      border-radius: 20px
      width: 100%
      margin: 10px 0
      img
        margin-right: 8px
      
      button
        padding: 10px 15px
  
  .host-list
    overflow-y: auto
    max-height: 67vh
    
    &::-webkit-scrollbar 
      width: 10px
      background-color: $second-active-color
    
    &::-webkit-scrollbar-thumb 
      background-color: #00044B
      border-radius: 10px
      width: 10px
      background-clip: padding-box
    
    &::-webkit-scrollbar-thumb:hover 
      background-color: $active-color
    
    &::-webkit-scrollbar-track 
      background-color: #ccc
    
    &::-webkit-scrollbar-thumb:hover 
      background-color: #00044B
  
    .host-card
      background-color: white
      padding: 15px
      border-radius: 15px
      margin-bottom: 10px
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1)
  
  .search-container
    display: flex
    padding: 10px
    border: 1px solid white
    border-radius: 30px
    align-items: center

@media (max-width:1200px)
  .host-list-container
    height: 84vh 
@media (max-width:480px)


  .host-list-container
    margin-left: 0
    background: $bg-color
    border-radius: 0
    padding: 0
    max-width: 100%
    .search-container
      display: none
  .host-list
    padding-right: 0
  </style>
  