<template>
  <div class="edit-participant-modal">
    <div class="header">
      <h2>Редактирование участника</h2>
      <div class="buttons">
        <button type="submit" form="edit-participant-form" class="save-btn">Сохранить</button>
        <button type="button" @click="$emit('close')" class="cancel-btn">Отменить</button>
      </div>
    </div>
    <form id="edit-participant-form" @submit.prevent="saveParticipant">    
      <div class="flex">
        <div class="form-row">        
          <div class="form-group">          
            <input type="text" v-model="localParticipantData.name" required placeholder="Имя участника"/>
          </div>
          <div class="flex-input">
            <div class="form-group">            
              <input type="date" v-model="localParticipantData.dob" required placeholder="Дата рождения"/>
            </div>

            <div class="form-group">            
              <select v-model="localParticipantData.gender" required>
                <option value="" selected>Выберите пол</option>
                <option value="male">Мужской</option>
                <option value="female">Женский</option>               
              </select>
            </div>
          </div>
          <div class="form-group">            
            <input type="tel" v-model="localParticipantData.phone" required placeholder="Номер телефона"/>
          </div>

          <div class="form-group">            
            <input type="email" v-model="localParticipantData.email" required placeholder="Email"/>
          </div>

          <div class="form-group">            
            <input type="url" v-model="localParticipantData.socialLink" placeholder="Ссылка на соцсети"/>
          </div>
        </div>     

        <div class="form-group upload-section">
          <label for="passportUpload">Загрузите изображения паспорта</label>
          <input type="file" id="passportUpload" @change="handlePassportUpload" multiple accept="image/*" />
          <span>Загрузите изображения паспорта (в формате jpg или png)</span>
        </div>
      </div>  

      <div class="form-row">
        <div class="form-group participant-skills">          
          <textarea v-model="localParticipantData.skills" placeholder="Описание навыков" rows="4"></textarea>
        </div>
      </div>

    </form>
  </div>
</template>
  <script>
  export default {
    props: {
      participantData: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        localParticipantData: { ...this.participantData },
        passportImages: []
      };
    },
    methods: {
      saveParticipant() {
        if (this.passportImages.length > 0) {
          this.localParticipantData.passportImages = this.passportImages;
        }
        this.$emit('save-participant', this.localParticipantData);
      },
      handlePassportUpload(event) {
        this.passportImages = Array.from(event.target.files);
      }
    }
  };
  </script>


<style scoped lang="sass">
.edit-participant-modal 
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

input, select, textarea
  padding: 12px
  border: 1px solid #4a90e2
  border-radius: 8px
  font-size: 14px
  width: 550px
  box-sizing: border-box

input:focus, select:focus, textarea:focus
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
.flex-input
  display: flex
  align-items: center
  justify-content: center
  input
    width: 90%
  select
    width: 90%

  
.participant-skills textarea
  width: 100%


@media (max-width: 480px)
  .edit-participant-modal 
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

  .flex-input
    input, select
      width: 98%

@media (max-width: 360px)
  .edit-participant-modal 
    padding: 20px 10px
    h2
      font-size: 18px
    input, select
      max-width: 300px


</style>