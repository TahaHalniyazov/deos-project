<template>
    <div class="host-invitation-container">
      <div class="host-padding">
        <div class="host-flex">
          <div class="host-info-row">
            <div class="host-date">
              <span>{{ date }}</span>
              <img :src="require('@/assets/image/Calendar.svg')" alt="">
            </div>
            <div class="host-time">
              <span>{{ time }}</span>
              <img :src="require('@/assets/image/Time Square.svg')" alt="">
            </div>
          </div>
          <div class="host-form-actions">
            <button class="host-accept-btn">Принять</button>
            <button class="host-decline-btn">Отклонить</button>
          </div>
        </div>
        <div class="host-field-name host-bg">
          <p>{{ eventName }}</p>           
        </div>
        <div class="host-field-name">
          <p>{{ nominationName }}</p>           
        </div>
      </div>
      <div class="host-padding">
        <div class="host-flex">
          <div class="host-info-row">
            <div class="host-date">
              <span>{{ date }}</span>
              <img :src="require('@/assets/image/Calendar.svg')" alt="">
            </div>
            <div class="host-time">
              <span>{{ time }}</span>
              <img :src="require('@/assets/image/Time Square.svg')" alt="">
            </div>
          </div>
          <div class="host-form-actions">
            <button class="host-accept-btn">Принять</button>
            <button class="host-decline-btn">Отклонить</button>
          </div>
        </div>
        <div class="host-field-name host-bg">
          <p>{{ eventName }}</p>           
        </div>
        <div class="host-field-name">
          <p>{{ nominationName }}</p>           
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "HostEventInvitations",
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
  .host-invitation-container
    width: 100%
    padding: 20px
    margin: 0 auto
    margin-top: 10px
    max-height: 790px
    overflow-y: auto
  
  .host-padding
    padding: 20px
    border: 1px solid $second-active-color
    border-radius: 20px 
    position: relative
    margin-bottom: 20px
  
  .host-form-actions
    display: flex
    justify-content: flex-end
    margin-bottom: 15px    
    width: 50%
    border: 1px solid $active-color
    border-radius: 30px
  
  .host-accept-btn, .host-decline-btn
    flex: 1
    padding: 10px 30px 
    color: black
    cursor: pointer
    text-align: center
    border: none
    border-radius: 0
    transition: background-color 0.3s ease
  
  .host-accept-btn
    background-color: transparent
    border-right: 1px solid $active-color
    
    &:hover
      background-color: $active-color
      border-radius: 30px
  
  .host-decline-btn
    background-color: transparent
    
    &:hover
      background-color: $active-color
  
  .host-info-row
    display: flex
    justify-content: space-between
    margin-bottom: 20px
    font-weight: bold
  
  .host-field-name
    border: 1px solid $second-active-color
    margin-bottom: 14px
    padding: 10px    
    border-radius: 20px
    p
      padding-left: 10px
  
  .host-bg
    background: $active-color
    color: white
    margin-top: 20px
  
  .host-flex
    display: flex
    justify-content: space-between
  
  .host-date, .host-time
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
  .host-flex
    flex-direction: column-reverse
  .host-form-actions
    width: 100%

@media (max-width: 480px)
  .host-invitation-container
    background: $bg-color
    margin-top: 0
    padding: 2px
  .host-flex
    flex-direction: column-reverse

  .host-form-actions
    width: 100%
  .host-info-row
    margin-bottom: 0
  .host-time
    margin-right: 0
    background: transparent
  .host-date
    background: transparent


@media (max-width: 360px)

  .host-padding
    padding: 10px
  .host-accept-btn, .host-decline-btn
    padding: 10px

  .host-date, .host-time
    span
      margin-right: 0
    img
      margin-left: 6px

  .host-field-name
    padding-left: 0
  </style>
  