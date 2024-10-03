<template>
  <div class="layout">
    <div class="sidebar-area">
      <slot name="sidebar"></slot>
    </div>
    
    <div class="content-area">
      <div class="header-area">
        <h3>Тренер</h3>
      </div>
      <div class="main-content">
        <slot name="content"></slot>
      </div>
    </div>
    
    <div class="notifications-area">
      <slot name="notifications"></slot>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.layout
  display: flex
  height: 100vh
  padding: 30px
  
  

.sidebar-area
  // Добавьте стили для сайдбара, если необходимо

.content-area
  flex: 1
  background-color: #ffffff
  margin: 20px
  display: flex
  flex-direction: column
  border-radius: 30px

.header-area
  // Стили для заголовка
  background: $bg-color
  padding: 20px 0
  text-align: center
  

.main-content
  border-radius: 15px
  flex: 1


@media (max-width: 480px)
  .layout
    padding: 0
    width: 100%
    display: block
    height: 50vh

  .header-area
    text-align: left
    padding-bottom: 100px

  
  .media-content-text
    display: block
    background: #fff
    text-align: center
    border-radius: 30px
    padding: 30px
    margin: 30px
</style>
