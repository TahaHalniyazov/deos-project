  <template>
    <div class="create-team-modal">
      <div class="header">
        <h2>Создание новой команды</h2>
        <div class="buttons">
          <button type="submit" form="create-team-form" class="save-btn">Сохранить</button>
          <button type="button" @click="$emit('close')" class="cancel-btn">Отменить</button>
        </div>
      </div>
      <form id="create-team-form" @submit.prevent="createTeam">    
        <div class="flex">
          <div class="form-row">        
            <div class="form-group">          
              <input type="text" v-model="teamName" required placeholder="Название команды"/>
            </div>

            <div class="form-group">            
              <input type="text" v-model="cityName" required placeholder="Название города" />
            </div>

            <!-- Оригинальный select для тренеров -->
            <div class="form-group">
              <select v-model="trainerName">
                <option value=""  selected>Выберите тренера</option>            
                <option v-for="trainer in trainers" :key="trainer">{{ trainer }}</option>
              </select>
            </div>
          </div>     

          <div class="form-group upload-section">
            <label for="upload">Загрузите логотип</label>
            <input type="file" id="upload" @change="handleFileUpload" placeholder="Стиль команды" />
            <span>Загрузите логотип (в формате png, максимальный размер 800x800 px)</span>
          </div>
        </div>  

        <div class="form-row">
          <div class="form-group team-style">          
            <input type="text" v-model="teamStyle" placeholder="Стиль команды" required />
          </div>
        </div>

        <!-- Кастомный выпадающий список для участников -->
        <div class="form-row">
          <div class="form-group participants-section">
            
            <div class="participant-dropdown" @click="toggleParticipants">
              <div class="participant-info-list">
                <span>{{ selectedParticipants.length > 0 ? selectedParticipants.join(', ') : 'Выберите участника из списка' }}</span>
                <img :src="require('@/assets/image/Stroke (1).svg')" :class="{ 'rotated': showParticipants }" alt="">
              </div>
              <transition name="slide-fade">
                <div v-if="showParticipants" class="participant-info-items">
                  <p v-for="participant in participants" :key="participant" @click="selectParticipant(participant)">
                    {{ participant }}
                  </p>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </form>
    </div>
  </template>

  <script>
  export default {
    data() {
      return {
        teamName: '',
        cityName: '',
        trainerName: '',
        trainers: ['Тренер 1', 'Тренер 2', 'Тренер 3'],
        teamStyle: '',
        selectedParticipants: [],
        participants: ['ФИО участника 1', 'ФИО участника 2', 'ФИО участника 3'],
        showParticipants: false,
      };
    },
    methods: {
    createTeam() {
        const newTeam = {
            id: Date.now(), // Используем временную метку как уникальный идентификатор
            name: this.teamName,
            city: this.cityName,
            trainer: this.trainerName,
            style: this.teamStyle,
            participants: this.selectedParticipants,
        };
        this.$emit('team-created', newTeam);
        this.$emit('close');
    }
}
  };
  </script>

  <style scoped lang="sass">
  .create-team-modal 
    padding: 30px 
    width: 100%
    margin: auto
    
    

  .header
    display: flex
    justify-content: space-between
    align-items: center
    margin-bottom: 30px
  .save-btn, .cancel-btn    
    flex: 1
    padding: 10px 30px 
    color: black
    cursor: pointer
    text-align: center
    border: none
    border-radius: 0
    transition: background-color 0.3s ease

  .save-btn
    border-right: 1px solid $active-color

    &:hover
      background-color: $active-color

  .cancel-btn 
      &:hover
        background-color: $active-color

  form
    display: flex
    flex-direction: column

  .form-row
    display: flex
    flex-direction: column

  .form-group
    flex: 1
    display: flex
    flex-direction: column

  label
    font-size: 16px
    margin-bottom: 10px
    color: #000

  input, select
    padding: 12px
    border: 1px solid #4a90e2
    border-radius: 8px
    font-size: 14px
    width: 550px
    box-sizing: border-box

  input:focus, select:focus
    outline: none
    border-color: #4a90e2

  .upload-section
    display: flex
    flex-direction: column
    align-items: flex-start
    border: 2px dashed #4a90e2
    border-radius: 10px
    padding: 20px
    text-align: center
    background-color: #f0f4f8
    margin-left: 20px

  .upload-section label
    font-size: 14px
    color: #4a90e2
    cursor: pointer

  .upload-section input
    display: none 

  .upload-section span
    margin-top: 10px
    font-size: 12px
    color: #999

  .buttons
    display: flex
    justify-content: space-between
    border-radius: 30px
    border: 1px solid $active-color
    background-color: transparent
    overflow: hidden

  .flex
    display: flex
    align-items: center

  .team-style input
    width: 100%

  /* Добавляем стили для кастомного выпадающего списка участников */
  .participant-dropdown
    margin-bottom: 15px
    display: flex
    flex-direction: column
    border: 1px solid #4a90e2
    border-radius: 8px
    padding: 10px 15px
    background-color: white
    cursor: pointer

  .participant-info-list
    display: flex
    justify-content: space-between
    align-items: center

  img.rotated
    transform: rotate(180deg)

  .participant-info-items
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
  .create-team-modal 
    background: #fff
    border-radius: 30px
    padding: 20px
  .header
    flex-direction: column
    
    
    h2
      margin-bottom: 20px
      
      
  input, select
    max-width: 400px
    
  .buttons
    width: 100%
  .flex
    flex-direction: column-reverse

  .upload-section
    margin-left: 0

  .participant-dropdown
    width: 100%

@media (max-width: 360px)
 .create-team-modal 
  padding: 20px 10px
  h2
    font-size: 18px
  input, select
    max-width: 300px
  </style>
