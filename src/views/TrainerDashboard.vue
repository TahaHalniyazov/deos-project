<template>
  <TrainerLayout>
    <template v-slot:sidebar>
      <Sidebar 
        :role="'trainer'" 
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
  </TrainerLayout>
</template>

<script>
import TrainerLayout from '@/layouts/TrainerLayout.vue';
import Sidebar from '@/views/Sidebar.vue';
import NotificationPanel from '@/views/NotificationPanel.vue';
import TrainerEventInvitations from '@/components/TrainerAccount/TrainerEventInvitations.vue';
import TrainerEventActive from '@/components/TrainerAccount/TrainerEventActive.vue';
import TrainerEventArchived from '@/components/TrainerAccount/TrainerEventArchived.vue';
import TrainerTeam from '@/components/TrainerAccount/TrainerTeam.vue';
import ParticipantList from '@/components/TrainerAccount/ParticipantList.vue';
import DeleteParticipant from '@/components/TrainerAccount/DeleteParticipant.vue';


export default {
  components: {
    TrainerLayout,
    Sidebar,
    NotificationPanel,
    TrainerEventInvitations,
    TrainerEventActive,
    TrainerEventArchived,
    TrainerTeam,
    ParticipantList,
    DeleteParticipant

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