<template>
    <div class="invitation-container">
      <div class="padding">
        <div class="flex">
            <div class="info-row">
                <div class="date">
                    <span>{{ date }}</span>
                    <img :src="require('@/assets/image/Calendar.svg')" alt="">
                </div>
                <div class="time">
                    <span>{{ time }}</span>
                    <img :src="require('@/assets/image/Time Square.svg')" alt="">
                </div>
            </div>
            <div class="form-actions">
                <button class="accept-btn">Принять</button>
                <button class="decline-btn">Отклонить</button>
            </div>
         
        </div>
        <div class="field-name bg">
          <p>{{ eventName }}</p>           
        </div>
        <div class="field-name">
          <p>{{ nominationName }}</p>           
        </div>
      </div>
      <div class="padding">
        <div class="flex">
            <div class="info-row">
                <div class="date">
                    <span>{{ date }}</span>
                    <img :src="require('@/assets/image/Calendar.svg')" alt="">
                </div>
                <div class="time">
                    <span>{{ time }}</span>
                    <img :src="require('@/assets/image/Time Square.svg')" alt="">
                </div>
            </div>
            <div class="form-actions">
                <button class="accept-btn">Принять</button>
                <button class="decline-btn">Отклонить</button>
            </div>
         
        </div>
        <div class="field-name bg">
          <p>{{ eventName }}</p>           
        </div>
        <div class="field-name">
          <p>{{ nominationName }}</p>           
        </div>
      </div>
   
    </div>
  </template>
  
  <script>
  export default {
    name: "TrainerEventInvitations",
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
  .invitation-container
    width: 100%
    padding: 20px
    margin: 0 auto
    margin-top: 10px
    max-height: 790px
    overflow-y: auto
  
  .padding
    padding: 20px
    border: 1px solid $second-active-color
    border-radius: 20px 
    position: relative
    margin-bottom: 20px
  
  .form-actions
    display: flex
    justify-content: flex-end
    margin-bottom: 15px    
    width: 50%
  
  .accept-btn, .decline-btn
    flex: 1
    padding: 10px 30px 
    color: black
    cursor: pointer
    text-align: center
    border: none
    border-radius: 0
    transition: background-color 0.3s ease
  
  .accept-btn
    background-color: transparent
    border-right: 1px solid $active-color
    
    &:hover
      background-color: $active-color
  
  .decline-btn
    background-color: transparent
    
    &:hover
      background-color: $active-color
  
  .info-row
    display: flex
    justify-content: space-between
    margin-bottom: 20px
    font-weight: bold
  
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
    margin-top: 20px

  .flex
    display: flex
    justify-content: space-between

  .date, .time
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


@media (max-width: 1200px)
  .flex
    flex-direction: column-reverse 
  .info-row
    margin-bottom: 0 
@media (max-width: 480px)
  .flex
    flex-direction: column-reverse
  

  .form-actions
    width: 100%
  .info-row
    margin-bottom: 0
  .time
    margin-right: 0

@media (max-width: 360px)
  .invitation-container
    padding: 10px
  .padding
    padding: 10px
  .accept-btn, .decline-btn
    padding: 10px

  .date, .time
    span
      margin-right: 0

  </style>
  