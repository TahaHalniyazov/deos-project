<template>
    <div class="trainer-archived-event-detail">
        
        <div class="trainer-archived-event-schedule">
        <div class="trainer-archived-date-picker">
            <span>{{ event.date }}</span>
            <img :src="require('@/assets/image/Calendar.svg')" alt="">
        </div>
        <div class="trainer-archived-time-picker">
            <span>{{ event.time }}</span>
            <img :src="require('@/assets/image/Time Square.svg')" alt="">
        </div>
        </div>
        <h2>{{ event.title }}</h2>
        <p class="trainer-archived-nomination">{{ event.nomination }}</p>
    
        <!-- Новый контейнер с данными участников -->
        <div class="trainer-archived-participants">
        <label>Участники:</label>
        <div class="trainer-archived-host">
            <p v-if="host">{{ host.name }}</p>
            <p v-else>Загрузка ведущего...</p>
        </div>
    
        <div class="trainer-archived-dropdown" @click="toggleJudges">
            <div class="trainer-archived-info-list">
            <span>Список всех Судей</span>
            <img :src="require('@/assets/image/Stroke (1).svg')" :class="{ 'rotated': showJudges }" alt="">
            </div>
            <transition name="slide-fade">
            <div v-if="showJudges" class="trainer-archived-info-items">
                <p v-for="judge in judges" :key="judge.id">{{ judge.name }}</p>
            </div>
            </transition>
        </div>
    
        <div class="trainer-archived-dropdown" @click="toggleTrainers">
            <div class="trainer-archived-info-list">
            <span>Список всех Тренеров и их команд</span>
            <img :src="require('@/assets/image/Stroke (1).svg')" :class="{ 'rotated': showTrainers }" alt="">
            </div>
            <transition name="slide-fade">
            <div v-if="showTrainers" class="trainer-archived-info-items">
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
        showTrainers: false // Состояние показа списка тренеров
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
    .trainer-archived-event-detail
        display: flex
        flex-direction: column
        padding: 20px
        margin-top: 30px
        width: 100%
    
    .trainer-archived-event-schedule
        display: flex
        align-items: center
        margin-bottom: 20px
        
    .trainer-archived-date-picker, .trainer-archived-time-picker
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
        .trainer-archived-date-picker
        span
            margin-right: 40px
    
        img
            margin-left: 10px
    
    h2
        text-align: center
        margin-top: 20px
        width: 100%
    
    .trainer-archived-nomination
        text-align: left
        border: 1px solid $second-active-color
        margin-top: 20px
        border-radius: 30px
        padding: 10px
    
    .trainer-archived-participants
        margin-top: 20px
        display: flex
        flex-direction: column
    
        label
            margin-bottom: 10px
            font-weight: bold
    
        .trainer-archived-host
            padding: 10px 15px
            border: 1px solid $second-active-color
            border-radius: 20px
            margin-bottom: 15px
            background-color: white
            font-weight: bold
            text-align: left
    
        .trainer-archived-dropdown
            margin-bottom: 15px
            display: flex
            flex-direction: column
            border: 1px solid $second-active-color
            border-radius: 20px
            padding: 10px 15px
            background-color: white
            cursor: pointer
    
            .trainer-archived-info-list
                display: flex
                justify-content: space-between
                align-items: center
                
                
    
                img.rotated
                    transform: rotate(180deg)
            
            .trainer-archived-info-items
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
    .trainer-archived-event-schedule
        width: 100%
        justify-content: space-between
    .trainer-archived-date-picker
        justify-content: space-between
        width: 40%

    
@media (max-width: 360px)
    .trainer-archived-date-picker
        justify-content: space-between
        width: auto
    h2
        font-size: 18px
    .trainer-archived-time-picker
        span
            margin-right: 0
            .trainer-nomination
        border-radius: 20px
    .trainer-archived-participants  
        .trainer-archived-dropdown
            padding: 4px 10px
            span
                font-size: 14px
            p
                font-size: 15px

            .trainer-archived-info-items
                padding-left: 0
        
        
      
    </style>
    