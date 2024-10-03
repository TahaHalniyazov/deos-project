<template>
    <div>
      <!-- Кнопка "Назад" отображается только на мобильных устройствах и если есть история компонентов -->
      <div v-if="isMobile && componentHistory.length > 0" class="back-button" @click="goBack">
        
        <p>Назад</p>
      </div>
  
      <!-- Текущий компонент -->
      <component :is="currentComponent" />
    </div>
</template>
<script>
export default {
  data() {
    return {
      currentComponent: 'DefaultComponent',  // Стартовый компонент
      componentHistory: [],                  // Массив для хранения истории компонентов
      isMobile: window.innerWidth <= 480,    // Проверка мобильного устройства
    };
  },
  methods: {
    // Метод для выбора нового компонента
    loadComponent(componentName) {
      if (this.currentComponent) {
        // Добавляем текущий компонент в историю, если он уже загружен
        this.componentHistory.push(this.currentComponent);
      }
      // Устанавливаем новый компонент как текущий
      this.currentComponent = componentName;
    },

    // Метод для перехода назад к предыдущему компоненту
    goBack() {
      if (this.componentHistory.length > 0) {
        // Извлекаем последний компонент из истории и делаем его текущим
        this.currentComponent = this.componentHistory.pop();
      }
    },

    // Проверка мобильного устройства
    checkIfMobile() {
      this.isMobile = window.innerWidth <= 480;
    },
  },
  mounted() {
    this.checkIfMobile(); // Проверяем при первой загрузке компонента
    window.addEventListener('resize', this.checkIfMobile); // Добавляем слушатель изменения размера экрана
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.checkIfMobile); // Удаляем слушатель при уничтожении компонента
  },
};
</script>
<style scoped lang="sass">
.back-button
  display: flex
  align-items: center
  cursor: pointer
  padding: 10px 15px
  background-color: #fff
  border-bottom: 1px solid #ccc

p
  font-size: 16px
  font-weight: bold
  margin: 0

@media (min-width: 481px)
  .back-button
    display: none
</style>