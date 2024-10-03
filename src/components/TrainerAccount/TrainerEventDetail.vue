<template>
    <div class="trainer-event-detail">
  
      <div class="trainer-event-schedule">
        <div class="trainer-date-picker">
          <span>{{ event.date }}</span>
          <img :src="require('@/assets/image/Calendar.svg')" alt="">
        </div>
        <div class="trainer-time-picker">
          <span>{{ event.time }}</span>
          <img :src="require('@/assets/image/Time Square.svg')" alt="">
        </div>
      </div>
      <h2>{{ event.title }}</h2>
      <p class="trainer-nomination">{{ event.nomination }}</p>
  
      <div class="trainer-participants">
        <label>Участники:</label>
        <div class="trainer-host">
          <p v-if="host">{{ host.name }}</p>
          <p v-else>Загрузка ведущего...</p>
        </div>
  
        <div class="trainer-dropdown" @click="toggleJudges">
          <div class="trainer-info-list">
            <span>Список всех Судей</span>
            <img :src="require('@/assets/image/Stroke (1).svg')" :class="{ 'rotated': showJudges }" alt="">
          </div>
          <transition name="slide-fade">
            <div v-if="showJudges" class="trainer-info-items">
              <p v-for="judge in judges" :key="judge.id">{{ judge.name }}</p>
            </div>
          </transition>
        </div>
  
        <div class="trainer-dropdown" @click="toggleTrainers">
          <div class="trainer-info-list">
            <span>Список всех Тренеров и их команд</span>
            <img :src="require('@/assets/image/Stroke (1).svg')" :class="{ 'rotated': showTrainers }" alt="">
          </div>
          <transition name="slide-fade">
            <div v-if="showTrainers" class="trainer-info-items">
              <p v-for="trainer in trainers" :key="trainer.id">{{ trainer.name }}</p>
            </div>
          </transition>
        </div>
      </div>
      <div class="button">
        <p>*Уведомляем вас о том, что крайний срок подачи заявки на номинацию не позднее чем за 5 суток до даты мероприятия.</p>
        <button @click="openModal">Подать заявку</button>
      </div>

       <!-- Модальное окно -->
       <div v-if="isModalOpen" class="modal">
  <div class="modal-content">
    <span class="close" @click="closeModal">&times;</span>
    <h3>Заявка на Номинацию: {{ event.nomination }}</h3>
    <div class="date-time-picker">
      <input type="text" :value="event.date" readonly />
      <input type="text" :value="event.time" readonly />
    </div>
    <div class="select-trainers">
      <label>Выберите команду из списка</label>
      <div class="custom-select" @click="toggleDropdown">
        <div class="select-box">
          <span v-if="selectedTrainers.length">Выбрано: {{ selectedTrainers.length }} тренеров</span>
          <span v-else>Выберите тренера</span>
          <img :src="require('@/assets/image/Stroke (1).svg')" class="dropdown-icon" alt="Dropdown Icon" />
        </div>
        <transition name="slide-fade">
        <ul v-show="dropdownOpen" class="select-options">
          <li v-for="trainer in trainers" :key="trainer.id">
            <label>
              <input type="checkbox" v-model="selectedTrainers" :value="trainer.name" @click.stop />
              {{ trainer.name }}
            </label>
          </li>
        </ul>
      </transition>
      </div>
    </div>
    <button class="submit-btn" @click="submitApplication">Отправить</button>
  </div>
</div>
  <div v-if="isModalOpen" class="modal-backdrop"></div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['event'],
    data() {
      return {
        host: null,
        judges: [],
        trainers: [],
        showJudges: false,
        showTrainers: false,
        isModalOpen: false, // Для открытия/закрытия модального окна
        dropdownOpen: false,  
        selectedTrainers: []
      };
    },
    mounted() {
      this.fetchHost();
      this.fetchJudges();
      this.fetchTrainers();
    },
    methods: {
      toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen; // Переключение состояния выпадающего списка
    },

      openModal() {
      this.isModalOpen = true;
      document.body.style.overflow = 'hidden'; // Отключаем прокрутку страницы
    },
    closeModal() {
      this.isModalOpen = false;
      document.body.style.overflow = 'auto'; // Восстанавливаем прокрутку страницы
    },
    submitApplication() {
      console.log('Заявка отправлена:', {
        nomination: this.event.nomination,
        date: this.event.date,
        time: this.event.time,
        trainers: this.selectedTrainers
      });
      this.closeModal();
    },


      fetchHost() {
        setTimeout(() => {
          this.host = { id: 1, name: 'Ведущий Иван Иванов' };
        }, 1000);
      },
      fetchJudges() {
        setTimeout(() => {
          this.judges = [
            { id: 1, name: 'Судья 1' },
            { id: 2, name: 'Судья 2' },
            { id: 3, name: 'Судья 3' }
          ];
        }, 1000);
      },
      fetchTrainers() {
        setTimeout(() => {
          this.trainers = [
            { id: 1, name: 'Тренер 1 и команда' },
            { id: 2, name: 'Тренер 2 и команда' },
            { id: 3, name: 'Тренер 3 и команда' }
          ];
        }, 1000);
      },
      toggleJudges() {
        this.showJudges = !this.showJudges;
      },
      toggleTrainers() {
        this.showTrainers = !this.showTrainers;
      }
    }
  };
  </script>
  
  <style scoped lang="sass">


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

  .date-time-picker
    display: flex
    
    margin-bottom: 10px
    input
      padding: 10px
      border-radius: 20px
      border: 1px solid $second-active-color
      width: 30%
      margin-right: 20px

 
  .custom-select
    position: relative
    width: 100%
    border: 1px solid $second-active-color
   
    background-color: white
    cursor: pointer
    display: flex
    justify-content: space-between
    align-items: center
    flex-direction: column

    .select-box
      display: flex
      justify-content: space-between
      align-items: center
      cursor: pointer
      span
        margin-right: 10px
      img.rotated
        transform: rotate(180deg)

    .dropdown-icon
      width: 16px
      height: 16px

  .select-options  
    max-height: 80px
    width: 100%
    overflow-y: auto
    padding-left: 10px
    
    &::-webkit-scrollbar
      width: 6px
      background-color: $second-active-color
    &::-webkit-scrollbar-thumb
      background-color: #3478f6
      border-radius: 10px
    label
      margin-bottom: 0
      flex-direction: row-reverse
    li
      
      cursor: pointer
      display: flex
      align-items: center
      
      &:hover
        background-color: rgba(52, 120, 246, 0.1)

    input[type="checkbox"]
      margin-right: 10px
     




  .trainer-event-detail
    display: flex
    flex-direction: column
    padding: 20px
    margin-top: 30px
  
  .trainer-event-actions
    display: flex
    align-items: center
    margin-bottom: 20px
    justify-content: center
  
  
  .trainer-event-schedule
    display: flex
    align-items: center
    margin-bottom: 20px
  
  .trainer-date-picker, .trainer-time-picker
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
  
    .trainer-date-picker
      span
        margin-right: 40px
  
    img
      margin-left: 10px
  
  h2
    text-align: center
    margin-top: 20px
    width: 100%
  
  .trainer-nomination
    text-align: left
    border: 1px solid $second-active-color
    margin-top: 20px
    border-radius: 30px
    padding: 10px
  
  .trainer-participants
    margin-top: 20px
    display: flex
    flex-direction: column
  
    label
      margin-bottom: 10px
      font-weight: bold
  
    .trainer-host
      padding: 10px 15px
      border: 1px solid $second-active-color
      border-radius: 20px
      margin-bottom: 15px
      background-color: white
      font-weight: bold
      text-align: left
  
    .trainer-dropdown
      margin-bottom: 15px
      display: flex
      flex-direction: column
      border: 1px solid $second-active-color
      border-radius: 20px
      padding: 10px 15px
      background-color: white
      cursor: pointer
  
      .trainer-info-list
        display: flex
        justify-content: space-between
        align-items: center
  
        img.rotated
          transform: rotate(180deg)
  
      .trainer-info-items
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

  .button
    display: flex
    justify-content: space-between
    align-items: center
    margin-top: 40px
    p
        width: 50%
        font-size: 14px

    button
        background: $active-color
        padding: 14px 50px
        border-radius: 30px
        color: white
        border: none
       
@media (max-width: 480px)
  .modal
    width: 370px
    padding: 20px
    .date-time-picker
      input
        width: 50%
  .trainer-event-schedule
    width: 100%
    justify-content: space-between
  .trainer-date-picker
    justify-content: space-between
    width: 40%
  .button
    flex-direction: column
    p
      width: 100%
      margin-bottom: 20px
    button
      width: 100%

@media (max-width: 360px)
  .modal
    width: 300px
    padding: 20px
    .date-time-picker
      input
        width: 50%
  .trainer-date-picker
      justify-content: space-between
      width: auto
  h2
    font-size: 18px
  .trainer-nomination
    border-radius: 20px
  .trainer-participants  
    .trainer-dropdown
      padding: 4px 10px
      span
        font-size: 14px
      p
        font-size: 15px

      .trainer-info-items
        padding-left: 0
        
      
  

  </style>
  