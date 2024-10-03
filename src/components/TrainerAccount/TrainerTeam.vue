<template>
  <div class="bg">
    <div v-if="!showCreateTeamModal && !showEditTeamModal" class="toolbar">
      <button class="create-team-btn" @click="openCreateTeamModal">
        Создать команду <span>+</span>
      </button>
      <div class="search-container">
        <input type="text" placeholder="Найти" v-model="searchQuery" />
        <img :src="require('@/assets/image/Search.svg')" alt="Search Icon" />
      </div>
    </div>

    <ul v-if="!showCreateTeamModal && !showEditTeamModal">
      <li v-for="team in filteredTeams" :key="team.name" class="team-item">
        <span class="team-name">{{ team.name }}</span>
        <div>
          <span class="edit-team" @click="editTeam(team)"><img :src="require('@/assets/image/Edit.svg')" alt=""></span>
          <span class="delete-team" @click="deleteTeam(team)"><img :src="require('@/assets/image/Delete.svg')" alt=""></span>
        </div>
      </li>
    </ul>

    <create-team v-if="showCreateTeamModal" @team-created="addTeam" @close="closeCreateTeamModal" />
    <edit-team v-if="showEditTeamModal" :teamData="teamToEdit" @save-team="updateTeam" @close="closeEditTeamModal" />
  </div>
</template>

<script>
import CreateTeam from './CreateTeam.vue';
import EditTeam from './EditTeam.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  components: { CreateTeam, EditTeam },
  data() {
    return {
      searchQuery: '',
      showCreateTeamModal: false,
      showEditTeamModal: false,
      teamToEdit: null
    };
  },
  computed: {
    ...mapGetters(['teams']),
    filteredTeams() {
      return this.teams.filter(team => 
        team.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  methods: {
    ...mapActions(['addTeam', 'deleteTeam']),
    openCreateTeamModal() {
      this.showCreateTeamModal = true;
    },
    closeCreateTeamModal() {
      this.showCreateTeamModal = false;
    },
    editTeam(team) {
      this.teamToEdit = { ...team }; // Копируем данные команды для редактирования
      this.showEditTeamModal = true;
    },
    closeEditTeamModal() {
      this.showEditTeamModal = false;
      this.teamToEdit = null;
    },
    updateTeam(updatedTeam) {
      const index = this.teams.findIndex(t => t.id === updatedTeam.id); // Поиск по уникальному идентификатору
      if (index !== -1) {
        this.teams.splice(index, 1, updatedTeam); // Обновляем команду в массиве
      }
      this.closeEditTeamModal();
    }
}
};
</script>
  
  <style scoped lang="sass">
  .toolbar
    display: flex
    align-items: center
    justify-content: space-between
    padding: 30px 40px
  
  .create-team-btn
    background-color: #4a90e2
    color: white
    padding: 10px 40px
    border: none
    border-radius: 25px
    font-size: 16px
    display: flex
    align-items: center
    cursor: pointer
  
    span
      margin-left: 5px
  
  .search-container
    display: flex
    align-items: center
    border: 1px solid #4a90e2
    border-radius: 25px
    padding: 5px 10px
    width: 40%
  
    input
      border: none
      outline: none
      font-size: 16px
      flex-grow: 1
      padding: 6px
      margin: 0
  
    img
      margin-left: 5px
      width: 16px
      height: 16px
  
  ul
    padding: 20px
  
  .team-item
    
    padding: 15px
    border-radius: 8px
    margin-bottom: 10px
    border: 1px solid $active-color
    display: flex
    align-items: center
    justify-content: space-between
  
  .team-name
    font-weight: bold
    font-size: 16px
    color: #333
  
  .team-city, .team-trainer, .team-style
    font-size: 14px
    color: #666
    margin-right: 20px
  
  .edit-team, .delete-team
    cursor: pointer
    margin-left: 10px
    font-size: 14px
    color: #4a90e2
    transition: color 0.3s ease
  
  .edit-team:hover, .delete-team:hover
    color: #357ab8


@media (max-width: 480px)

  .toolbar
    flex-direction: column-reverse
    padding: 0 
    background: $bg-color
    margin-bottom: 30px
  .bg
    background: $bg-color
  .create-team-btn
    width: 100%
    text-align: center
    display: block
    margin-top: 20px
  .search-container
    width: 100%
  .team-item    
    margin-bottom: 0
    border-radius: 20px
    
    
    
    

  ul
    padding: 0
    background: $bg-color
    li
      margin-top: 10px

@media (max-width: 360px)
  .toolbar
    padding: 6px

  .create-team-btn
    margin-bottom: 30px
      
  </style>
  