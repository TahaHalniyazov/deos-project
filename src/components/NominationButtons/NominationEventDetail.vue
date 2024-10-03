<template>
    <div class="event-detail">
      <button>Редактиовать</button>   
      <h2>{{ nomination.title }}</h2>
        
      <!-- Новый контейнер с данными победителей -->
      <div class="winners">
        <label>Первое место: </label>        
        <div class="place first-place">
          <p v-if="firstPlace">{{ firstPlace.name }}</p>
          <p v-else>Загрузка данных...</p>
        </div>
        
        <label>Второе место: </label>  
        <div class="place second-place">
          <p v-if="secondPlace">{{ secondPlace.name }}</p>
          <p v-else>Загрузка данных...</p>
        </div>
        
        <label>Третье место: </label>  
        <div class="place third-place">
          <p v-if="thirdPlace">{{ thirdPlace.name }}</p>
          <p v-else>Загрузка данных...</p>
        </div>
      </div>
  
      <!-- Список тренеров -->
      <div class="dropdown" @click="toggleTrainers">
        <div class="info-list">
          <span>Список всех Тренеров и их команд</span>
          <img :src="require('@/assets/image/Stroke (1).svg')" :class="{ 'rotated': showTrainers }" alt="">
        </div>
        <transition name="slide-fade">
          <div v-if="showTrainers" class="info-items">
            <p v-for="trainer in trainers" :key="trainer.id">{{ trainer.name }}</p>
          </div>
        </transition>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['nomination'],
    data() {
      return {
        firstPlace: null,    // Данные первого места
        secondPlace: null,   // Данные второго места
        thirdPlace: null,    // Данные третьего места
        trainers: [],        // Данные тренеров
        showTrainers: false  // Состояние показа списка тренеров
      };
    },
    mounted() {
      this.fetchWinners();
      this.fetchTrainers();
    },
    methods: {
      fetchWinners() {
        // Имитация задержки запроса на сервер для загрузки данных победителей
        setTimeout(() => {
          this.firstPlace = { id: 1, name: 'Иван Иванов' }; 
          this.secondPlace = { id: 2, name: 'Петр Петров' }; 
          this.thirdPlace = { id: 3, name: 'Сергей Сергеев' };
        }, 1000); // Задержка в 1 секунду
      },
      fetchTrainers() {
        // Имитация задержки запроса на сервер для загрузки данных тренеров
        setTimeout(() => {
          this.trainers = [
            { id: 1, name: 'Тренер 1 и команда' },
            { id: 2, name: 'Тренер 2 и команда' },
            { id: 3, name: 'Тренер 3 и команда' },
          ];
        }, 1000); // Задержка в 1 секунду
      },
      toggleTrainers() {
        this.showTrainers = !this.showTrainers;
      }
    }
  };
  </script>
  
  <style scoped lang="sass">
  .event-detail
    display: flex
    flex-direction: column
    padding: 30px
    margin-top: 30px
    width: 100%
    button
        border: 1px solid $second-active-color
        border-radius: 30px
        width: 20%
        margin: 0 auto
        padding: 10px 30px
  
  h2
    text-align: center
    margin-top: 20px
    width: 100%
  
  .winners
    margin-top: 20px
    display: flex
    flex-direction: column
  
    label
      margin-bottom: 20px
      font-weight: bold
  
    .place
      padding: 10px 15px
      border: 1px solid $second-active-color
      border-radius: 20px
      margin-bottom: 15px
      background-color: white
      
      p
        font-weight: 500
  
    .first-place
      background-color: #ffd700  // Золотой для первого места
  
    .second-place
      background-color: #c0c0c0  // Серебряный для второго места
  
    .third-place
      background-color: #cd7f32  // Бронзовый для третьего места
  
  .dropdown
    margin-top: 20px
    display: flex
    flex-direction: column
    border: 1px solid $second-active-color
    border-radius: 20px
    padding: 10px 15px
    background-color: white
    cursor: pointer
  
    .info-list
      display: flex
      justify-content: space-between
      align-items: center
      
      img.rotated
        transform: rotate(180deg)
    
    .info-items
      max-height: 80px
      overflow-y: auto
      padding-left: 10px
  
      p
        margin: 10px 0                  
        border-bottom: 1px solid #ccc
  
  .slide-fade-enter-active, .slide-fade-leave-active
    transition: all 0.5s ease
    overflow: hidden
  
  .slide-fade-enter, .slide-fade-leave-to
    transform: translateY(-10px)
    opacity: 0

@media (max-width: 480px)
  .event-detail
    padding: 10px
    margin-top: 10px
    button
      width: 100%
    h2
      font-size: 18px

  </style>
  