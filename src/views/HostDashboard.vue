<template>
  <HostLayout>
    <template v-slot:sidebar>
      <Sidebar 
        :role="'host'" 
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
  </HostLayout>
</template>

<script>
import HostLayout from '@/layouts/HostLayout.vue';
import Sidebar from '@/views/Sidebar.vue';
import NotificationPanel from '@/views/NotificationPanel.vue';
import HostEventInvitations from '@/components/HostAccount/HostEventInvitations.vue';
import HostEventActive from '@/components/HostAccount/HostEventActive.vue';
import HostEventArchived from '@/components/HostAccount/HostEventArchived.vue';


export default {
  components: {
    HostLayout,
    Sidebar,
    NotificationPanel,
    HostEventInvitations,
    HostEventActive,
    HostEventArchived,

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