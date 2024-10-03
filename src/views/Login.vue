<template>
  <div class="login-app">
    <div class="login">
      <div class="login-card">
        <h1 class="headline">Войдите в систему</h1>
        <form @submit.prevent="login">
          <input v-model="username" type="text" placeholder="Введите логин" class="custom-input"/>
          <input v-model="password" type="password" placeholder="Введите пароль" class="custom-input"/>
          <v-btn :loading="loading" type="submit" color="primary" block large>Войти</v-btn>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  data() {
    return {
      username: '',
      password: '',
      loading: false
    }
  },
  methods: {
    ...mapMutations(['authenticate']),
    login() {
      this.loading = true

      // Имитация запроса на бекенд
      setTimeout(() => {
        this.authenticate()
        this.loading = false
        this.$router.push('/organizer')
      }, 2000) // Задержка 2 секунды
    }
  }
}
</script>

<style lang="sass" scoped>
.login-app
  background: $bg-color  // замените на ваш $bg-color
  display: flex
  justify-content: center
  align-items: center
  padding: 0
  margin: 0
  width: 100%

.login
  height: 100vh
  display: flex
  justify-content: center
  align-items: center
  padding: 0
  margin: 0
  width: 100%

.login-card
  padding: 20px
  box-shadow: none
  border-radius: 12px
  background: transparent

.headline
  margin-bottom: 20px
  text-align: center
  font-size: 30px
  font-weight: 600

.custom-input
  width: 100%
  padding: 14px
  margin: 10px 0
  border: 1px solid $active-color // замените на ваш $active-color
  border-radius: 25px
  box-sizing: border-box
  outline: none
</style>