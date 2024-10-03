<template>
  <div>
    <!-- Временная кнопка для открытия модального окна -->
    <button @click="showModal = true">Открыть голосование</button>

    <!-- Модальное окно -->
    <div v-if="showModal" class="modal-overlay" @click.self="showModal = false">
      <div class="modal-content">
        <h2>Объявлено начало голосования!</h2>

        <!-- Контент с информацией -->
        <div class="info">
          <div class="team-name">
            <strong>Название команды:</strong> {{ teamName }}
          </div>
          <div class="flex">
            <div class="trainer-name">
              <strong>ФИО тренера:</strong> {{ trainerName }}
            </div>
            <div class="city-name">
              <strong>Город:</strong> {{ city }}
            </div>
          </div>
        </div>

        <!-- Номинации и Участники в одном ряду -->
        <div class="nominations-participants-row">
          <div class="nominations">
    <div class="my-nominations">
      <h3 class="accordion-title" @click="toggleMyNominations">
        Мои номинации:
        <span v-if="myNominationsOpen || !isMobile">▲</span>
        <span v-else>▼</span>
      </h3>
      <div v-show="myNominationsOpen || !isMobile">
        <div class="nomination" v-for="(nomination, index) in myNominations" :key="index">
          Номинация: Полное или сокращенное название
        </div>
      </div>
    </div>

    <div class="common-nominations">
      <h3 class="accordion-title" @click="toggleCommonNominations">
        Общие номинации:
        <span v-if="commonNominationsOpen || !isMobile">▲</span>
        <span v-else>▼</span>
      </h3>
      <div v-show="commonNominationsOpen || !isMobile">
        <div class="nomination" v-for="(nomination, index) in commonNominations" :key="index">
          Номинация: Полное или сокращенное название
        </div>
      </div>
    </div>
  </div>

          <!-- Участники -->
          <div class="participants">
            <h3>Участники:</h3>
            <div class="participant-images">
            <button class="slider-button prev" @click="prevParticipant"><img :src="require('@/assets/image/slide-left.svg')" alt=""></button>
            <div class="image-placeholder">
              <img :src="participants[currentParticipantIndex]" alt="Participant Image" />
            </div>
            <button class="slider-button next" @click="nextParticipant"><img :src="require('@/assets/image/slide-right.svg')" alt=""></button>
          </div>
          </div>
        </div>

        <!-- Ползунок -->
        <div class="slider-container">
          <div class="slider-labels">
          <span>0,1</span>
          
          <span>100</span>
        </div>
          <div class="slider-wrapper">
            <div class="slider-marks">
              <span class="slider-mark" v-for="n in 101" :key="n"></span>
            </div>
            <input
              ref="slider"
              type="range"
              v-model="sliderValue"
              min="0.1"
              max="100"
              step="0.1"
              class="slider"
              @input="updateSliderValue"
            />
            <div ref="sliderValue" class="slider-value">{{ sliderValue }}</div>
        </div>

  <!-- Метки значений -->
        
</div>

        <!-- Кнопка проголосовать -->
        <button class="vote-btn" @click="submitVote">Проголосовать</button>
      </div>
    </div>
    <div v-if="showVoteConfirmation" class="confirmation-overlay">
  <div class="confirmation-popup">
    <p>Ваш голос учтен!</p>
    <button class="close-btn" @click="closeConfirmation">✖</button>
  </div>
</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showVoteConfirmation: false,
      showModal: false,
      sliderValue: 83.5,
      teamName: "Название команды",
      trainerName: "ФИО тренера",
      city: "Город",
      myNominations: Array(3).fill("Номинация: Полное или сокращенное название"),
      commonNominations: Array(3).fill("Номинация: Полное или сокращенное название"),
      myNominationsOpen: false, 
      commonNominationsOpen: false,
      isMobile: false,
      participants: [
      'https://loremflickr.com/200/200?random=1',
      'https://loremflickr.com/200/200?random=2',
      'https://loremflickr.com/200/200?random=3',
      'https://loremflickr.com/200/200?random=4'
      ],
      currentParticipantIndex: 0
    };
  },
  mounted() {
    this.checkScreenSize();
    window.addEventListener("resize", this.checkScreenSize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.checkScreenSize);
  },
  methods: {
    closeConfirmation() {
      this.showVoteConfirmation = false; // Закрыть попап подтверждения
    },
    toggleMyNominations() {
      if (this.isMobile) {
        this.myNominationsOpen = !this.myNominationsOpen;
      }
    },
    toggleCommonNominations() {
      if (this.isMobile) {
        this.commonNominationsOpen = !this.commonNominationsOpen;
      }
    },
    checkScreenSize() {
      this.isMobile = window.innerWidth <= 480;
    },
    prevParticipant() {
  this.currentParticipantIndex = 
    (this.currentParticipantIndex === 0) 
      ? this.participants.length - 1 
      : this.currentParticipantIndex - 1;
},
nextParticipant() {
  this.currentParticipantIndex = 
    (this.currentParticipantIndex + 1) % this.participants.length;
},
    submitVote() {
      console.log("Голос отправлен с ползунком на значении: ", this.sliderValue);
      this.showModal = false;
      this.showVoteConfirmation = true;
    },
    updateSliderValue() {
    const slider = this.$refs.slider;
    const value = this.sliderValue;
    const percentage = ((value - 0.1) / (100 - 0.1)) * 100;

    // Обновляем позицию отображаемого значения
    const valueElement = this.$refs.sliderValue;
    
    // Оптимизация позиции для точного выравнивания с ползунком
    valueElement.style.left = `calc(${percentage}% + (${10 - percentage * 0.25}px))`; 

    // Обновляем метки
    const marks = this.$el.querySelectorAll('.slider-mark');
    marks.forEach((mark, index) => {
      const markPercentage = (index / 100) * 100;
      if (Math.abs(markPercentage - percentage) < 1) {
        mark.classList.add('active');
      } else {
        mark.classList.remove('active');
      }
    });
  }
  }
};
</script>

<style scoped>

.slider-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 50px;
  margin-top: 30px;
}

.slider-wrapper {
  position: relative;
  width: 100%;
  max-width: 600px;
  
}

.slider {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 12px;
  background: #f0f0f8;
  border-radius: 12px;
  outline: none;
  margin: 0;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 10px;
  height: 20px;
  background-color: #4a4a90;
  border-radius: 3px;
  cursor: pointer;
  z-index: 2;
}

.slider-value {
  position: absolute;
  top: -35px; /* Слегка поднимаем значение выше */
  left: calc(83.5%); /* Значение обновляется через JavaScript */
  transform: translateX(-70%);
  color: #4a4a90;
  font-weight: bold;
  font-size: 16px;
  transition: left 0.2s ease;
}

.slider-marks {
  position: absolute;
  width: 100%;
  height: 10px;
  display: flex;
  justify-content: space-between;
  z-index: 1;
  top: 4px;
}

.slider-mark {
  width: 3px; /* Увеличена толщина меток */
  height: 10px;
  background-color: #ccc;
  transition: height 0.2s ease, background-color 0.2s ease;
}

.slider-mark.active {
  height: 15px; /* Активные метки становятся выше */
  background-color: #4a4a90; /* Активные метки меняют цвет */
}

.slider-labels {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 600px;
  padding: 10px 0;
  color: #4a4a90;
  font-weight: bold;
}








.confirmation-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 6000;
}

/* Стиль для попапа подтверждения */
.confirmation-popup {
  background-color: #4a90e2;
  padding: 80px;
  border-radius: 10px;
  color: white;
  font-size: 18px;
  position: relative;
  text-align: center;
}

.close-btn {
  position: absolute;
  top: 0;
  right: 0;
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
}
.modal-overlay {  
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5000;
  overflow-y:scroll;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 1100px;
  max-width: 90%;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  z-index: 1100;
}

.team-name,
.trainer-name,
.city-name {
  border: 1px solid #a3b8ff;
  padding: 10px;
  border-radius: 20px;
}

.trainer-name {
  margin-right: 8px;
}

.flex {
  display: flex;
}

.info div {
  margin-bottom: 10px;
  width: 100%;
}

.nominations-participants-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.nominations {
  display: flex;
  justify-content: space-between;
  flex-grow: 1;
  margin-right: 20px;
}

.my-nominations,
.common-nominations {
  width: 48%;
}

.nomination {
  border: 1px solid #007BFF;
  border-radius: 30px;
  padding: 10px;
  margin-bottom: 10px;
  text-align: center;
  width: 80%;
}

.participants {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.participant-images {
  display: flex;
  align-items: center;
  position: relative;
  width: 240px; 
}

.image-placeholder {
  border: 1px solid #a3b8ff;
  border-radius: 20px;
  padding: 10px;
}

.slider-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  
  border: none;
  padding: 10px;
  cursor: pointer;
  
}

.slider-button.prev {
  left: -30px;
}

.slider-button.next {
  right: -10px;
}

.slider {
  margin: 20px 0;
  display: flex;
  align-items: center;
}

.slider input[type="range"] {
  width: 100%;
  margin-right: 20px;
  background: linear-gradient(to right, #007BFF, #00FF7F);
  border-radius: 5px;
  height: 8px;
  -webkit-appearance: none;
}

.slider input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  background-color: #007BFF;
  border-radius: 50%;
  cursor: pointer;
}

.slider-value {
  font-weight: bold;
  font-size: 1.2em;
}

button {
  padding: 10px 20px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

@media (max-width: 480px) {
  
  .modal-content {
    width: 100%;    
  }
  h2 {
    font-size: 18px;
    text-align: center;
  }

  .nominations-participants-row {
    flex-direction: column-reverse;
  }

  .my-nominations,
  .common-nominations {
    width: 100%;
  }

  .participant-images {
    flex-direction: column;
  }

  .accordion-title {
    cursor: pointer;
    margin-bottom: 20px;
  }
  .flex{
    flex-direction: column;
  }
  .nominations{
    flex-direction: column;
    
  }
  .nomination {
    width: 100%;
  }

  .vote-btn {
    width: 100%;
  }
}
</style>
