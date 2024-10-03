<template>
  <div class="bg">
    <div v-if="!showCreateParticipantModal && !showEditParticipantModal" class="toolbar">
      <button class="create-participant-btn" @click="openCreateParticipantModal">
        Создать участника <span>+</span>
      </button>
      <div class="search-container">
        <input type="text" placeholder="Найти" v-model="searchQuery" />
        <img :src="require('@/assets/image/Search.svg')" alt="Search Icon" />
      </div>
    </div>

    <ul v-if="!showCreateParticipantModal && !showEditParticipantModal">
      <li v-for="participant in filteredParticipants" :key="participant.id" class="participant-item">
        <span class="participant-name">{{ participant.name }}</span>
        <div>
          <span class="edit-participant" @click="editParticipant(participant)"><img :src="require('@/assets/image/Edit.svg')" alt=""></span>
          <span class="delete-participant" @click="handleDeleteParticipant(participant)"><img :src="require('@/assets/image/Delete.svg')" alt=""></span>
        </div>
      </li>
    </ul>

    <create-participant v-if="showCreateParticipantModal" @participant-created="handleAddParticipant" @close="closeCreateParticipantModal" />
    <edit-participant v-if="showEditParticipantModal" :participantData="participantToEdit" @save-participant="handleUpdateParticipant" @close="closeEditParticipantModal" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import CreateParticipant from './CreateParticipant.vue';
import EditParticipant from './EditParticipant.vue';

export default {
  components: { CreateParticipant, EditParticipant },
  data() {
    return {
      searchQuery: '',
      showCreateParticipantModal: false,
      showEditParticipantModal: false,
      participantToEdit: null
    };
  },
  computed: {
    ...mapGetters(['participants']),
    filteredParticipants() {
      return this.participants.filter(participant => 
        participant.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  methods: {
    ...mapActions(['addParticipant', 'deleteParticipant', 'updateParticipant']),
    openCreateParticipantModal() {
      this.showCreateParticipantModal = true;
    },
    closeCreateParticipantModal() {
      this.showCreateParticipantModal = false;
    },
    handleAddParticipant(newParticipant) {
      this.addParticipant(newParticipant); // Добавляем участника через Vuex
      this.closeCreateParticipantModal();
    },
    handleDeleteParticipant(participant) {
      this.deleteParticipant(participant); // Удаляем участника через Vuex
    },
    editParticipant(participant) {
      this.participantToEdit = { ...participant }; // Копируем данные участника для редактирования
      this.showEditParticipantModal = true;
    },
    closeEditParticipantModal() {
      this.showEditParticipantModal = false;
      this.participantToEdit = null;
    },
    handleUpdateParticipant(updatedParticipant) {
      this.updateParticipant(updatedParticipant); // Обновляем участника через Vuex
      this.closeEditParticipantModal();
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

.create-participant-btn
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

.participant-item
  padding: 15px
  border-radius: 8px
  margin-bottom: 10px
  border: 1px solid $active-color
  display: flex
  align-items: center
  justify-content: space-between

.participant-name
  font-weight: bold
  font-size: 16px
  color: #333

.edit-participant, .delete-participant
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
    padding: 10px 
    background: $bg-color
  .bg
    background: $bg-color
  .create-participant-btn
    width: 100%
    text-align: center
    display: block
    margin-top: 20px
  .search-container
    width: 100%
  .participant-item    
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

  .create-participant-btn
    margin-bottom: 30px
</style>
