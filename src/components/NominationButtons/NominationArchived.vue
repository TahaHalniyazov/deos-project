<template>
    <div class="nomination-container">
      <div class="nomination-list" v-if="!showArchivedEventDetails">      
        <div class="search-and-filter">
          <div class="search-box">
            <input type="text" placeholder="Найти" v-model="archivedFilterQuery" />
            <img :src="require('@/assets/image/Search.svg')" alt="" class="">
          </div>
          <div class="filter-settings">
            <button>Фильтр</button>       
            <img :src="require('@/assets/image/Swap.svg')" alt="" class="">
          </div>
        </div>
        <div class="nominations">
          <div class="nomination-item" v-for="archivedNomination in archivedFilteredNominations" :key="archivedNomination.id" @click="showArchivedNominationDetails(archivedNomination)">
            <h3>{{ archivedNomination.title }} {{ archivedNomination.date }} в {{ archivedNomination.time }}</h3>
            <p>{{ archivedNomination.category }}</p>
          </div>
        </div>      
      </div>
      <NominationArchivedEventDetail v-if="archivedSelectedNomination" :archivedNomination="archivedSelectedNomination" />
    </div>
  </template>
  
  <script>
  import NominationArchivedEventDetail from '@/components/NominationButtons/NominationArchivedEventDetail.vue';
  
  export default {
    name: 'NominationArchived',
    components: {
      NominationArchivedEventDetail
    },
    data() {
      return {
        archivedFilterQuery: '',
        archivedSelectedNomination: null,
        archivedNominations: [
          { id: 1, title: 'Архивная Номинация 1', date: '12.01.21', time: '14:00', category: 'Категория 1' },
          { id: 2, title: 'Архивная Номинация 2', date: '15.01.21', time: '15:00', category: 'Категория 2' },
          { id: 3, title: 'Архивная Номинация 3', date: '18.01.21', time: '16:00', category: 'Категория 3' },
          { id: 4, title: 'Архивная Номинация 4', date: '20.01.21', time: '17:00', category: 'Категория 4' },
          // Добавьте больше архивных номинаций
        ],
      };
    },
    computed: {
      archivedFilteredNominations() {
        return this.archivedNominations.filter(archivedNomination => archivedNomination.date.includes(this.archivedFilterQuery));
      }
    },
    methods: {
      showArchivedNominationDetails(archivedNomination) {
        this.archivedSelectedNomination = archivedNomination;
        this.showArchivedEventDetails = true; // Показываем детали архивной номинации
      }
    }
  };
  </script>
  
  <style scoped lang="sass">
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
  