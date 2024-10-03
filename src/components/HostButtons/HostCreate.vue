<template>
    <div class="host-form">
      <div class="title">
        <h2>Создание нового ведущего</h2>
        <div class="form-actions">
          <button @click="saveHost" class="save-btn">Сохранить</button>
          <button @click="clearForm" class="cancel-btn">Отменить</button>
        </div>
      </div>
      <form>
        <div class="form-group">
          <input type="text" v-model="hostName" class="large-input" placeholder="Введите ФИО ведущего..." />
        </div>
        <div class="form-group form-group-inline">
          <div class="flex-inputs">
            <input type="text" v-model="hostLogin" placeholder="Придумайте логин..." class="small-input" />
            <input type="password" v-model="hostPassword" placeholder="Придумайте пароль..." class="small-input" />
          </div>
        </div>
      </form>
    </div>
</template>

<script>
export default {
  name: 'HostCreate',
  data() {
    return {
      hostName: '',
      hostLogin: '',
      hostPassword: ''
    };
  },
  methods: {
    saveHost() {
      if (this.hostName) {
        this.$store.dispatch('addHost', {
          name: this.hostName,
          login: this.hostLogin,
          password: this.hostPassword
        });
        this.clearForm();
      } else {
        alert('Пожалуйста, введите ФИО ведущего.');
      }
    },
    clearForm() {
      this.hostName = '';
      this.hostLogin = '';
      this.hostPassword = '';
    }
  }
};
</script>

<style lang="sass" scoped>
.host-form 
  max-width: 100%
  margin: 50px auto
  padding: 20px

h2 
  font-size: 20px
  font-weight: 600

.form-group 
  margin-bottom: 15px

.form-group-inline
  display: flex
  flex-direction: column

.flex-inputs
  display: flex
  justify-content: space-between
  gap: 10px  // Зазор между инпутами

input[type="text"], input[type="password"] 
  width: 100%
  padding: 12px
  border: 1px solid $active-color
  border-radius: 25px
  font-size: 14px
  color: #000
  outline: none

input::placeholder 
  color: #9CA3AF

.small-input
  width: 48%  // Поля в одной строке, каждое занимает 48% ширины

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

.title
  display: flex
  justify-content: space-between
  align-items: center
  margin-bottom: 60px


@media (max-width: 480px)
  .host-form
    margin: 10px auto
    .title
      flex-direction: column
      margin-bottom: 30px
      h2
        margin-bottom: 20px

    .flex-inputs
      flex-direction: column

    .form-group-inline
      display: block

@media (max-width: 360px)
  h2
    font-size: 16px
</style>
