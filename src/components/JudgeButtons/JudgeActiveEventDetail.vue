<template>
    <div class="judge-detail">
      <h4 class="display">Активные судьи</h4>
      <div class="actions">
        <button class="edit-btn">Редактировать</button>
        <button class="delete-btn" @click="deleteJudge">Удалить</button>
      </div>
      <div class="form-group">
        <input type="text" v-model="judge.name" class="large-input" disabled placeholder="ФИО судьи" />
      </div>
      <div class="form-group form-group-inline">
        <input type="text" v-model="judge.login" class="small-input" disabled placeholder="Логин" />
        <input type="password" v-model="judge.password" class="small-input" disabled placeholder="Пароль" />
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'JudgeActiveEventDetail',
    props: {
      judge: {
        type: Object,
        required: true
      }
    },
    methods: {
      deleteJudge() {
        this.$store.dispatch('deleteJudge', this.judge);
        this.$emit('judge-deleted'); // Сообщаем родителю, что судья удалён
      }
    },
  };
  </script>
  
  <style scoped lang="sass">
  .judge-detail 
    width: 100%    
    padding: 20px
  
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
  .display
    display: none


@media (max-width: 480px)
  .judge-detail
    
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
  