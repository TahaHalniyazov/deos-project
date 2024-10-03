<template>
    <div class="event-detail">
      <div class="event-actions">
        <button class="action-btn start-btn">
          <span class="btn-text">Начать</span>
          <img class="btn-icon" :src="require('@/assets/image/Tick Square.svg')" alt="Начать" />
        </button>
        <button class="action-btn">
          <span class="btn-text">Завершить  </span>
          <img class="btn-icon" :src="require('@/assets/image/Logout.svg')" alt="Завершить" />
        </button>
        <button class="action-btn" @click="openRescheduleModal">
          <span class="btn-text">Перенести</span>
          <img class="btn-icon" :src="require('@/assets/image/Swap(2).svg')" alt="Перенести" />
        </button>
        <button class="action-btn" @click="openModal">
          <span class="btn-text">Отменить  </span>
          <img class="btn-icon" :src="require('@/assets/image/Close Square.svg')" alt="Отменить" />
        </button>
        <button class="action-btn icon-only">
          <img :src="require('@/assets/image/Edit(black).svg')" alt="Редактировать">
        </button>
      </div>


      <!-- Модальное окно для переноса -->
      <div v-if="isRescheduleModalOpen" class="modal">
  <div class="modal-content">
    <span class="close" @click="closeRescheduleModal">&times;</span>
    <div class="form-group">
      <div class="form-group-item-1">        
        <Datepicker v-model="selectedDate" :format="dateOnlyFormat" :locale="locale" placeholder="ДД/ММ/ГГГГ" />
      </div>
      <div class="form-group-item-2">
        
        <div class="time-picker" @click="toggleTimeDropdown">
          <span class="time-display">{{ time }}</span>
          <img :src="require('@/assets/image/Time Square.svg')" alt="Time Icon" class="time-icon">
        </div>
        <transition name="fade">
          <ul v-show="timeDropdownOpen" class="time-options">
            <li v-for="option in timeOptions" :key="option" @click="selectTime(option)">
              {{ option }}
            </li>
          </ul>
        </transition>
      </div>
    </div>
    <textarea placeholder="Укажите причину переноса мероприятия..."></textarea>
    <div>
      <label>
        <input type="checkbox" v-model="notifyParticipants">
        Уведомить всех участников события
      </label>
    </div>
    <button class="submit-btn" @click="submitReschedule">Отправить</button>
  </div>
</div>
<!-- Задний фон для модала -->
<div v-if="isRescheduleModalOpen" class="modal-backdrop"></div>

      <div v-if="isModalOpen" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <textarea placeholder="Укажите причину отмены мероприятия..."></textarea>
        <div>
          <label>
            <input type="checkbox" v-model="notifyParticipants">
            Уведомить всех участников события
          </label>  
        </div>
        <button class="submit-btn" @click="submitCancel">Отправить</button>
      </div>
    </div>

    <!-- Задний затемненный фон -->
    <div v-if="isModalOpen" class="modal-backdrop"></div>


      <div class="event-schedule">
        <div class="date-picker">
          <span>{{ event.date }}</span>
          <img :src="require('@/assets/image/Calendar.svg')" alt="">
        </div>
        <div class="time-picker">
          <span>{{ event.time }}</span>
          <img :src="require('@/assets/image/Time Square.svg')" alt="">
        </div>
      </div>
      <h2>{{ event.title }}</h2>
      <p class="nomination">{{ event.nomination }}</p>
  
      <!-- Новый контейнер с данными участников -->
      <div class="participants">
        <label>Участники:</label>
        <div class="host">
          <p v-if="host">{{ host.name }}</p>
          <p v-else>Загрузка ведущего...</p>
        </div>
  
        <div class="dropdown" @click="toggleJudges">
          <div class="info-list">
            <span>Список всех Судей</span>
            <img :src="require('@/assets/image/Stroke (1).svg')" :class="{ 'rotated': showJudges }" alt="">
          </div>
          <transition name="slide-fade">
            <div v-if="showJudges" class="info-items">
              <p v-for="judge in judges" :key="judge.id">{{ judge.name }}</p>
            </div>
          </transition>
        </div>
  
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
      <div v-if="showNotification" class="notification-backdrop"></div>
      <div v-if="showNotification" class="notification-popup">
      Уведомление отправлено всем участникам мероприятия
    </div>
    </div>
  </template>
  
  <script>
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { ru } from 'date-fns/locale';
  export default {
    props: ['event'],

    components: {
    Datepicker,

    
  },

    data() {
      return {
        host: null,         // Данные ведущего
        judges: [],         // Данные судей
        trainers: [],       // Данные тренеров
        showJudges: false,  // Состояние показа списка судей
        showTrainers: false, // Состояние показа списка тренеров
        isModalOpen: false, // Состояние для модального окна
        notifyParticipants: false, // Состояние для чекбокса уведомления
        isRescheduleModalOpen: false,
        selectedDate: null, // Переменная для хранения выбранной даты
        time: '00:00', // Переменная для времени
        timeOptions: [
          "00:00", "00:30", "01:00", "01:30", "02:00",
          "02:30", "03:00", "03:30", "04:00", "04:30",
          "05:00", "05:30", "06:00", "06:30", "07:00",
          "07:30", "08:00", "08:30", "09:00", "09:30",
          "10:00", "10:30", "11:00", "11:30", "12:00",
          "12:30", "13:00", "13:30", "14:00", "14:30",
          "15:00", "15:30", "16:00", "16:30", "17:00",
          "17:30", "18:00", "18:30", "19:00", "19:30",
          "20:00", "20:30", "21:00", "21:30", "22:00",
          "22:30", "23:00", "23:30"
        ],
        timeDropdownOpen: false,
        locale: ru, // Локализация для компонента Datepicker
        dateOnlyFormat: 'dd/MM/yyyy',
        showNotification: false,
          };
    },
    mounted() {
      this.fetchHost();
      this.fetchJudges();
      this.fetchTrainers();
    },
    methods: {

    selectTime(option) {
    this.time = option;
    this.timeDropdownOpen = false; // Закрытие выпадающего списка после выбора времени
  },
  toggleTimeDropdown() {
    this.timeDropdownOpen = !this.timeDropdownOpen;
  },


    openRescheduleModal() {
    this.isRescheduleModalOpen = true;
    document.body.style.overflow = 'hidden'; // Отключение прокрутки
  },
  closeRescheduleModal() {
    this.isRescheduleModalOpen = false;
    document.body.style.overflow = 'auto'; // Восстановление прокрутки
  },
  submitReschedule() {
      if (this.notifyParticipants) {
        this.showNotificationMessage();
      }
      this.closeRescheduleModal();
    },

      openModal() {
    this.isModalOpen = true;
    document.body.style.overflow = 'hidden'; // Отключаем прокрутку
  },
  closeModal() {
    this.isModalOpen = false;
    document.body.style.overflow = 'auto'; // Возвращаем прокрутку
  },
  submitCancel() {
      if (this.notifyParticipants) {
        this.showNotificationMessage();
      }
      this.closeModal();
    },


      fetchHost() {
        // Имитация задержки запроса на сервер
        setTimeout(() => {
          this.host = { id: 1, name: 'Ведущий Иван Иванов' }; // Пример данных ведущего
        }, 1000); // Задержка в 1 секунду
      },
      fetchJudges() {
        // Имитация задержки запроса на сервер
        setTimeout(() => {
          this.judges = [
            { id: 1, name: 'Судья 1' },
            { id: 2, name: 'Судья 2' },
            { id: 3, name: 'Судья 3' },
            { id: 1, name: 'Судья 1' },
            { id: 2, name: 'Судья 2' },
            { id: 3, name: 'Судья 3' },
          ];
        }, 1000); // Задержка в 1 секунду
      },
      fetchTrainers() {
        // Имитация задержки запроса на сервер
        setTimeout(() => {
          this.trainers = [
            { id: 1, name: 'Тренер 1 и команда' },
            { id: 2, name: 'Тренер 2 и команда' },
            { id: 3, name: 'Тренер 3 и команда' },
            { id: 1, name: 'Тренер 1 и команда' },
            { id: 2, name: 'Тренер 2 и команда' },
            { id: 3, name: 'Тренер 3 и команда' },
          ];
        }, 1000); // Задержка в 1 секунду
      },
      toggleJudges() {
        this.showJudges = !this.showJudges;
      },
      toggleTrainers() {
        this.showTrainers = !this.showTrainers;
      },
      showNotificationMessage() {
      this.showNotification = true;  // Показать уведомление
      setTimeout(() => {
        this.showNotification = false;  // Скрыть уведомление через 2 секунды
      }, 1500);
    }
    }
  };
  </script>
  
  <style scoped lang="sass">
  .notification-backdrop 
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    background-color: rgba(0, 0, 0, 0.5) // Полупрозрачный темный фон
    z-index: 1001

  .notification-popup 
    position: fixed
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    background-color: $active-color
    color: white
    padding: 20px
    border-radius: 10px
    font-size: 18px
    z-index: 1002
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2)
    text-align: center
    width: 500px
  
  .date-time-picker
    display: flex
    justify-content: space-between
    margin-bottom: 10px
    input.date-input, input.time-input
      padding: 10px
      border-radius: 20px
      border: 1px solid #ccc
      width: 48%
  .modal
    position: fixed
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    background: white
    padding: 30px
    border-radius: 20px
    z-index: 1001
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1)
    width: 600px
    .modal-content
      display: flex
      flex-direction: column

  .modal-backdrop
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    background: rgba(0, 0, 0, 0.5)
    z-index: 1000

  .close
    position: absolute
    top: 10px
    right: 10px
    cursor: pointer
    font-size: 26px

  .submit-btn
    background-color: #3478f6
    color: white
    padding: 10px
    border: none
    border-radius: 5px
    cursor: pointer
    margin-top: 20px

  textarea
    width: 100%
    height: 200px
    padding: 10px
    margin-bottom: 10px
    border: 1px solid $second-active-color
    border-radius: 20px

  label
    display: flex
    justify-content: flex-start
    align-items: center
    font-size: 14px
    

  input[type="checkbox"]
    margin: 0
    width: 5%





  .event-detail
      display: flex
      flex-direction: column
      padding: 20px
      margin-top: 30px
      background: white
      border-radius: 30px
      width: 100%
    
  .event-actions
      display: flex
      align-items: center
      margin-bottom: 20px
      justify-content: center
    
  .action-btn
      padding: 12px 40px
      background-color: white
      cursor: pointer
      border: 1px solid $second-active-color
      border-left: none
      margin-bottom: 40px
      transition: 0.5s all
      &:hover
          background-color: $active-color
      &:first-child
          border-radius: 20px 0 0 20px
          border-left: 1px solid #ccc
      &:last-child
          border-radius: 0 20px 20px 0 
      .btn-text
        display: block
    
      .btn-icon
        display: none
        width: 20px
        height: 20px 
        
   
  
      &.icon-only
          width: 50px
          height: 50px
          display: flex
          justify-content: center
          align-items: center
  
      img
          width: 20px
          height: 20px
  
  .event-schedule
      display: flex
      align-items: center
      margin-bottom: 20px
      
  .date-picker, .time-picker
      display: flex
      align-items: center
      border: 1px solid $second-active-color
      padding: 5px 15px
      border-radius: 20px
      margin-right: 10px
      background-color: white
      padding: 10px
      margin-right: 30px
      span
          margin-right: 10px
      .date-picker
      span
          margin-right: 40px
  
      img
          margin-left: 10px
  
  h2
      text-align: center
      margin-top: 20px
      width: 100%
  
  .nomination
      text-align: left
      border: 1px solid $second-active-color
      margin-top: 20px
      border-radius: 30px
      padding: 10px
  
  .participants
      margin-top: 20px
      display: flex
      flex-direction: column
  
      label
          margin-bottom: 10px
          font-weight: bold
  
      .host
          padding: 10px 15px
          border: 1px solid $second-active-color
          border-radius: 20px
          margin-bottom: 15px
          background-color: white
          font-weight: bold
          text-align: left
  
      .dropdown
          margin-bottom: 15px
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


@media (max-width: 1200px)
    .action-btn
      .btn-text
        display: none
      .btn-icon
        display: block
    .action-btn.icon-only
      width: auto
      height: auto
@media (max-width: 480px)
    .notification-popup 
      width: 400px
    .modal
      width: 360px
      padding: 20px
      
      textarea
        margin-top: 30px


    .event-detail
      margin-top: 0
      
    .action-btn
      padding: 20px 26px
      margin-bottom: 0
 
  
    .action-btn.icon-only
      width: auto
      height: auto
@media (max-width: 360px)
    .notification-popup 
      width: 300px

    .modal
      width: 300px
      padding: 20px
      textarea
        margin-top: 30px
      input
        margin-right: 10px

    .action-btn
      padding: 14px 16px
      margin-bottom: 0
    .time-picker
      margin: 0
    .date-picker
      margin-right: 4px
    .nomination
      font-size: 16px
      

  </style>
  