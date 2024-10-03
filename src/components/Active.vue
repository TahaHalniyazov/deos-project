<template>
  <div class="active-events-main">
    <div class="active-events" v-if="!showEventDetails">      
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
    <EventDetail v-if="selectedEvent" :event="selectedEvent" />
  </div>
</template>

<script>
import EventDetail from '@/components/EventDetail.vue';
export default {
  name: 'Active',
  components: {
    EventDetail
  },
  data() {
    return {
      searchQuery: '',
      selectedEvent: null,
      events: [
        { id: 1, title: 'Мероприятие ', date: '10.01.21', time: '11:00', nomination: 'Полное или сокращенное название' },
        { id: 2, title: 'Мероприятие ', date: '10.01.21', time: '11:00', nomination: 'Полное или сокращенное название' },
        { id: 3, title: 'Мероприятие ', date: '10.01.21', time: '11:00', nomination: 'Полное или сокращенное название' },
        { id: 4, title: 'Мероприятие ', date: '10.01.21', time: '11:00', nomination: 'Полное или сокращенное название' },
        { id: 5, title: 'Мероприятие ', date: '10.01.21', time: '11:00', nomination: 'Полное или сокращенное название' },
        { id: 6, title: 'Мероприятие ', date: '10.01.21', time: '11:00', nomination: 'Полное или сокращенное название' },
        { id: 7, title: 'Мероприятие ', date: '10.01.21', time: '11:00', nomination: 'Полное или сокращенное название' },
        { id: 8, title: 'Мероприятие ', date: '10.01.21', time: '11:00', nomination: 'Полное или сокращенное название' },
        { id: 9, title: 'Мероприятие ', date: '10.01.21', time: '11:00', nomination: 'Полное или сокращенное название' },
        { id: 10, title: 'Мероприятие ', date: '10.01.21', time: '11:00', nomination: 'Полное или сокращенное название' },
        { id: 11, title: 'Мероприятие ', date: '10.01.23', time: '23:00', nomination: 'Полное или сокращенное название' },
        // Добавьте больше событий
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
    this.showEventDetails = true; // Отображаем детали мероприятия
  }
}
};
</script>

<style scoped lang="sass">
.active-events-main
  display: flex
  


.active-events
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
  overflow-y: auto // Позволяет прокручивать список мероприятий
  max-height: 67vh // Ограничивает высоту списка, чтобы активировалась прокрутка при большом количестве мероприятий
  padding-right: 10px
  &::-webkit-scrollbar 
    
    width: 10px // Ширина полосы прокрутки
    background-color: $second-active-color // Цвет фона канала
  

  &::-webkit-scrollbar-thumb 
    background-color: #00044B // Цвет бегунка
    border-radius: 10px // Закругленные углы бегунка
    width: 10px
    background-clip: padding-box
    
  

  &::-webkit-scrollbar-thumb:hover 
    background-color: $active-color // Цвет бегунка при наведении
    

  &::-webkit-scrollbar-track 
    background-color: #ccc// Цвет канала полосы прокрутки
  

  &::-webkit-scrollbar-thumb:hover 
    background-color: #00044B// Цвет бегунка при наведении
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
  .active-events
    height: 84vh 
@media (max-width:480px)
  .active-events-main
    background: $bg-color
    display: block
  
    .active-events
      margin-left: 0
      background: $bg-color
      border-radius: 0
      padding: 0
      max-width: 100%
      

  

    .search-container
      display: none

@media (max-width:360px)
  .active-events
    h3
      font-size: 16px
  
      
</style>
