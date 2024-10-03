<template>
    <div class="nomination-container">
      <div class="nomination-list" v-if="!showEventDetails">           
        <div class="search-and-filter">
          <div class="search-box">
            <input type="text" placeholder="Найти" v-model="filterQuery" />
            <img :src="require('@/assets/image/Search.svg')" alt="" class="">
          </div>
          <div class="filter-settings">
            <button>Фильтр</button>       
            <img :src="require('@/assets/image/Swap.svg')" alt="" class="">
          </div>
        </div>
        <div class="nominations">
          <div class="nomination-item" v-for="nomination in filteredNominations" :key="nomination.id" @click="showNominationDetails(nomination)">
            <h3>{{ nomination.title }} {{ nomination.date }} в {{ nomination.time }}</h3>
            <p>{{ nomination.category }}</p>
          </div>
        </div>      
      </div>
      <NominationEventDetail v-if="selectedNomination" :nomination="selectedNomination" />
    </div>
  </template>
  
  <script>
  import NominationEventDetail from '@/components/NominationButtons/NominationEventDetail.vue';
  
  export default {
    name: 'NominationActive',
    components: {
      NominationEventDetail
    },
    data() {
      return {
        filterQuery: '',
        selectedNomination: null,
        nominations: [
          { id: 1, title: 'Название номинации полное без аббревиатур по центру контейнера 1', date: '12.01.21', time: '14:00', category: 'Категория 1' },
          { id: 2, title: 'Номинация 2', date: '15.01.21', time: '15:00', category: 'Категория 2' },
          { id: 3, title: 'Номинация 3', date: '18.01.21', time: '16:00', category: 'Категория 3' },
          { id: 4, title: 'Номинация 4', date: '20.01.21', time: '17:00', category: 'Категория 4' },
          // Добавьте больше номинаций
        ],
      };
    },
    computed: {
      filteredNominations() {
        return this.nominations.filter(nomination => nomination.date.includes(this.filterQuery));
      }
    },
    methods: {
      showNominationDetails(nomination) {
        this.selectedNomination = nomination;
        this.showEventDetails = true; // Показываем детали номинации
      }
    }
  };
  </script>
  
  <style lang="sass" scoped >
  .nomination-list
    padding: 20px
    background: $second-active-color
    max-width: 380px
    border-radius: 20px
    margin-left: -30px
    height: 83vh
    overflow: hidden
  
  .search-and-filter
    display: flex
    justify-content: space-between
    flex-direction: column
  
    input
      margin-bottom: 0
      padding: 0   
      
  .filter-settings
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
  
  .nominations
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
  
  .nomination-item
    background-color: white
    padding: 15px
    border-radius: 15px
    margin-bottom: 10px
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1)
  
  .search-box
    display: flex
    padding: 10px
    border: 1px solid white
    border-radius: 30px
    align-items: center
    

@media (max-width:1200px)
  .nomination-list
    height: 84vh 
@media (max-width:480px)
  .nomination-list
    background: $bg-color
    max-width: 100% 
    margin-left: 0
    border-radius: 0
    padding: 0
  .search-box
    display: none
  
  .nominations
    
    padding-right: 0
      
  </style>
  