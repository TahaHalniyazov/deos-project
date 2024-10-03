<!-- <template>
  <div class="dashboard">
    <Sidebar :role="userRole" @selectComponent="currentComponent = $event" />
    <div class="main-content">
      <h1>{{ userRoleTitle }}</h1>      
    </div>
    <div class="content-box">
        <component :is="currentComponent" @notify="addNotification" />
    </div>
    <div>
    <NotificationPanel :notifications="notifications" />
    </div>
  </div>
</template>

<script>
import Sidebar from '@/views/Sidebar.vue';
import NotificationPanel from '@/views/NotificationPanel.vue';
import Create from '@/components/Create.vue';
import Active from '@/components/Active.vue';
import Cancelled from '@/components/Cancelled.vue';
import Archived from '@/components/Archived.vue';
import Nominations from '@/views/Nominations.vue';
import Trainers from '@/views/Trainers.vue';
import Judges from '@/views/Judges.vue';
import Hosts from '@/views/Hosts.vue';
import Teams from '@/components/Teams.vue';

export default {
  components: {
    Sidebar,
    NotificationPanel,
    Create,
    Active,
    Cancelled,
    Archived,
    Nominations,
    Trainers,
    Judges,
    Hosts,
    Teams,
  },
  data() {
    return {
      currentComponent: null,
      userRole: 'organizer', // измените роль в зависимости от пользователя
      notifications: [],
    };
  },
  computed: {
    userRoleTitle() {
      switch (this.userRole) {
        case 'organizer':
          return 'Организатор мероприятий';
        case 'trainer':
          return 'Тренер';
        case 'judge':
          return 'Судья';
        case 'host':
          return 'Ведущий';
        default:
          return 'Пользователь';
      }
    },
  },
  methods: {
    handleComponentSelection(componentName) {
      this.currentComponent = componentName;
      console.log(`Loading component: ${componentName}`);
    },
    addNotification(message) {
  const newNotification = {
    id: Date.now(),
    message,
  };
  this.notifications.push(newNotification);
  console.log('Notification added:', newNotification);
}

  },
};
</script>

<style lang="sass" >
  background: red
</style> -->