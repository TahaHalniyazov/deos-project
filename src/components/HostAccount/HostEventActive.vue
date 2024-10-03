<template>
    <div class="host-active-events-main">
      <div class="host-active-events" v-if="!showEventDetails">      
        <div class="host-search-filter">
          <div class="host-search-container">
            <input type="text" placeholder="Найти" v-model="hostSearchQuery" />
            <img :src="require('@/assets/image/Search.svg')" alt="" class="">
          </div>
          <div class="host-filter-options">
            <button>Фильтр </button>       
            <img :src="require('@/assets/image/Swap.svg')" alt="" class="">
          </div>
        </div>
        <div class="host-events-list">
          <div class="host-event-card" v-for="event in filteredHostEvents" :key="event.id" @click="selectHostEvent(event)">
            <h3>{{ event.title }} {{ event.date }} в {{ event.time }}</h3>
            <p>{{ event.nomination }}</p>
          </div>
        </div>      
      </div>
      <HostEventDetail v-if="selectedHostEvent" :event="selectedHostEvent" />
    </div>
  </template>
  
  <script>
  import HostEventDetail from '@/components/HostAccount/HostEventDetail.vue';
  
  export default {
    name: 'HostActive',
    components: {
      HostEventDetail
    },
    data() {
      return {
        hostSearchQuery: '',
        selectedHostEvent: null,
        hostEvents: [
          { id: 1, title: 'Мероприятие Александра', date: '10.01.21', time: '11:00', nomination: 'Полное или сокращенное название' },
          { id: 2, title: 'Мероприятие Артема', date: '10.01.21', time: '11:00', nomination: 'Полное или сокращенное название' },
          // Добавьте больше событий
        ],
      };
    },
    computed: {
      filteredHostEvents() {
        return this.hostEvents.filter(event => event.date.includes(this.hostSearchQuery));
      }
    },
    methods: {
      selectHostEvent(event) {
        this.selectedHostEvent = event;
        this.showEventDetails = true; // Отображаем детали мероприятия
      }
    }
  };
  </script>
  
  <style scoped lang="sass">
  .host-active-events
    padding: 20px
    background: $second-active-color
    max-width: 380px
    border-radius: 20px
    margin-left: -30px
    height: 83vh
    overflow: hidden
  
  .host-search-filter
    display: flex
    justify-content: space-between
    flex-direction: column
  
    input
      margin-bottom: 0
      padding: 0   
  
    .host-filter-options
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
  
  .host-events-list
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
  
    .host-event-card
      background-color: white
      padding: 15px
      border-radius: 15px
      margin-bottom: 10px
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1)
  
  .host-search-container
    display: flex
    padding: 10px
    border: 1px solid white
    border-radius: 30px
    align-items: center

@media (max-width:1200px)
  .host-active-events
    height: 80vh
@media (max-width:480px)


  .host-active-events
    margin-left: 0
    background: $bg-color
    border-radius: 0
    padding: 0
    max-width: 100%
    .host-search-container
      display: none
  .host-events-list
    padding-right: 0

      
  </style>
  