<template>
  <div class="nomination-form">
    <div class="title">
      <h2>Создание новой номинации</h2>
      <div class="form-actions">
        <button class="save-btn">Сохранить</button>
        <button class="cancel-btn">Отменить</button>
      </div>
    </div>
    <form>
      <div class="form-group">
        <textarea class="large-input" placeholder="Введите название номинации..."></textarea>
      </div>
      <div class="form-group">
        <textarea placeholder="Введите приз за первое место..."></textarea>
      </div>
      <div class="form-group">
        <textarea placeholder="Введите приз за второе место..."></textarea>
      </div>
      <div class="form-group">
        <textarea placeholder="Введите приз за третье место..."></textarea>
      </div>     
    </form>
  </div>
</template>

<script>
export default {
  name: 'NominationCreate',
};
</script>

<style lang="sass" scoped>
.nomination-form 
  max-width: 100%
  margin: 50px auto
  padding: 20px

h2 
  font-size: 20px
  font-weight: 600

.form-group 
  margin-bottom: 15px

textarea 
  width: 100%
  padding: 12px
  border: 1px solid $active-color
  border-radius: 25px
  font-size: 14px
  color: #000
  outline: none
  resize: none  // Отключить изменение размера пользователем (по желанию)
  height: 100px // Высота текстового поля, можно настроить

textarea::placeholder 
  color: #9CA3AF

.form-actions
  display: flex
  justify-content: space-between
  border-radius: 30px
  border: 1px solid $active-color
  background-color: transparent
  overflow: hidden

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

.title
  display: flex
  justify-content: space-between
  align-items: center
  margin-bottom: 60px

@media (max-width: 480px)
  .nomination-form
    display: flex
    flex-direction: column
    margin: 10px 0 60px 0
  .title 
    display: block
    h2
      text-align: center
    

  .form-actions
    position: absolute
    bottom: 40px
    left: 0
    right: 0
    width: 85%
    margin: 0 auto
    background-color: white
    box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1)
    border-top: 1px solid $active-color
    justify-content: center

  .save-btn, .cancel-btn    
    padding: 10px 20px
    flex: none
    margin: 0 

@media (max-width: 360px)
  textarea
    border-radius: 10px
    height: 80px

  .form-actions
    bottom: 120px

  h2
    font-size: 18px

  .save-btn, .cancel-btn
    margin: 0 
</style>
