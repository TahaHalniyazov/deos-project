<template>
    <div class="deleted-hosts">
      <div v-for="host in deletedHosts" :key="host.name" class="host-restore-card">
        <input type="text" v-model="host.name" disabled class="host-input" placeholder="ФИО" />
        <button @click="restoreHost(host)" class="restore-btn">Восстановить</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'HostDelete',
    computed: {
      deletedHosts() {
        return this.$store.getters.deletedHosts;
      }
    },
    methods: {
      restoreHost(host) {
        this.$store.dispatch('restoreHost', host);
      }
    }
  };
  </script>
  
  <style scoped lang="sass">
  .deleted-hosts
    max-width: 100%
    margin: 20px 0 10px 0
    padding: 20px
    max-height: 780px // Устанавливаем максимальную высоту для блока
    overflow-y: auto 
    transition: 0.5s all
    &::-webkit-scrollbar 
      width: 10px
      background-color: $second-active-color
  
    &::-webkit-scrollbar-thumb 
      background-color: #00044B
      border-radius: 10px
      width: 10px
      background-clip: padding-box
    
    &::-webkit-scrollbar-thumb:hover 
      background-color: $active-color
    
    &::-webkit-scrollbar-track 
      background-color: #ccc
    
    &::-webkit-scrollbar-thumb:hover 
      background-color: #00044B
  
  .host-restore-card
    display: flex
    justify-content: space-between
    align-items: center
    padding: 15px
    background-color: white
    border-radius: 25px
    border: 1px solid #007bff
    margin-bottom: 10px
  
  .host-input
    flex: 1
    margin-right: 10px
    padding: 12px
    border: none
    border-radius: 25px
    background-color: #f0f0ff
  
  .restore-btn
    padding: 10px 20px
    background-color: #007bff
    color: white
    border: none
    border-radius: 25px
    cursor: pointer
    transition: background-color 0.3s ease
  
  .restore-btn:hover
    background-color: darken(#007bff, 10%)

@media (max-width: 480px)
  .deleted-hosts
    background: $bg-color
    margin: 0
    padding: 0
  .host-restore-card
    padding: 10px
    display: block
    background: $bg-color
  .host-input
    margin-bottom: 0
    background: #fff
  .restore-btn
    width: 100%
    margin-top: 10px
  </style>
  