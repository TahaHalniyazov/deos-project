<template>
  <div class="host-event-detail">
    <!-- Вопросы сверху -->
    <div v-if="!questionsAnswered && !showPopup" class="questions-container">
      <div class="question">
        <p>Все судьи присутствуют на мероприятии?</p>
        <div class="question-options">
          <button :class="{ selected: answer1 === true }" @click="selectAnswer1(true)">
            ✔️
          </button>
          <button :class="{ selected: answer1 === false }" @click="selectAnswer1(false)">
            ❌
          </button>
        </div>
      </div>
      <div class="question">
        <p>Все команды присутствуют на мероприятии?</p>
        <div class="question-options">
          <button :class="{ selected: answer2 === true }" @click="selectAnswer2(true)">
            ✔️
          </button>
          <button :class="{ selected: answer2 === false }" @click="selectAnswer2(false)">
            ❌
          </button>
        </div>
      </div>
      <button @click="submitAnswers" class="answer">Ответить</button>
    </div>

    <!-- Попап с выбором судей -->
    <div v-if="showPopup" class="popup-overlay">
      <div class="popup-content">
        <h3>Укажите не явившихся судей!!!</h3>
        <p>Мероприятие: {{ event.nomination }}</p>
        <div class="popup-details host-event-schedule">
          <div class="host-date-picker">
            <span>{{ event.date }}</span>
            <img :src="require('@/assets/image/Calendar.svg')" alt="">
          </div>
          <div class="host-time-picker">
            <span>{{ event.time }}</span>
            <img :src="require('@/assets/image/Time Square.svg')" alt="">
          </div>
        </div>
        <div class="judges-list">
          <p>Выберите Судей из списка</p>
          <div v-for="judge in judges" :key="judge.id" class="judge-item">
            <span>{{ judge.name }}</span>
            <input type="checkbox" v-model="absentJudges" :value="judge.id">
          </div>
        </div>
        <button @click="submitPopup">Отправить</button>
      </div>
    </div>

    <!-- Содержимое страницы с блокировкой -->
    <div :class="{ 'disabled': !questionsAnswered && !showPopup }" class="content-container">
      <div class="overlay" v-if="!questionsAnswered && !showPopup">
        <div class="notification">После ответов на вопросы, поле станет активным.</div>
      </div>
      <h2>{{ event.title }}</h2>
      <div class="host-event-schedule">
        
        <div class="host-date-picker">
          <span>{{ event.date }}</span>
          <img :src="require('@/assets/image/Calendar.svg')" alt="">
        </div>
        <div class="host-time-picker">
          <span>{{ event.time }}</span>
          <img :src="require('@/assets/image/Time Square.svg')" alt="">
        </div>
      </div>
      <p class="host-nomination">{{ event.nomination }}</p>
      
      <div class="host-dropdown" @click="toggleJudges">
        <div class="host-info-list">
          <span>Список всех Судей</span>
          <img :src="require('@/assets/image/Stroke (1).svg')" :class="{ 'rotated': showJudges }" alt="">
        </div>
        <transition name="slide-fade">
          <div v-if="showJudges" class="host-info-items">
            <p v-for="judge in judges" :key="judge.id">{{ judge.name }}</p>
          </div>
        </transition>
      </div>
  
      <div class="host-participants">
        <label>Команды:</label>
        <div v-for="team in teams" :key="team.id" class="team-section">
          <div class="host-dropdown" @click="toggleTeam(team.id)">
            <div class="host-info-list">
              <span>{{ team.style }} - {{ team.coachName }}</span>
              <img :src="require('@/assets/image/Stroke (1).svg')" :class="{ 'rotated': team.showDetails }" alt="">
            </div>
            <transition name="slide-fade">
              <div v-if="team.showDetails" class="host-info-items">
                <p><strong>Участники:</strong></p>
                <ul>
                  <li v-for="participant in team.participants" :key="participant">{{ participant }}</li>
                </ul>
                <div class="form-actions">
                  <button class="save-btn">Начать выступление</button>
                  <button class="cancel-btn">Завершить</button>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['event'],
  data() {
    return {
      judges: [],
      teams: [],
      showJudges: false,
      questionsAnswered: false,
      showPopup: false, // Для отображения попапа
      absentJudges: [], // Список отсутствующих судей
      answer1: null,
      answer2: null,
    };
  },
  mounted() {
    this.fetchJudges();
    this.fetchTeams();
  },
  methods: {
    selectAnswer1(value) {
      this.answer1 = value;
    },
    selectAnswer2(value) {
      this.answer2 = value;
    },
    submitAnswers() {
      if (this.answer1 === false) {
        this.showPopup = true; // Показать попап если ответ "Нет"
      } else if (this.answer1 === true && this.answer2 !== null) {
        this.questionsAnswered = true; // Разрешаем доступ к странице, если оба ответа выбраны и нет необходимости в попапе
      } else if (this.answer2 === null) {
        alert("Пожалуйста, выберите ответы на все вопросы.");
      }
    },
    submitPopup() {
      this.showPopup = false;
      this.questionsAnswered = true; // Разрешить доступ после отправки попапа
    },
    fetchJudges() {
      setTimeout(() => {
        this.judges = [
          { id: 1, name: 'Судья 1' },
          { id: 2, name: 'Судья 2' },
          { id: 3, name: 'Судья 3' },
          { id: 4, name: 'Судья 3' },
          { id: 5, name: 'Судья 3' },
        ];
      }, 1000);
    },
    fetchTeams() {
      setTimeout(() => {
        this.teams = [
          {
            id: 1,
            style: 'Стиль А',
            coachName: 'Тренер Иван Иванов',
            participants: ['Участник 1', 'Участник 2', 'Участник 3'],
            showDetails: false,
          },
          {
            id: 2,
            style: 'Стиль B',
            coachName: 'Тренер Петр Петров',
            participants: ['Участник 4', 'Участник 5', 'Участник 6'],
            showDetails: false,
            },
            // другие команды...
          ];
        }, 1000);
      },
      toggleJudges() {
        this.showJudges = !this.showJudges;
      },
      toggleTeam(teamId) {
        const team = this.teams.find(t => t.id === teamId);
        team.showDetails = !team.showDetails;
      }
    }
  };
  </script>
  
  <style scoped lang="sass">
  .host-event-detail
    display: flex
    flex-direction: column
    padding: 20px
    margin-top: 30px
    height: 76vh
    overflow-y: scroll
  .form-actions
    width: 50%
    margin-top: 30px
  .questions-container
    display: flex
    flex-direction: column
    background-color: white
    padding: 20px
    margin-bottom: 20px

  .question-options
    display: flex
    gap: 10px

  .question
    display: flex
    align-items: center
    justify-content: space-between
    margin-top: 20px
    border: 1px solid $active-color
    padding: 20px
    border-radius: 20px

  .question-options button
    border: none
    background: none
    font-size: 20px
    cursor: pointer
    border-radius: 4px
    transition: background-color 0.3s
  
  .question-options button.selected
    background-color: #007BFF
    color: white

  .answer
    padding: 10px 20px
    background-color: $active-color
    color: white
    border: none
    border-radius: 5px
    cursor: pointer
    margin-top: 20px
    align-self: flex-end
  
  button:hover
    background-color: #0056b3
  
  .content-container.disabled
    position: relative
    padding: 30px
  
  .overlay
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    background-color: rgba(0, 0, 0, 0.3)    
    display: flex
    justify-content: center
    align-items: center
    z-index: 10
    border-radius: 20px
  
  .notification
    color: white
    font-size: 18px
    text-align: center
    padding: 20px
    background-color: red
    border-radius: 10px
    width: 50%
    
  .popup-overlay
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    background-color: rgba(0, 0, 0, 0.5)
    display: flex
    justify-content: center
    align-items: center
    z-index: 1000

  .popup-content
    background-color: white
    padding: 30px
    border-radius: 10px
    width: 1000px
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1)
    text-align: center
    p
      font-size: 20px

  .popup-content h3
    margin-bottom: 20px

  .popup-details
    display: flex
    justify-content: space-between
    margin-bottom: 20px

  .popup-details input
    width: 48%
    padding: 10px
    border: 1px solid #E3E3E3
    border-radius: 5px

  .judges-list
    margin-bottom: 20px

  .judge-item
    display: flex
    justify-content: space-between
    align-items: center
    padding: 10px
    border: 1px solid #E3E3E3
    border-radius: 5px
    margin-bottom: 10px

  .popup-content button
    padding: 10px 20px
    background-color: #007BFF
    color: white
    border: none
    border-radius: 5px
    cursor: pointer
  
  .popup-content button:hover
    background-color: #0056b3
  
  .host-event-schedule
    display: flex
    align-items: center
    margin-bottom: 20px
  
    .host-date-picker, .host-time-picker
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
  
    img
      margin-left: 10px
  
  h2
    width: 100%
  
  .host-nomination
    text-align: left
    border: 1px solid $second-active-color
    margin-top: 20px
    margin-bottom: 20px
    border-radius: 30px
    padding: 10px
  
  .host-participants
    margin-top: 20px
    display: flex
    flex-direction: column
  
    label
      margin-bottom: 10px
      font-weight: bold
  
  .team-section
    margin-bottom: 20px
  
  .host-dropdown
    margin-bottom: 15px
    display: flex
    flex-direction: column
    border: 1px solid $second-active-color
    border-radius: 20px
    padding: 10px 15px
    background-color: white
    cursor: pointer
  
    .host-info-list
      display: flex
      justify-content: space-between
      align-items: center
  
      img.rotated
        transform: rotate(180deg)
  
    .host-info-items
      max-height: 130px
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
    .form-actions
      width: 80%
      margin-top: 30px
      .save-btn, .cancel-btn
        padding: 4px 10px
@media (max-width: 480px)
  .host-event-detail
    padding: 14px
  .host-event-schedule
    width: 100%
    justify-content: space-between
    
    
  .host-date-picker
    justify-content: space-between
    width: 40%
  .button
    flex-direction: column
    p
      width: 100%
      margin-bottom: 20px
    button
      width: 100%
  .questions-container
    padding: 10px
  .question
    padding: 10px
  .form-actions
    width: 100%
    margin-top: 10px
    .save-btn, .cancel-btn
      padding: 4px
      font-size: 14px


@media (max-width: 360px)
  .host-date-picker
      justify-content: space-between
      width: auto
  h2
    font-size: 18px
  .host-nomination
    border-radius: 20px
  .host-participants  
    .host-dropdown
      padding: 4px 10px
      span
        font-size: 14px
      p
        font-size: 15px

      .host-info-items
        padding-left: 0
        
      
  </style>
