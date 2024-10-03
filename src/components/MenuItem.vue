<template>
  <div>
    <div class="menu-title" :class="{ open: isOpen }" @click="toggle">
      {{ title }}
      <span class="arrow" :class="{ open: isOpen }">
        <img :src="require('@/assets/image/Iconly.svg')" alt="arrow">
      </span>
    </div>
    <transition @enter="enter" @leave="leave">
      <ul v-show="isOpen" ref="menu">
        <slot></slot>
      </ul>
    </transition>
  </div>
</template>

<script>
export default {
  props: ['title'],
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    toggle() {
      this.isOpen = !this.isOpen;
    },
    enter(el) {
      el.style.height = '0px';
      el.style.opacity = '0';
      el.offsetHeight; // Триггер для перерисовки
      el.style.transition = 'height 0.3s ease, opacity 0.3s ease';
      el.style.height = el.scrollHeight + 'px';
      el.style.opacity = '1';
    },
    leave(el) {
      el.style.height = el.scrollHeight + 'px';
      el.offsetHeight; // Триггер для перерисовки
      el.style.transition = 'height 0.3s ease, opacity 0.3s ease';
      el.style.height = '0px';
      el.style.opacity = '0';
    }
  },
};
</script>

<style lang="sass" scoped>
.menu-title
  display: flex
  justify-content: center
  cursor: pointer
  padding: 10px
  border-bottom: 2px solid $second-active-color
  border-radius: 20px
  font-size: 18px
  font-weight: 500
  transition: border 0.3s
  margin-bottom: 22px
  &.open
    border-bottom: none
    border-top: 2px solid $second-active-color

  .arrow 
    display: inline-block
    transition: transform 0.3s
    width: 24px // ширина стрелки
    height: 24px // высота стрелки
    text-align: center // центрируем стрелку по горизонтали
    margin-left: 10px
    margin-top: 4px

.arrow.open
  transform: rotate(180deg)
  
  

ul
  list-style: none
  margin: 0  
  overflow: hidden

@media (max-width: 480px) 
  .menu-title
    justify-content: flex-start
    margin-bottom: 10px

@media (max-width: 360px) 
  .menu-title
    
    margin-bottom: 0
</style>
