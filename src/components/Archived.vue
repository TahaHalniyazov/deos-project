<template>
  <div class="archived-events-main">
    <div class="archived-events" v-if="!showEventDetails">      
      <div class="search-filter">
        <div class="search-container">
          <input type="text" placeholder="Найти" v-model="searchQuery" />
          <img :src="require('@/assets/image/Search.svg')" alt="" class="">
        </div>
        <div class="filter-options">
          <button>Фильтр </button>       
          <img :src="require('@/assets/image/Swap.svg')" alt="" class="">
        </div>
      </div>
      <div class="events-list">
        <div class="event-card" v-for="event in filteredEvents" :key="event.id" @click="selectEvent(event)">
          <h3>{{ event.title }} {{ event.date }} в {{ event.time }}</h3>
          <p> </p>
          <p>{{ event.nomination }}</p>
        </div>
      </div>      
    </div>
    <ArchivedEventDetail v-if="selectedEvent" :event="selectedEvent" />
  </div>
</template>

<script>
import ArchivedEventDetail from '@/components/ArchivedEventDetail.vue';
export default {
  name: 'Archived',
  components: {
    ArchivedEventDetail
  },
  data() {
    return {
      searchQuery: '',
      selectedEvent: null,
      events: [
        { id: 1, title: 'Архивированное мероприятие', date: '05.01.21', time: '14:00', nomination: 'Старое мероприятие' },
        { id: 2, title: 'Архивированное мероприятие', date: '12.02.21', time: '13:00', nomination: 'Другое старое мероприятие' },
        // Добавьте больше архивированных мероприятий
      ],
    };
  },
  computed: {
    filteredEvents() {
      return this.events.filter(event => event.date.includes(this.searchQuery));
    }
  },
  methods: {
  selectEvent(event) {
    this.selectedEvent = event;
    this.showEventDetails = true;
  }
}
};
</script>

<style scoped lang="sass">
.archived-events-main 
  display: flex

  
.archived-events
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

.events-list
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

  .event-card
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
  .archived-events
    height: 84vh 
@media (max-width:480px)
  .archived-events-main
    background: $bg-color
  
    .archived-events
      margin-left: 0
      background: $bg-color
      border-radius: 0
      padding: 0
      max-width: 100%
    .events-list
      padding-right: 0
      

  

    .search-container
      display: none
</style>
