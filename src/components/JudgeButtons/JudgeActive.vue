<template>
    <div class="judge-list-main">
      <div class="judge-list-container" v-if="!selectedJudge">
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
        <div class="judge-list">
          <div class="judge-card" v-for="judge in filteredJudges" :key="judge.name" @click="selectJudge(judge)">
            <h3>{{ judge.name }}</h3>
            <p>Логин: {{ judge.login }}</p>
          </div>
        </div>      
      </div>
      <JudgeActiveEventDetail 
        v-if="selectedJudge" 
        :judge="selectedJudge" 
        @judge-deleted="onJudgeDeleted" 
      />
    </div>
  </template>
  
  <script>
  import JudgeActiveEventDetail from './JudgeActiveEventDetail.vue';
  import JudgeDelete from './JudgeDelete.vue';
  
  export default {
    name: 'JudgeActive',
    components: {
      JudgeActiveEventDetail,
      JudgeDelete
    },
    data() {
      return {
        searchQuery: '',
        selectedJudge: null
      };
    },
    computed: {
      judges() {
        return this.$store.getters.judges;
      },
      filteredJudges() {
        return this.judges.filter(judge =>
          judge.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
    },
    methods: {
      selectJudge(judge) {
        this.selectedJudge = judge;
      },
      onJudgeDeleted() {
        this.selectedJudge = null; // Сбрасываем выбранного судью после удаления
      }
    }
  };
  </script>
  
  <style scoped lang="sass">
  .judge-list-main 
    display: flex
    flex-direction: column
    transition: 0.5s all
  
  .judge-list-container
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
  
  .judge-list
    overflow-y: auto
    max-height: 67vh
    padding-right: 10px
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
  
    .judge-card
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
  .judge-list-container
    height: 84vh 
@media (max-width:480px)


  .judge-list-container
    margin-left: 0
    background: $bg-color
    border-radius: 0
    padding: 0
    max-width: 100%
    .search-container
      display: none
  .judge-list
    padding-right: 0
  </style>
  