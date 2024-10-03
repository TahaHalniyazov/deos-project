<template>
    <div class="trainer-detail">
      <h4 class="display">Активные тренеры</h4>
      <div class="actions">
        <button class="edit-btn">Редактировать</button>
        <button class="delete-btn" @click="deleteTrainer">Удалить</button>
      </div>
      <div class="form-group">
        <input type="text" v-model="trainer.name" class="large-input" disabled placeholder="ФИО тренера" />
      </div>
      <div class="form-group form-group-inline">
        <input type="text" v-model="trainer.login" class="small-input" disabled placeholder="Логин" />
        <input type="password" v-model="trainer.password" class="small-input" disabled placeholder="Пароль" />
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'TrainerActiveEventDetail',
    props: {
      trainer: {
        type: Object,
        required: true
      }
    },
    methods: {
      deleteTrainer() {
        this.$store.dispatch('deleteTrainer', this.trainer);
        this.$emit('trainer-deleted'); // Сообщаем родителю, что тренер удалён
      }
    },
    
  };
  </script>
  
  <style scoped lang="sass">
  .trainer-detail 
    width: 100%    
    padding: 20px
  .display
    display: none
  .actions
    display: flex
    justify-content: space-between
    border-radius: 30px
    border: 1px solid $active-color
    background-color: transparent
    overflow: hidden
    margin-bottom: 40px
    width: 50%
    
    .edit-btn, .delete-btn    
        flex: 1
        padding: 10px 30px 
        color: black
        cursor: pointer
        text-align: center
        border: none
        border-radius: 0
        transition: background-color 0.3s ease
  
    .edit-btn
        border-right: 1px solid $active-color
  
        &:hover
            background-color: $active-color
  
    .delete-btn 
        &:hover
            background-color: $active-color
  
  .form-group 
    margin-bottom: 15px
  
  .form-group-inline
    display: flex
    justify-content: space-between
    align-items: center
  
  input[type="text"], input[type="password"] 
    width: 100%
    padding: 12px
    border: 1px solid #007bff
    border-radius: 25px
    font-size: 14px
    color: #000
    outline: none
  
  input::placeholder 
    color: #9CA3AF
  
  .large-input
    width: 100%  // Полная ширина для большого поля ввода
  
  .small-input
    width: 48%  // Поля в одной строке, каждое занимает 48% ширины

@media (max-width: 480px)
  .trainer-detail
    
  .actions
    width: 100%
    .edit-btn, .delete-btn
      padding: 10px
  .display
    display: block
    text-align: center
    margin-bottom: 20px
  .form-group-inline
    display: block
  </style>
  