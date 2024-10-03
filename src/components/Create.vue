<template>
  <div class="create-event">
    
    <div class="event-header"> 
      
      <h2>Создание нового мероприятия</h2>
      <div class="form-actions">
        <button class="save-btn">Сохранить</button>
        <button class="cancel-btn">Отменить</button>
      </div>
    
    </div>
    <div class="form-group">
        <div class="form-group-item-1">          
            <label class="label-date">Укажите дату</label>
            <div class="date-picker">
              <Datepicker v-model="selectedDate" :format="customFormat" :locale="locale" placeholder="ДД/ММ/ГГГГ" />
              <img :src="require('@/assets/image/Calendar.svg')" alt="Time Icon" class="time-icon">
            </div>
        </div>
        <div class="form-group-item-2" style="position: relative;">
        <label class="label-time">Укажите время</label>
        <div class="time-picker" @click="toggleTimeDropdown">
          <span class="time-display">{{ time }}</span>
          <img :src="require('@/assets/image/Time Square.svg')" alt="Time Icon" class="time-icon">
        </div>
        <transition
          name="dropdown"
          @before-enter="beforeEnter"
          @enter="enter"
          @leave="leave"
        >
          <div v-show="timeDropdownOpen" class="select-options-dropdown">
            <label v-for="option in timeOptions" :key="option" @click="selectTime(option)">
              {{ option }}
            </label>
          </div>
        </transition>
      </div>
    </div>

    <div class="form-group">      
      <input type="text" placeholder="Введите Название мероприятия..." class="large-input"/>
    </div>

    <div class="form-group">
        <div class="select-container">          
          <div class="custom-select">
            <div class="select-box" @click="toggleDropdown">
              <span>Выберите Номинацию из списка</span>
              <img :src="require('@/assets/image/Stroke (1).svg')" alt="Arrow">
            </div>
            <transition
              name="dropdown"
              @before-enter="beforeEnter"
              @enter="enter"
              @leave="leave"
            >
              <div v-show="dropdownOpen" class="select-options">
                <label v-for="option in options" :key="option"> {{ option }}  <input type="checkbox" :value="option" v-model="selectedOptions" /></label>              
              </div>
          </transition>
          </div>
      </div>
    </div>

    <div class="form-group">      
      <div class="select-container">          
        <div class="custom-select">
          <div class="select-box" @click="toggleHostDropdown">
            <span>Выберите Ведущего из списка</span>
            <img :src="require('@/assets/image/Stroke (1).svg')" alt="Arrow">
          </div>
          <transition
            name="dropdown"
            @before-enter="beforeEnter"
            @enter="enter"
            @leave="leave"
          >
            <div v-show="hostDropdownOpen" class="select-options">
              <label v-for="host in hosts" :key="host"> 
                {{ host }}  
                <input type="checkbox" :value="host" v-model="selectedHosts" />
              </label>              
            </div>
          </transition>
        </div>
      </div>
    </div>


    <div class="form-group">
      <button class="custom-button">
        Добавить Тренера
        <img :src="require('@/assets/image/Vector (2).svg')" alt="Plus">
      </button>
    </div>

    <div class="form-group">
      <button class="custom-button">
        Добавить Cудью
        <img :src="require('@/assets/image/Vector (2).svg')" alt="Plus">
      </button>
    </div>

   
  </div>
</template>

<script>
import Datepicker from '@vuepic/vue-datepicker';
import BackButton from '@/components/BackButton.vue';
import '@vuepic/vue-datepicker/dist/main.css';
import { ru } from 'date-fns/locale';


export default {
  name: 'Create',
  components: {
    Datepicker,
    BackButton
    
  },
  data() {
    return {
      selectedDate: null, // Переменная для хранения выбранной даты
      time: '00:00',
      timeOptions: [
        "00:00", "00:30", "01:00", "01:30", "02:00",
        "02:30", "03:00", "03:30", "04:00", "04:30",
        "05:00", "05:30", "06:00", "06:30", "07:00",
        "07:30", "08:00", "08:30", "09:00", "09:30",
        "10:00", "10:30", "11:00", "11:30", "12:00",
        "12:30", "13:00", "13:30", "14:00", "14:30",
        "15:00", "15:30", "16:00", "16:30", "17:00",
        "17:30", "18:00", "18:30", "19:00", "19:30",
        "20:00", "20:30", "21:00", "21:30", "22:00",
        "22:30", "23:00", "23:30"
      ],
      timeDropdownOpen: false,
      locale: ru, 
      dropdownOpen: false,
      options: [
        "Наименование номинации 1",
        "Наименование номинации 2",
        "Наименование номинации 3",
        "Наименование номинации 4",
        "Наименование номинации 5",
        "Наименование номинации 6",
        "Наименование номинации 7",
        "Наименование номинации 8",
        "Наименование номинации 9 "
      ],
      selectedOptions: [],
      hostDropdownOpen: false,
      hosts: [
        "Ведущий 1",
        "Ведущий 2",
        "Ведущий 3",
        "Ведущий 4",
        "Ведущий 5"
      ],
    };  
},
methods: {
  selectTime(option) {
      this.time = option;
      this.timeDropdownOpen = false; // Закрытие списка после выбора времени
    },
    toggleTimeDropdown() {
      this.timeDropdownOpen = !this.timeDropdownOpen;
    },
    saveEvent() {
      // Здесь можно обработать сохранение события, используя date и time
      console.log('Сохранено событие:', this.date, this.time);
      
    },
    toggleHostDropdown() {
      this.hostDropdownOpen = !this.hostDropdownOpen;
    },
    toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  },
  beforeEnter(el) {
    el.style.maxHeight = '0px';
    el.style.padding = '0 10px';
    
    
  },
  enter(el, done) {
    el.style.maxHeight = '0px';
    el.style.padding = '0 10px';
   
      
    
    requestAnimationFrame(() => {
      el.style.maxHeight = '115px'; // Применяем max-height
      el.style.padding = '10px 0';
      
    });
    setTimeout(done, 500); // Таймаут должен соответствовать времени transition
  },
  leave(el, done) {
    el.style.maxHeight = el.scrollHeight + 'px'; // Устанавливаем начальную высоту при сворачивании
    el.offsetHeight; // Форсируем перерисовку
    el.style.maxHeight = '0px'; // Плавно уменьшаем высоту до 0
    el.style.padding = '0 10px'; // Уменьшаем padding до 0
    
    setTimeout(done, 500); // Таймаут должен соответствовать времени transition
  }
  },
computed: {
    customFormat() {
      return this.selectedDate
        ? this.selectedDate.toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          })
        : '';
    },
  }
}
</script>

<style  lang="sass"  >
.create-event
  padding: 40px
  background-color: #fff


.form-group
  margin-bottom: 15px
  display: flex
  flex-wrap: wrap
.select-container
  position: relative
  display: inline-block
  width: 100%

.custom-select
  position: relative
  width: 100%
  border: 1px solid $active-color
  border-radius: 10px
  transition: all 0.5s ease
  

.select-box
  width: 100%
  padding: 16px
  font-size: 16px
  
  display: flex
  justify-content: space-between
  align-items: center
  cursor: pointer
  

.select-options
  display: flex
  flex-direction: column
  justify-content: space-between
  overflow-y: auto 
  transition: max-height 0.5s ease, padding 0.5s ease
  background: white
  border-radius: 0 0 10px 10px
  
  &::-webkit-scrollbar 
    width: 6px // Ширина полосы прокрутки
    background-color: $second-active-color // Цвет фона канала
  

  &::-webkit-scrollbar-thumb 
    background-color: #00044B // Цвет бегунка
    border-radius: 10px // Закругленные углы бегунка
    width: 10px
    background-clip: padding-box
    
  

  &::-webkit-scrollbar-thumb:hover 
    background-color: $active-color // Цвет бегунка при наведении
    

  &::-webkit-scrollbar-track 
    background-color: $second-active-color // Цвет канала полосы прокрутки
  

  &::-webkit-scrollbar-thumb:hover 
    background-color: #00044B// Цвет бегунка при наведении
    
  
  label
    display: flex
    align-items: center
    justify-content: space-between 
    padding: 4px
    width: 98% 
    margin: 0 auto
    margin-bottom: 20px
    cursor: pointer
    border-bottom: 2px solid #eee
    
  input[type="checkbox"] 
    -webkit-appearance: none
    -moz-appearance: none
    appearance: none
    width: 6px /* Размер чекбокса */
    height: 6px
    border: 1px solid #000 /* Граница чекбокса */
    border-radius: 4px/* Закругленные углы */
    position: relative
    cursor: pointer
  input[type="checkbox"]::after 
    content: ""
    position: absolute
    top: 2px
    left: 6px
    width: 6px
    height: 12px
    border: solid #00044B
    border-width: 0 2px 2px 0
    transform: rotate(45deg)
    opacity: 0 
    transition: opacity 0.2s ease-in-out


  /* Отображение галочки при нажатии */
  input[type="checkbox"]:checked::after 
    opacity: 1


  




 

    

// Переходы для открытия/закрытия выпадающего списка
// Переходы для раскрытия списка
.dropdown-enter-active, .dropdown-leave-active
  transition: max-height 0.5s ease, padding 0.5s ease

.dropdown-enter, .dropdown-leave-to
  max-height: 0
  padding: 0

.form-group-item
  flex: 1
  margin-right: 10px
.form-group-item-2 
  margin-left: 14px


input, select
  width: 100%
  padding: 10px
  margin-bottom: 10px
  border-radius: 20px
  border: 1px solid $active-color
  outline: none
  


  

.form-actions
  display: flex
  justify-content: space-between
  border-radius: 30px
  border: 1px solid $active-color
  background-color: transparent
  overflow: hidden

.save-btn, .cancel-btn    
  flex: 1
  padding: 10px 30px 
  color: black
  cursor: pointer
  text-align: center
  border: none
  border-radius: 0
  transition: background-color 0.3s ease

.save-btn
  border-right: 1px solid $active-color

  &:hover
    background-color: $active-color

.cancel-btn 
    &:hover
      background-color: $active-color

.event-header
  display: flex
  justify-content: space-between


.custom-button
  display: flex
  justify-content: space-between
  align-items: center
  width: 100%
  padding: 10px 20px
  border-radius: 20px
  border: 1px solid #007bff /* Замените на нужный вам цвет */
  background-color: transparent
  cursor: pointer
  transition: background-color 0.3s ease, border-color 0.3s ease
  &:hover
    background-color: rgba(0, 123, 255, 0.1) /* Легкий синий фон при наведении */
    border-color: #0056b3 /* Цвет границы при наведении */


  
.time-picker
  display: flex
  align-items: center
  padding: 6px
  border: 1px solid #007bff // Цвет границы
  border-radius: 30px // Закругленные углы
  background-color: transparent
  cursor: pointer
  transition: background-color 0.3s ease, border-color 0.3s ease

  &:hover
    background-color: rgba(0, 123, 255, 0.1) // Легкий синий фон при наведении
    border-color: #0056b3 // Цвет границы при наведении

.large-input
  width: 100%
  padding: 10px
  margin-bottom: 10px
  border-radius: 20px
  border: 1px solid #527AFE
  outline: none


.time-display
  margin-right: 10px
  font-size: 16px
  color: #333 // Цвет текста

.time-icon
  width: 20px // Размер иконки
  height: 20px


.select-options-dropdown
  position: absolute
  // Чтоб список появлялся под тайм-пикером
  left: 0
  right: 0
  z-index: 1000 // Чтоб он был выше всего остального
  padding: 10px
  border: 1px solid #007bff // Цвет границы
  border-radius: 10px // Закругленные углы
  background-color: #fff
  max-height: 150px // Ограничение по высоте
  overflow-y: auto // Скролл при большом количестве опций
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1) // Лёгкая тень

  &::-webkit-scrollbar 
    width: 6px // Ширина полосы прокрутки
    background-color: #f0f0f0 // Цвет фона канала
  
  &::-webkit-scrollbar-thumb 
    background-color: #00044B // Цвет бегунка
    border-radius: 10px // Закругленные углы бегунка


  label
    display: flex
    align-items: center
    justify-content: space-between 
    padding: 8px
    cursor: pointer
    transition: background-color 0.3s ease
    &:hover
      background-color: rgba(0, 123, 255, 0.1) // Лёгкий синий фон при наведении
// Анимация для плавного открытия/закрытия списка
.fade-enter-active, .fade-leave-active
  transition: opacity 0.5s

.fade-enter, .fade-leave-to
  opacity: 0




.dp__main 

  .dp__input
    border: 1px solid $active-color !important 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1) !important 
    border-radius: 30px
    padding: 6px
  .dp__button svg
    display: none
  .dp__action_row
    padding: 0
  .dp__calendar_header_item
    color: $active-color
    
  .dp__input_icons
    
    display: none
  .dp__menu
    border-radius: 20px
    border-color: $second-active-color
    padding: 10px
    
.form-group-item-1
  .date-picker
    display: flex
  
  img
    margin-left: -40px
    margin-top: 10px
    z-index: 10000
@media (max-width: 1200px)
  .create-event
    padding: 14px
    h2
      font-size: 21px
    .event-header
      align-items: center
@media (max-width: 480px)
  .create-event
    padding: 20px
    border-radius: 30px
  
  .event-header
    flex-direction: column
    align-items: flex-start
    h2
      font-size: 18px
      margin: 10px 0
  
  .form-group
    flex-wrap: nowrap
    align-items: center
    justify-content: space-between
    margin: 10px 0
    
    
    
  .form-group-item-1, .form-group-item-2
    width: 100%
    margin-right: 0
    margin-left: 0
    margin-bottom: 10px

  .custom-select
    width: 100%
    font-size: 14px
  
  .large-input
    font-size: 14px
    padding: 8px
  
  .time-picker
    font-size: 14px
    padding: 8px
    margin-bottom: 10px
    margin-left: 8px
    
    
  .time-icon
    width: 16px
    height: 16px

  .save-btn, .cancel-btn
    flex: none
    width: 48%
    padding: 8px

  .form-actions
    flex-direction: row
    justify-content: space-between
    width: 100%
    margin: 10px 0
    
  .custom-button
    width: 100%
    font-size: 14px
    padding: 8px
  .label-time, .label-date
    display: none

@media (max-width: 360px)

  .event-header
    h2
      font-size: 16px

  .form-group
    flex-wrap: wrap
    .time-picker
      margin-left: 0
  .select-box
    padding: 8px
    span
      font-size: 14px
</style>
