<template>
  <v-container class="login">
    <v-row align="center" justify="center">
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title class="headline">Войдите в систему</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="login">
              <v-text-field v-model="username" label="Введите логин"></v-text-field>
              <v-text-field v-model="password" label="Введите пароль" type="password"></v-text-field>
              <v-btn type="submit" color="primary" block>Войти</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    login() {
      // Логика авторизации
      this.$router.push('/dashboard');
    }
  }
};
</script>

<style scoped>
.login {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>