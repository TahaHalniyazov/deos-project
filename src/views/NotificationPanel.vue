<template>
  <div class="main">
    <div class="notification-icon" @click="toggleNotifications">
      <img :src="isNotificationPanelOpen ? require('@/assets/image/close.svg') : require('@/assets/image/Notification.svg')" alt="Уведомления" />
      <span v-if="isMobile && notifications.length" class="notification-count">{{ notifications.length }}</span>
    </div>
    
    <div v-if="isNotificationPanelOpen" class="overlay" @click="toggleNotifications"></div>

    <div :class="['notification-panel',  { open: isNotificationPanelOpen }]">
      <h4>Панель уведомлений</h4>
      <div class="">
        <ul>
          <li v-for="notification in notifications" :key="notification.id">
            {{ notification.message }}
          </li>
        </ul>
      </div>
    </div>
</div>
</template>

<script>
export default {
  props: {
    notifications: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isNotificationPanelOpen: false, // Контроль открытия панели
    };
  },
  methods: {
    toggleNotifications() {
      this.isNotificationPanelOpen = !this.isNotificationPanelOpen;
      if (this.isNotificationPanelOpen) {
        document.body.style.overflow = 'hidden'; // Отключаем скролл при открытой панели
      } else {
        document.body.style.overflow = ''; // Восстанавливаем скролл
      } // Переключение панели
    },
    checkIfMobile() {
      this.isMobile = window.innerWidth <= 480;
    },
  },
  mounted() {
    this.checkIfMobile(); // Проверка при загрузке страницы
    window.addEventListener('resize', this.checkIfMobile); // Проверка при изменении размеров экрана
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.checkIfMobile); // Удаляем слушатель при уничтожении компонента
  },
  
};
</script>

<style lang="sass" scoped>
.main
  height: 100%
  width: 400px
  border-bottom-left-radius: 30px
  border-top-left-radius: 30px
  border-left: 2px solid $second-active-color  
  padding: 20px
  overflow-y: scroll

.notification-panel 
   
  background-color: $bg-color

.notification-panel h4
  margin-bottom: 20px
  text-align: center

.notification-panel ul 
  list-style: none
  padding: 0
  margin-top: 40px

.notification-panel li 
  background: linear-gradient( #FF8484 0%, #D00000 100%)
  color: white
  padding: 16px
  margin-bottom: 10px
  border-radius: 30px

.notification-icon
  display: none // Скрываем иконку на десктопной версии
.notification-count
  position: absolute
  top: -10px
  right: -10px
  background-color: #FF6B00
  color: white
  border-radius: 50%
  padding: 5px 10px
  font-size: 12px
  font-weight: bold
  z-index: 1001
  
.overlay
  position: fixed
  top: 0
  left: 0
  width: 100vw
  height: 100vh
  background-color: rgba(0, 0, 0, 0.5) // Полупрозрачный фон
  z-index: 999 // За панелью уведомлений
// Медиа-запросы для мобильной версии (480px и меньше)
@media (max-width: 1200px)
  .main
    width: 260px
@media (max-width: 480px)
  .main
    height: auto
    border-bottom-left-radius: 30px
    border-top-left-radius: 30px
    border-left: none
  .notification-panel
    width: 100%
    padding: 20px
    border: 1px solid $second-active-color
    border-radius: 20px
    position: fixed
    right: 0
    top: 80px
    height: 90%
    background-color: white
    transform: translateX(100%) // Скрыто по умолчанию
    transition: transform 0.3s ease-in-out // Плавное открытие/закрытие
    z-index: 1000
    overflow-y: scroll 

    &.open
      transform: translateX(0) // Открытое состояние

  .notification-icon
    display: block // Показываем иконку на мобильных
    position: absolute
    top: 80px
    right: 20px
    z-index: 1001
    cursor: pointer
    border: 1px solid $active-color
    padding: 6px 10px
    padding-top: 10px
    border-radius: 14px

  .notification-icon img
    width: 20px
    height: 20px
  .notification-area
    display: none
</style>