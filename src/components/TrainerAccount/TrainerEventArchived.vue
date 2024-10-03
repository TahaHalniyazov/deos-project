<template>
    <div class="trainer-archived-events-main">
      <div class="trainer-archived-events" v-if="!showEventDetails">      
        <div class="trainer-archived-search-filter">
          <div class="trainer-archived-search-container">
            <input type="text" placeholder="Найти" v-model="trainerArchivedSearchQuery" />
            <img :src="require('@/assets/image/Search.svg')" alt="" class="">
          </div>
          <div class="trainer-archived-filter-options">
            <button>Фильтр </button>       
            <img :src="require('@/assets/image/Swap.svg')" alt="" class="">
          </div>
        </div>
        <div class="trainer-archived-events-list">
          <div class="trainer-archived-event-card" v-for="event in filteredTrainerArchivedEvents" :key="event.id" @click="selectTrainerArchivedEvent(event)">
            <h3>{{ event.title }} {{ event.date }} в {{ event.time }}</h3>
            <p> </p>
            <p>{{ event.nomination }}</p>
          </div>
        </div>      
      </div>
      <TrainerArchivedEventDetail v-if="selectedTrainerArchivedEvent" :event="selectedTrainerArchivedEvent" />
    </div>
  </template>
  
  <script>
  import TrainerArchivedEventDetail from '@/components/TrainerAccount/TrainerArchivedEventDetail.vue';
  export default {
    name: 'TrainerArchived',
    components: {
      TrainerArchivedEventDetail
    },
    data() {
      return {
        trainerArchivedSearchQuery: '',
        selectedTrainerArchivedEvent: null,
        trainerArchivedEvents: [
          { id: 1, title: 'Архивированное мероприятие', date: '05.01.21', time: '14:00', nomination: 'Старое мероприятие' },
          { id: 2, title: 'Архивированное мероприятие', date: '12.02.21', time: '13:00', nomination: 'Другое старое мероприятие' },
          // Добавьте больше архивированных мероприятий
        ],
      };
    },
    computed: {
      filteredTrainerArchivedEvents() {
        return this.trainerArchivedEvents.filter(event => event.date.includes(this.trainerArchivedSearchQuery));
      }
    },
    methods: {
    selectTrainerArchivedEvent(event) {
      this.selectedTrainerArchivedEvent = event;
      this.showEventDetails = true;
    }
  }
  };
  </script>
  
  <style scoped lang="sass">
  .trainer-archived-events-main 
    display: flex
  
  .trainer-archived-events
    padding: 20px
    background: $second-active-color
    max-width: 380px
    border-radius: 20px
    margin-left: -30px
    height: 83vh
    overflow: hidden
  
  .trainer-archived-search-filter
    display: flex
    justify-content: space-between
    flex-direction: column
  
    input
      margin-bottom: 0
      padding: 0   
  
    .trainer-archived-filter-options
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
  
  .trainer-archived-events-list
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
  
    .trainer-archived-event-card
      background-color: white
      padding: 15px
      border-radius: 15px
      margin-bottom: 10px
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1)
  
  .trainer-archived-search-container
    display: flex
    padding: 10px
    border: 1px solid white
    border-radius: 30px
    align-items: center

@media (max-width:1200px)

  .trainer-archived-events
    height: 80vh

@media (max-width:480px)


  .trainer-archived-events
    margin-left: 0
    background: $bg-color
    border-radius: 0
    padding: 0
    max-width: 100%
    .trainer-archived-search-container
      display: none
  .trainer-archived-events-list
    padding-right: 0
  </style>
  