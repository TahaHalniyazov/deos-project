<template>
  <div>

    <div class="burger-menu" @click="toggleMenu" v-if="isMobile">
      <div :class="{'burger-icon': true, 'open': isMenuOpen}">
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
      </div>
    </div>

    <div class="sidebar" :class="{ open: isMenuOpen || !isMobile }">
      <div class="profile-input">
        <input type="text" placeholder="Фамилия Имя Отчество" />
        <button class="edit-button"><img :src="require('@/assets/image/Edit.svg')" alt="edit"></button>
      </div>
      <MenuItem v-if="role === 'organizer'" title="Мероприятия">
        <ul>
          <li :class="{ active: activeItem === 'Create' }" @click="loadComponent('Create')">Создать +</li>
          <li :class="{ active: activeItem === 'Active' }" @click="loadComponent('Active')">Активные</li>
          <li :class="{ active: activeItem === 'Cancelled' }" @click="loadComponent('Cancelled')">Отмененные</li>
          <li :class="{ active: activeItem === 'Archived' }" @click="loadComponent('Archived')">Архивные</li>
        </ul>
      </MenuItem>
      <MenuItem v-if="role === 'organizer'" title="Номинации">
        <ul>
          <li :class="{ active: activeItem === 'NominationCreate' }" @click="loadComponent('NominationCreate')">Создать +</li>
          <li :class="{ active: activeItem === 'NominationApplication' }" @click="loadComponent('NominationApplication')">Заявки</li>
          <li :class="{ active: activeItem === 'NominationActive' }" @click="loadComponent('NominationActive')">Активные</li>
          <li :class="{ active: activeItem === 'NominationArchived' }" @click="loadComponent('NominationArchived')">Архивные</li>
        </ul>
      </MenuItem>
      <MenuItem v-if="role === 'organizer'" title="Тренеры">
        <ul>
          <li :class="{ active: activeItem === 'TrainerCreate' }" @click="loadComponent('TrainerCreate')">Создать +</li>
          <li :class="{ active: activeItem === 'TrainerActive' }" @click="loadComponent('TrainerActive')">Активные</li>
          <li :class="{ active: activeItem === 'TrainerDelete' }" @click="loadComponent('TrainerDelete')">Удаленные</li>
        </ul>
      </MenuItem>
      <MenuItem v-if="role === 'organizer'" title="Судьи">
        <ul>
          <li :class="{ active: activeItem === 'JudgeCreate' }" @click="loadComponent('JudgeCreate')">Создать +</li>
          <li :class="{ active: activeItem === 'JudgeActive' }" @click="loadComponent('JudgeActive')">Активные</li>
          <li :class="{ active: activeItem === 'JudgeDelete' }" @click="loadComponent('JudgeDelete')">Удаленные</li>        
        </ul>
      </MenuItem>
      <MenuItem v-if="role === 'organizer'" title="Ведущие">
        <ul>
          <li :class="{ active: activeItem === 'HostCreate' }" @click="loadComponent('HostCreate')">Создать +</li>
          <li :class="{ active: activeItem === 'HostActive' }" @click="loadComponent('HostActive')">Активные</li>
          <li :class="{ active: activeItem === 'HostDelete' }" @click="loadComponent('HostDelete')">Удаленные</li> 
        </ul>
      </MenuItem>
      <MenuItem v-if="role === 'trainer'" title="Мероприятия">
        <ul>
          <li :class="{ active: activeItem === 'TrainerEventInvitations' }" @click="loadComponent('TrainerEventInvitations')">Приглашения</li>
          <li :class="{ active: activeItem === 'TrainerEventActive' }" @click="loadComponent('TrainerEventActive')">Активные</li>       
          <li :class="{ active: activeItem === 'TrainerEventArchived' }" @click="loadComponent('TrainerEventArchived')">Архивные</li>
        </ul>
      </MenuItem>
      <MenuItem v-if="role === 'trainer'" title="Команды">
        <ul>
          <li :class="{ active: activeItem === 'TrainerTeam' }" @click="loadComponent('TrainerTeam')">Команды</li>
          <li :class="{ active: activeItem === 'ParticipantList' }" @click="loadComponent('ParticipantList')">Участники</li>
          <li :class="{ active: activeItem === 'DeleteParticipant' }" @click="loadComponent('DeleteParticipant')">Удаленные</li>       
        </ul>
      </MenuItem>
      <MenuItem v-if="role === 'judge'" title="Мероприятия">
        <ul>
          <li :class="{ active: activeItem === 'JudgeEventInvitations' }" @click="loadComponent('JudgeEventInvitations')">Приглашения</li>
          <li :class="{ active: activeItem === 'JudgeEventActive' }" @click="loadComponent('JudgeEventActive')">Активные</li>       
          <li :class="{ active: activeItem === 'JudgeEventArchived' }" @click="loadComponent('JudgeEventArchived')">Архивные</li>      
        </ul>
      </MenuItem>
      <MenuItem v-if="role === 'host'" title="Мероприятия">
        <ul>
          <li :class="{ active: activeItem === 'HostEventInvitations' }" @click="loadComponent('HostEventInvitations')">Приглашения</li>
          <li :class="{ active: activeItem === 'HostEventActive' }" @click="loadComponent('HostEventActive')">Активные</li>       
          <li :class="{ active: activeItem === 'HostEventArchived' }" @click="loadComponent('HostEventArchived')">Архивные</li>      
        </ul>
      </MenuItem>
    </div>
  </div>
</template>

<script>
import MenuItem from '@/components/MenuItem.vue';

export default {
  components: {
    MenuItem,
  },
  props: {
    role: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      activeItem: null,
      isMenuOpen: false,
      isMobile: window.innerWidth <= 480, // Переменная для отслеживания активного элемента
    };
  },
  methods: {

    toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    console.log('Меню открыто/закрыто:', this.isMenuOpen);
  },
  loadComponent(componentName) {
    this.activeItem = componentName;
    this.$emit('selectComponent', componentName);

    // Принудительно закрываем меню на мобильных устройствах после выбора пункта
    
  },
  checkIfMobile() {
    this.isMobile = window.innerWidth <= 480;
    console.log("Проверка устройства, мобильное:", this.isMobile);
  },
  loadComponent(componentName) {
  this.activeItem = componentName; // Обновляем активный элемент
  this.$emit('selectComponent', componentName);
  
  if (this.isMobile && this.isMenuOpen) {
    console.log('Закрываем меню после выбора элемента:', componentName);
    this.isMenuOpen = false; // Закрытие меню
  }

  // Общие уведомления для компонентов создания
  const commonFields = {
    Create: [
      'Укажите дату',
      'Укажите время',
      'Заполните графу "Название мероприятия"',
      'Выберите Номинацию из списка',
      'Выберите Ведущего из списка',
      'Выберите Тренера из списка',
      'Выберите Судью из списка'
    ],
    NominationCreate: [
      'Укажите наименование номинации',
      'Укажите приз 1-е место',
      'Укажите приз 2-е место',
      'Укажите приз 3-е место'
    ],
    TrainerCreate: [
      'Укажите ФИО',
      'Укажите логин',
      'Укажите пароль'
    ],
    JudgeCreate: [
      'Укажите ФИО',
      'Укажите логин',
      'Укажите пароль'
    ],
    HostCreate: [
      'Укажите ФИО',
      'Укажите логин',
      'Укажите пароль'
    ]
  };

  if (commonFields[componentName]) {
    this.$emit('notify', commonFields[componentName]);
  } else {
    this.$emit('notify', []); // Сбрасываем уведомления для других кнопок
  }
}
  },
  mounted() {
    window.addEventListener('resize', this.checkIfMobile); // Проверка изменения размеров окна
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.checkIfMobile); // Очищаем слушатель событий
  },
};
</script>

<style scoped lang="sass">
.sidebar
  width: 400px
  background-color: $bg-color
  padding: 20px

  &.open
    display: block

ul
  list-style-type: none
  margin-bottom: 30px

li
  cursor: pointer
  margin-bottom: 6px
  padding: 4px
  border-radius: 30px
  background-color: $second-active-color
  text-align: center

  &:hover
    background-color: $active-color

li.active
  background-color: $active-color
  color: white
  font-weight: bold
.profile-input
  display: flex
  border-bottom: 1px solid $second-active-color
  margin-bottom: 30px
.burger-menu
  display: none
  position: fixed
  top: 48px
  right: 20px
  z-index: 2000
  cursor: pointer

  .burger-icon
    width: 30px
    height: 16px
    position: relative
    display: flex
    flex-direction: column
    justify-content: space-between

    .line
      background-color: black
      height: 2px
      width: 100%
      transition: 0.3s ease

    &.open
      .line:nth-child(1)
        transform: rotate(45deg)
        position: absolute
        top: 10px

      .line:nth-child(2)
        opacity: 0

      .line:nth-child(3)
        transform: rotate(-45deg)
        position: absolute
        top: 10px
@media (max-width: 1200px)
  .sidebar
    width: 200px
    input
      padding: 2px
      font-size: 14px
    button
      display: none
  
    padding: 20px 10px
@media (max-width: 480px)
  .sidebar
    width: 70%
    position: fixed
    right: 0
    top: 30px
    z-index: 1999
    background-color: $second-active-color
    display: none
    height: 70%
    text-align: left
    overflow-y: scroll
    border-top-left-radius: 20px
    border-bottom-left-radius: 20px
    padding: 30px
 
  li
    text-align: left
    border-bottom: 1px solid $active-color
    padding-left: 10px
  .profile-input
    margin-bottom: 4px
    border-bottom: 1px solid #fff
    margin-top: 60px
    &.open
      display: block

  .burger-menu
    display: block
@media (max-width: 360px)
  .sidebar
      padding: 10px
      input
        margin-bottom: 0
        padding: 0
      img
        display: none
      .edit-button
        display: none
</style>