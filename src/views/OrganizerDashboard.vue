<template>
  <OrganizerLayout>
    <template v-slot:sidebar>
      <Sidebar 
        :role="'organizer'" 
        @selectComponent="currentComponent = $event" 
        @notify="addNotifications" 
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
  </OrganizerLayout>
</template>

<script>
import OrganizerLayout from '@/layouts/OrganizerLayout.vue';
import Sidebar from '@/views/Sidebar.vue';
import NotificationPanel from '@/views/NotificationPanel.vue';
import Create from '@/components/Create.vue';
import Active from '@/components/Active.vue';
import Cancelled from '@/components/Cancelled.vue';
import Archived from '@/components/Archived.vue';
import NominationCreate from '@/components/NominationButtons/NominationCreate.vue';
import NominationApplication from '@/components/NominationButtons/NominationApplication.vue';
import NominationActive from '@/components/NominationButtons/NominationActive.vue';
import NominationArchived from '@/components/NominationButtons/NominationArchived.vue';
import TrainerCreate from '@/components/TrainerButtons/TrainerCreate.vue';
import TrainerActive from '@/components/TrainerButtons/TrainerActive.vue';
import TrainerDelete from '@/components/TrainerButtons/TrainerDelete.vue';
import JudgeCreate from '@/components/JudgeButtons/JudgeCreate.vue';
import JudgeActive from '@/components/JudgeButtons/JudgeActive.vue';
import JudgeDelete from '@/components/JudgeButtons/JudgeDelete.vue';
import HostCreate from '@/components/HostButtons/HostCreate.vue';
import HostActive from '@/components/HostButtons/HostActive.vue';
import HostDelete from '@/components/HostButtons/HostDelete.vue';

export default {
  components: {
    OrganizerLayout,
    Sidebar,
    NotificationPanel,
    Create,
    Active,
    Cancelled,
    Archived,
    NominationCreate,
    NominationApplication,
    NominationActive,
    NominationArchived,
    TrainerCreate,
    TrainerActive,
    TrainerDelete,
    JudgeCreate,
    JudgeActive,
    JudgeDelete,
    HostCreate,
    HostActive,
    HostDelete
  },
  data() {
    return {
      currentComponent: null,
      notifications: [],
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