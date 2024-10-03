<template>
<div class="event-detail">
    <div class="cancel-reason">
        <strong>Отменено</strong>
        <p class="reason">{{ cancelReason }}</p>
    </div>
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
</div>
</template>
  
<script>
export default {
props: ['event'],
data() {
    return {
    host: null,         // Данные ведущего
    judges: [],         // Данные судей
    trainers: [],       // Данные тренеров
    showJudges: false,  // Состояние показа списка судей
    showTrainers: false, // Состояние показа списка тренеров
    cancelReason: 'Причина, по которой отменили мероприятие '
    };
    
},
mounted() {
    this.fetchHost();
    this.fetchJudges();
    this.fetchTrainers();
},
methods: {
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
    }
}
};
</script>
  
  <style scoped lang="sass">
.event-detail
    display: flex
    flex-direction: column
    padding: 20px
    margin-top: 30px
    width: 100%

.event-actions
    display: flex
    align-items: center
    margin-bottom: 20px
    justify-content: center
    
.cancel-reason
    display: flex
    align-items: center
    margin-bottom: 20px
    .reason
        margin-left: 20px
        flex: 1
        padding: 10px
        border-radius: 20px
        border: 1px solid $second-active-color
        width: 100%
        
input
    margin-left: 20px
    flex: 1
    padding: 10px
    border-radius: 20px
    border: 1px solid $second-active-color
  
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

@media (max-width: 480px)
.event-detail
    margin-top: 0
    background: #fff
    border-radius: 30px
    .cancel-reason
        flex-direction: column
        .reason
            margin-left: 0
            margin-top: 20px

@media (max-width: 360px)

    .time-picker
        margin: 0
    .date-picker
        margin-right: 4px

  </style>
  