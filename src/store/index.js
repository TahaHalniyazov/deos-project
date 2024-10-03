  import { createStore } from 'vuex';

  export default createStore({
    state: {
      isAuthenticated: false,
      trainers: [],
      deletedTrainers: [], // Добавляем массив для удалённых тренеров
      judges: [], // Добавляем массив для судей
      deletedJudges: [], // Добавляем массив для удалённых судей
      hosts: [], // Добавляем массив для ведущих
      deletedHosts: [], // Добавляем массив для удалённых ведущих
      teams: [],
      deletedTeams: [],
      participants: [], // Массив для участников
      deletedParticipants: [] // Массив для удалённых участников 
    },
    mutations: {
      authenticate(state) {
        state.isAuthenticated = true;
      },
      ADD_TRAINER(state, trainer) {
        state.trainers.push(trainer);
      },
      DELETE_TRAINER(state, trainer) {
        state.trainers = state.trainers.filter(t => t !== trainer);
        state.deletedTrainers.push(trainer);
      },
      RESTORE_TRAINER(state, trainer) {
        state.deletedTrainers = state.deletedTrainers.filter(t => t !== trainer);
        state.trainers.push(trainer);
      },
      ADD_JUDGE(state, judge) {
        state.judges.push(judge);
      },
      DELETE_JUDGE(state, judge) {
        state.judges = state.judges.filter(j => j !== judge);
        state.deletedJudges.push(judge);
      },
      RESTORE_JUDGE(state, judge) {
        state.deletedJudges = state.deletedJudges.filter(j => j !== judge);
        state.judges.push(judge);
      },  
      ADD_HOST(state, host) {
        state.hosts.push(host);
      },
      DELETE_HOST(state, host) {
        state.hosts = state.hosts.filter(h => h !== host);
        state.deletedHosts.push(host);
      },
      RESTORE_HOST(state, host) {
        state.deletedHosts = state.deletedHosts.filter(h => h !== host);
        state.hosts.push(host);
      },
      ADD_TEAM(state, team) {
        state.teams.push(team);
      },
      DELETE_TEAM(state, team) {
        state.teams = state.teams.filter(t => t !== team);
        state.deletedTeams.push(team);
      },
      RESTORE_TEAM(state, team) {
        state.deletedTeams = state.deletedTeams.filter(t => t !== team);
        state.teams.push(team);
      },
      ADD_PARTICIPANT(state, participant) { // Мутация для добавления участника
        state.participants.push(participant);
      },
      DELETE_PARTICIPANT(state, participant) { // Мутация для удаления участника
        state.participants = state.participants.filter(p => p !== participant);
        state.deletedParticipants.push(participant);
      },
      RESTORE_PARTICIPANT(state, participant) { // Мутация для восстановления участника
        state.deletedParticipants = state.deletedParticipants.filter(p => p !== participant);
        state.participants.push(participant);
      },


      UPDATE_PARTICIPANT(state, updatedParticipant) {
        const index = state.participants.findIndex(p => p.id === updatedParticipant.id);
        if (index !== -1) {
          state.participants.splice(index, 1, updatedParticipant);
        }
      },
      logout(state) {
        state.isAuthenticated = false;
      }
    },
    actions: {
      addTrainer({ commit }, trainer) {
        commit('ADD_TRAINER', trainer);
      },
      deleteTrainer({ commit }, trainer) {
        commit('DELETE_TRAINER', trainer);
      },
      restoreTrainer({ commit }, trainer) {
        commit('RESTORE_TRAINER', trainer);
      },
      addJudge({ commit }, judge) {
        commit('ADD_JUDGE', judge);
      },
      deleteJudge({ commit }, judge) {
        commit('DELETE_JUDGE', judge);
      },
      restoreJudge({ commit }, judge) {
        commit('RESTORE_JUDGE', judge);
      },
      addHost({ commit }, host) {
        commit('ADD_HOST', host);
      },
      deleteHost({ commit }, host) {
        commit('DELETE_HOST', host);
      },
      restoreHost({ commit }, host) {
        commit('RESTORE_HOST', host);
      },
      addTeam({ commit }, team) {
        commit('ADD_TEAM', team);
      },
      deleteTeam({ commit }, team) {
        commit('DELETE_TEAM', team);
      },
      restoreTeam({ commit }, team) {
        commit('RESTORE_TEAM', team);
      },
      addParticipant({ commit }, participant) { // Экшен для добавления участника
        commit('ADD_PARTICIPANT', participant);
      },
      deleteParticipant({ commit }, participant) { // Экшен для удаления участника
        commit('DELETE_PARTICIPANT', participant);
      },
      restoreParticipant({ commit }, participant) { // Экшен для восстановления участника
        commit('RESTORE_PARTICIPANT', participant);
      },

      updateParticipant({ commit }, updatedParticipant) {
        commit('UPDATE_PARTICIPANT', updatedParticipant);
      }
    },
    getters: {
      trainers: state => state.trainers,
      deletedTrainers: state => state.deletedTrainers, // Геттер для удалённых тренеров
      judges: state => state.judges, // Геттер для судей
      deletedJudges: state => state.deletedJudges, // Геттер для удалённых судей
      hosts: state => state.hosts, // Геттер для ведущих
      deletedHosts: state => state.deletedHosts,
      teams: state => state.teams,
      deletedTeams: state => state.deletedTeams,
      participants: state => state.participants, // Геттер для участников
      deletedParticipants: state => state.deletedParticipants // Геттер для удалённых участников

    },
    modules: {}
  });
