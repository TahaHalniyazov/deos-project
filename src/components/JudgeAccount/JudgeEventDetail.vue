<template>
    <div class="judge-event-detail">
      <div class="judge-event-schedule">
        <div class="judge-date-picker">
          <span>{{ event.date }}</span>
          <img :src="require('@/assets/image/Calendar.svg')" alt="">
        </div>
        <div class="judge-time-picker">
          <span>{{ event.time }}</span>
          <img :src="require('@/assets/image/Time Square.svg')" alt="">
        </div>
      </div>
      <h2>{{ event.title }}</h2>
      <p class="judge-nomination">{{ event.nomination }}</p>
  
      <div class="judge-participants">
        <label>Участники:</label>
        <div class="judge-host">
          <p v-if="host">{{ host.name }}</p>
          <p v-else>Загрузка ведущего...</p>
        </div>
  
        <div class="judge-dropdown" @click="toggleJudges">
          <div class="judge-info-list">
            <span>Список всех Судей</span>
            <img :src="require('@/assets/image/Stroke (1).svg')" :class="{ 'rotated': showJudges }" alt="">
          </div>
          <transition name="slide-fade">
            <div v-if="showJudges" class="judge-info-items">
              <p v-for="judge in judges" :key="judge.id">{{ judge.name }}</p>
            </div>
          </transition>
        </div>
  
        <div class="judge-dropdown" @click="toggleTrainers">
          <div class="judge-info-list">
            <span>Список всех Тренеров и их команд</span>
            <img :src="require('@/assets/image/Stroke (1).svg')" :class="{ 'rotated': showTrainers }" alt="">
          </div>
          <transition name="slide-fade">
            <div v-if="showTrainers" class="judge-info-items">
              <p v-for="trainer in trainers" :key="trainer.id">{{ trainer.name }}</p>
            </div>
          </transition>
          
        </div>
      </div>
      <VotingModal/>
     </div>
  </template>
  
  <script>
import VotingModal from '@/components/JudgeAccount/VotingModal.vue';
  
  export default {
    components: {
      VotingModal
    },
    props: ['event'],
    data() {
      return {
        host: null,
        judges: [],
        trainers: [],
        showJudges: false,
        showTrainers: false
      };
    },
    mounted() {
      this.fetchHost();
      this.fetchJudges();
      this.fetchTrainers();
    },
    methods: {
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
  .judge-event-detail
    display: flex
    flex-direction: column
    padding: 20px
    margin-top: 30px
   
  
  .judge-event-actions
    display: flex
    align-items: center
    margin-bottom: 20px
    justify-content: center
  
  .judge-event-schedule
    display: flex
    align-items: center
    margin-bottom: 20px
  
  .judge-date-picker, .judge-time-picker
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
  
    .judge-date-picker
      span
        margin-right: 40px
  
    img
      margin-left: 10px
  
  h2
    text-align: center
    margin-top: 20px
    width: 100%
  
  .judge-nomination
    text-align: left
    border: 1px solid $second-active-color
    margin-top: 20px
    border-radius: 30px
    padding: 10px
  
  .judge-participants
    margin-top: 20px
    display: flex
    flex-direction: column
  
    label
      margin-bottom: 10px
      font-weight: bold
  
    .judge-host
      padding: 10px 15px
      border: 1px solid $second-active-color
      border-radius: 20px
      margin-bottom: 15px
      background-color: white
      font-weight: bold
      text-align: left
  
    .judge-dropdown
      margin-bottom: 15px
      display: flex
      flex-direction: column
      border: 1px solid $second-active-color
      border-radius: 20px
      padding: 10px 15px
      background-color: white
      cursor: pointer
  
      .judge-info-list
        display: flex
        justify-content: space-between
        align-items: center
  
        img.rotated
          transform: rotate(180deg)
  
      .judge-info-items
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
  .judge-event-detail
    height: 71vh
    overflow-y: scroll 

@media (max-width: 480px)
  .judge-event-detail
    padding: 14px
  .judge-event-schedule
    width: 100%
    justify-content: space-between
    
  .judge-date-picker
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
  .judge-date-picker
      justify-content: space-between
      width: auto
  h2
    font-size: 18px
  .judge-nomination
    border-radius: 20px
  .judge-participants  
    .judge-dropdown
      padding: 4px 10px
      span
        font-size: 14px
      p
        font-size: 15px

      .judge-info-items
        padding-left: 0
        
      
  </style>
  