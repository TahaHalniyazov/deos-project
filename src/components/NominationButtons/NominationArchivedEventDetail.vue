<template>
    <div class="event-detail">
      <h2>{{ archivedNomination.title }}</h2>
  
      <!-- Новый контейнер с данными победителей -->
      <div class="winners">
        <label>Первое место: </label>        
        <div class="place first-place">
          <p v-if="archivedFirstPlace">{{ archivedFirstPlace.name }}</p>
          <p v-else>Загрузка данных...</p>
        </div>
        
        <label>Второе место: </label>  
        <div class="place second-place">
          <p v-if="archivedSecondPlace">{{ archivedSecondPlace.name }}</p>
          <p v-else>Загрузка данных...</p>
        </div>
        
        <label>Третье место: </label>  
        <div class="place third-place">
          <p v-if="archivedThirdPlace">{{ archivedThirdPlace.name }}</p>
          <p v-else>Загрузка данных...</p>
        </div>
      </div>
  
      <!-- Список тренеров -->
      <div class="dropdown" @click="toggleArchivedTrainers">
        <div class="info-list">
          <span>Список всех Тренеров и их команд</span>
          <img :src="require('@/assets/image/Stroke (1).svg')" :class="{ 'rotated': showArchivedTrainers }" alt="">
        </div>
        <transition name="slide-fade">
          <div v-if="showArchivedTrainers" class="info-items">
            <p v-for="archivedTrainer in archivedTrainers" :key="archivedTrainer.id">{{ archivedTrainer.name }}</p>
          </div>
        </transition>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['archivedNomination'],
    data() {
      return {
        archivedFirstPlace: null,    // Данные первого места
        archivedSecondPlace: null,   // Данные второго места
        archivedThirdPlace: null,    // Данные третьего места
        archivedTrainers: [],        // Данные тренеров
        showArchivedTrainers: false  // Состояние показа списка тренеров
      };
    },
    mounted() {
      this.fetchArchivedWinners();
      this.fetchArchivedTrainers();
    },
    methods: {
      fetchArchivedWinners() {
        // Имитация задержки запроса на сервер для загрузки данных победителей
        setTimeout(() => {
          this.archivedFirstPlace = { id: 1, name: 'Архивное Первое место: Иван Иванов' }; 
          this.archivedSecondPlace = { id: 2, name: 'Архивное Второе место: Петр Петров' }; 
          this.archivedThirdPlace = { id: 3, name: 'Архивное Третье место: Сергей Сергеев' };
        }, 1000); // Задержка в 1 секунду
      },
      fetchArchivedTrainers() {
        // Имитация задержки запроса на сервер для загрузки данных тренеров
        setTimeout(() => {
          this.archivedTrainers = [
            { id: 1, name: 'Архивный Тренер 1 и команда' },
            { id: 2, name: 'Архивный Тренер 2 и команда' },
            { id: 3, name: 'Архивный Тренер 3 и команда' },
          ];
        }, 1000); // Задержка в 1 секунду
      },
      toggleArchivedTrainers() {
        this.showArchivedTrainers = !this.showArchivedTrainers;
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
    h2
      font-size: 18px

    .info-items
      padding-left: 0
  </style>
  