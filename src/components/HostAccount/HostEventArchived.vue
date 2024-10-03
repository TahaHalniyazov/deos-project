<template>
    <div class="host-archived-events-main">
      <div class="host-archived-events" v-if="!showEventDetails">      
        <div class="host-archived-search-filter">
          <div class="host-archived-search-container">
            <input type="text" placeholder="Найти" v-model="hostArchivedSearchQuery" />
            <img :src="require('@/assets/image/Search.svg')" alt="" class="">
          </div>
          <div class="host-archived-filter-options">
            <button>Фильтр </button>       
            <img :src="require('@/assets/image/Swap.svg')" alt="" class="">
          </div>
        </div>
        <div class="host-archived-events-list">
          <div class="host-archived-event-card" v-for="event in filteredHostArchivedEvents" :key="event.id" @click="selectHostArchivedEvent(event)">
            <h3>{{ event.title }} {{ event.date }} в {{ event.time }}</h3>
            <p>{{ event.nomination }}</p>
          </div>
        </div>      
      </div>
      <HostArchivedEventDetail v-if="selectedHostArchivedEvent" :event="selectedHostArchivedEvent" />
    </div>
  </template>
  
  <script>
  import HostArchivedEventDetail from '@/components/HostAccount/HostArchivedEventDetail.vue';
  
  export default {
    name: 'HostArchived',
    components: {
      HostArchivedEventDetail
    },
    data() {
      return {
        hostArchivedSearchQuery: '',
        selectedHostArchivedEvent: null,
        hostArchivedEvents: [
          { id: 1, title: 'Архивированное мероприятие', date: '05.01.21', time: '14:00', nomination: 'Старое мероприятие' },
          { id: 2, title: 'Архивированное мероприятие', date: '12.02.21', time: '13:00', nomination: 'Другое старое мероприятие' },
          // Добавьте больше архивированных мероприятий
        ],
      };
    },
    computed: {
      filteredHostArchivedEvents() {
        return this.hostArchivedEvents.filter(event => event.date.includes(this.hostArchivedSearchQuery));
      }
    },
    methods: {
      selectHostArchivedEvent(event) {
        this.selectedHostArchivedEvent = event;
        this.showEventDetails = true;
      }
    }
  };
  </script>
  
  <style scoped lang="sass">
  .host-archived-events-main 
    display: flex
  
  .host-archived-events
    padding: 20px
    background: $second-active-color
    max-width: 380px
    border-radius: 20px
    margin-left: -30px
    height: 83vh
    overflow: hidden
  
  .host-archived-search-filter
    display: flex
    justify-content: space-between
    flex-direction: column
  
    input
      margin-bottom: 0
      padding: 0   
  
    .host-archived-filter-options
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
  
  .host-archived-events-list
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
  
    .host-archived-event-card
      background-color: white
      padding: 15px
      border-radius: 15px
      margin-bottom: 10px
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1)
  
  .host-archived-search-container
    display: flex
    padding: 10px
    border: 1px solid white
    border-radius: 30px
    align-items: center

@media (max-width:1200px)
  .host-archived-events
    height: 80vh
@media (max-width:480px)


  .host-archived-events
    margin-left: 0
    background: $bg-color
    border-radius: 0
    padding: 0
    max-width: 100%
    .host-archived-search-container
      display: none
  .host-archived-events-list
    padding-right: 0
  </style>
  