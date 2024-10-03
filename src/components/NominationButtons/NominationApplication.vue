<template>
    <div class="application-container">
        <div class="padding">
            <div class="form-actions">
                <button class="save-btn">Принять</button>
                <button class="cancel-btn" @click="showModal = true">Отклонить</button>
            </div>
            <div class="field-name bg">
                <p>{{ nominationName }}</p>           
            </div>
            <div class="field-name">
                <p>{{ trainerName }}</p>           
            </div>
            <div class="field-name">
                <p>{{ teamName }}</p>           
            </div>
            <div class="dropdown" @click="toggleParticipants">
                <div class="info-list">
                    <span>Список участников</span>
                    <img :src="require('@/assets/image/Stroke (1).svg')" :class="{ 'rotated': showParticipants }" alt="">
                </div>
                <transition name="slide-fade">
                    <div v-if="showParticipants" class="info-items">
                    <p v-for="participant in participants" :key="participant.id">{{ participant.name }}</p>
                    </div>
                </transition>
            </div>
        </div>
        <div v-if="showModal" class="modal-overlay">
          <div class="modal">
            <button class="close-btn" @click="showModal = false">&times;</button>
            <textarea v-model="rejectionReason" placeholder="Укажите причину отклонения заявки..."></textarea>
            <button class="submit-btn" @click="submitRejection">Отправить</button>
          </div>
        </div>
    </div>
</template>
  
  <script>
  export default {
    name: "ApplicationForm",
    data() {
        return {
            participants: [],       // Данные тренеров
            showParticipants: false, // Состояние показа списка тренеров
            nominationName: 'Наименование номинации',
            trainerName: 'ФИО тренера',
            teamName: 'Наименование команды',
            showModal: false, // Управление видимостью модального окна
            rejectionReason: '',  
        };
},
mounted() {
  this.fetchParticipants();
},
methods: {
  submitRejection() {
    if (this.rejectionReason) {
      alert(`Заявка отклонена по причине: ${this.rejectionReason}`);
      this.showModal = false;  // Закрываем модальное окно после отправки
    } else {
      alert("Пожалуйста, укажите причину отклонения.");
    }
  },


  fetchParticipants() {
    // Имитация задержки запроса на сервер
    setTimeout(() => {
      this.participants = [
        { id: 1, name: 'Участник 1' },
        { id: 2, name: 'Участник 2' },
        { id: 3, name: 'Участник 3' },
        { id: 4, name: 'Участник 4' },
        { id: 5, name: 'Участник 5' },
      ];
    }, 1000); // Задержка в 1 секунду
  },
  toggleParticipants() {
    this.showParticipants = !this.showParticipants;
  }
}
  };
  </script>
  
  <style lang="sass" scoped>




  .modal-overlay
    position: fixed
    top: 0
    left: 0
    width: 100vw
    height: 100vh
    background: rgba(0, 0, 0, 0.5)
    display: flex
    justify-content: center
    align-items: center
    z-index: 10000
  .modal
    position: relative  
    background: white
    padding: 30px
    border-radius: 10px
    width: 800px
    max-width: 90%

  .close-btn
    position: absolute
    top: 4px   // Расположение крестика внутри модального окна
    right: 10px
    background: none
    border: none
    font-size: 26px
    cursor: pointer
    color: #333
    

  textarea
    width: 100%
    height: 200px
    margin-bottom: 10px
    padding: 10px
    border: 1px solid $second-active-color
    border-radius: 5px

  .submit-btn
    background-color: #4a90e2
    color: white
    padding: 10px 20px
    border: none
    border-radius: 5px
    cursor: pointer




  .application-container
    width: 100%
    padding: 20px
    margin: 0 auto
    margin-top: 50px
  
  .padding
    padding: 20px
    border: 1px solid $second-active-color
    border-radius: 20px 
    position: relative

  .form-actions
    display: flex
    justify-content: flex-end
    margin-bottom: 15px    
    width: 50%
    
   
    
    
    
   

  


  

.field-name
    border: 1px solid $second-active-color
    margin-bottom: 14px
    padding: 10px    
    border-radius: 20px
    p
        padding-left: 10px
.bg
    background: $active-color
    color: white
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
  .application-container
    margin-top: 0

  .form-actions
    width: 100%

  .submit-btn
    width: 100%

@media (max-width: 360px)
  .application-container
    padding: 10px
    p, span
      font-size: 14px

  </style>
  