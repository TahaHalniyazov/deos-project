<template>
  <div class="cancelled-events-main">
    <div class="cancelled-events" v-if="!showEventDetails">      
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
    <CancelledEventDetail v-if="selectedEvent" :event="selectedEvent" />
  </div>
</template>

<script>
import CancelledEventDetail from '@/components/CancelledEventDetail.vue'; // Импорт нового компонента

export default {
  name: 'Cancelled',
  components: {
    CancelledEventDetail, // Регистрируем новый компонент
  },
  data() {
    return {
      searchQuery: '',
      selectedEvent: null,
      events: [
        { id: 1, title: 'Мероприятие 1', date: '10.01.21', time: '11:00', nomination: 'Полное или сокращенное название' },
        { id: 2, title: 'Мероприятие 2', date: '12.11.23', time: '13:00', nomination: 'Полное или сокращенное название' },
        // Добавьте больше отмененных событий
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
.cancelled-events-main 
  display: flex

.cancelled-events
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
  .cancelled-events
    height: 84vh 
@media (max-width:480px)
  .cancelled-events-main
    background: $bg-color
    display: block
  
    .cancelled-events
      margin-left: 0
      background: $bg-color
      border-radius: 0
      padding: 0
      max-width: 100%
    .search-container
      display: none
  .events-list
    padding-right: 0
</style>
