<template>
  <JudgeLayout>
    <template v-slot:sidebar>
      <Sidebar 
        :role="'judge'" 
        @selectComponent="currentComponent = $event" 
      />
    </template>
    <template v-slot:content>
      <div class="main-content">
        <component :is="currentComponent" />
        <h2 v-if="!currentComponent">Выберите пункт меню </h2>
      </div>
    </template>
    <template v-slot:notifications>
      <NotificationPanel :notifications="notifications" />
    </template>
  </JudgeLayout>
</template>

<script>
import JudgeLayout from '@/layouts/JudgeLayout.vue';
import Sidebar from '@/views/Sidebar.vue';
import NotificationPanel from '@/views/NotificationPanel.vue';
import JudgeEventInvitations from '@/components/JudgeAccount/JudgeEventInvitations.vue';
import JudgeEventActive from '@/components/JudgeAccount/JudgeEventActive.vue';
import JudgeEventArchived from '@/components/JudgeAccount/JudgeEventArchived.vue';


export default {
  components: {
    JudgeLayout,
    Sidebar,
    NotificationPanel,
    JudgeEventInvitations,
    JudgeEventActive,
    JudgeEventArchived

  },
  data() {
    return {
      currentComponent: null,
      notifications: [], // Данные для панели уведомлений
    };
  },
  methods: {
    addNotifications(messages) {
      this.notifications = messages.map((msg, index) => ({
        id: index + 1,
        message: msg,
      }));
    },
  },
};
</script>

<style lang="sass" scoped>
  h2
    margin-top: 300px
    text-align: center
    color: #ccc
    font-weight: 400
    font-size: 32px

@media (max-width: 480px)
  h2
    margin-top: 300px
    margin-bottom: 300px
    font-size: 28px
</style>