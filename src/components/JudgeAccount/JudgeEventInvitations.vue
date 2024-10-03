<template>
    <div class="judge-invitation-container">
      <div class="judge-padding">
        <div class="judge-flex">
          <div class="judge-info-row">
            <div class="judge-date">
              <span>{{ date }}</span>
              <img :src="require('@/assets/image/Calendar.svg')" alt="">
            </div>
            <div class="judge-time">
              <span>{{ time }}</span>
              <img :src="require('@/assets/image/Time Square.svg')" alt="">
            </div>
          </div>
          <div class="judge-form-actions">
            <button class="judge-accept-btn">Принять</button>
            <button class="judge-decline-btn">Отклонить</button>
          </div>
        </div>
        <div class="judge-field-name judge-bg">
          <p>{{ eventName }}</p>           
        </div>
        <div class="judge-field-name">
          <p>{{ nominationName }}</p>           
        </div>
      </div>
      <div class="judge-padding">
        <div class="judge-flex">
          <div class="judge-info-row">
            <div class="judge-date">
              <span>{{ date }}</span>
              <img :src="require('@/assets/image/Calendar.svg')" alt="">
            </div>
            <div class="judge-time">
              <span>{{ time }}</span>
              <img :src="require('@/assets/image/Time Square.svg')" alt="">
            </div>
          </div>
          <div class="judge-form-actions">
            <button class="judge-accept-btn">Принять</button>
            <button class="judge-decline-btn">Отклонить</button>
          </div>
        </div>
        <div class="judge-field-name judge-bg">
          <p>{{ eventName }}</p>           
        </div>
        <div class="judge-field-name">
          <p>{{ nominationName }}</p>           
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "JudgeEventInvitations",
    data() {
      return {
        date: '01.09.2024',  // Пример даты
        time: '12:00',       // Пример времени
        eventName: 'Наименование мероприятия',
        nominationName: 'Наименование номинации'
      };
    }
  };
  </script>
  
  <style lang="sass" scoped>
  .judge-invitation-container
    width: 100%
    padding: 20px
    margin: 0 auto
    margin-top: 10px
    max-height: 790px
    overflow-y: auto
    
  
  .judge-padding
    padding: 20px
    border: 1px solid $second-active-color
    border-radius: 20px 
    position: relative
    margin-bottom: 20px
  
  .judge-form-actions
    display: flex
    justify-content: flex-end
    margin-bottom: 15px    
    width: 50%
    border: 1px solid $active-color
    border-radius: 30px
  
  .judge-accept-btn, .judge-decline-btn
    flex: 1
    padding: 10px 30px 
    color: black
    cursor: pointer
    text-align: center
    border: none
    border-radius: 0
    transition: background-color 0.3s ease
  
  .judge-accept-btn
    background-color: transparent
    border-right: 1px solid $active-color
    
    &:hover
      background-color: $active-color
  
  .judge-decline-btn
    background-color: transparent
    
    &:hover
      background-color: $active-color
      
  
  .judge-info-row
    display: flex
    justify-content: space-between
    margin-bottom: 20px
    font-weight: bold
  
  .judge-field-name
    border: 1px solid $second-active-color
    margin-bottom: 14px
    padding: 10px    
    border-radius: 20px
    p
      padding-left: 10px
  
  .judge-bg
    background: $active-color
    color: white
    margin-top: 20px
  
  .judge-flex
    display: flex
    justify-content: space-between
  
  .judge-date, .judge-time
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


@media (max-width: 480px)
  .judge-invitation-container
    background: $bg-color
    margin-top: 0
    padding: 2px
  .judge-flex
    flex-direction: column-reverse

  .judge-form-actions
    width: 100%
  .judge-info-row
    margin-bottom: 0
  .judge-time
    margin-right: 0
    background: transparent
  .judge-date
    background: transparent


@media (max-width: 360px)

  .judge-padding
    padding: 10px
  .judge-accept-btn, .judge-decline-btn
    padding: 10px

  .judge-date, .judge-time
    span
      margin-right: 0
    img
      margin-left: 6px

  .judge-field-name
    padding-left: 0
  </style>
  