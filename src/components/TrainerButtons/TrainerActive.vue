<template>
  <div class="trainer-list-main">
    <div class="trainer-list-container" v-if="!selectedTrainer">
      <div class="search-filter">
        <div class="search-container">
          <input type="text" placeholder="Найти" v-model="searchQuery" />
          <img :src="require('@/assets/image/Search.svg')" alt="" />
        </div>
        <div class="filter-options">
          <button>Фильтр</button>       
          <img :src="require('@/assets/image/Swap.svg')" alt="" />
        </div>
      </div>
      <div class="trainer-list">
        <div class="trainer-card" v-for="trainer in filteredTrainers" :key="trainer.name" @click="selectTrainer(trainer)">
          <h3>{{ trainer.name }}</h3>
          <p>Логин: {{ trainer.login }}</p>
        </div>
      </div>      
    </div>
    <TrainerActiveEventDetail 
      v-if="selectedTrainer" 
      :trainer="selectedTrainer" 
      @trainer-deleted="onTrainerDeleted" 
    />
    
  </div>
</template>

<script>
import TrainerActiveEventDetail from './TrainerActiveEventDetail.vue';
import TrainerDelete from './TrainerDelete.vue';

export default {
  name: 'TrainerActive',
  components: {
    TrainerActiveEventDetail,
    TrainerDelete
  },
  data() {
    return {
      searchQuery: '',
      selectedTrainer: null
    };
  },
  computed: {
    trainers() {
      return this.$store.getters.trainers;
    },
    filteredTrainers() {
      return this.trainers.filter(trainer =>
        trainer.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  methods: {
    selectTrainer(trainer) {
      this.selectedTrainer = trainer;
    },
    onTrainerDeleted() {
      this.selectedTrainer = null; // Сбрасываем выбранного тренера после удаления
    }
  }
};
</script>

<style scoped lang="sass">
.trainer-list-main 
  display: flex
  flex-direction: column
  transition: 0.5s all

.trainer-list-container
  padding: 20px
  background: $second-active-color
  max-width: 380px
  border-radius: 20px
  margin-left: -30px
  height: 83vh
  overflow: hidden

.search-filter
  display: flex
  justify-content: space-between
  flex-direction: column

  input
    margin-bottom: 0
    padding: 0   
    
  .filter-options
    display: flex
    justify-content: space-between
    background: white
    border: 1px solid white
    border-radius: 20px
    width: 100%
    margin: 10px 0
    img
      margin-right: 8px
    
    button
      padding: 10px 15px

.trainer-list
  overflow-y: auto
  max-height: 67vh
  padding-right: 10px
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

  .trainer-card
    background-color: white
    padding: 15px
    border-radius: 15px
    margin-bottom: 10px
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1)

.search-container
  display: flex
  padding: 10px
  border: 1px solid white
  border-radius: 30px
  align-items: center

@media (max-width:1200px)
  .trainer-list-container
    height: 84vh 
@media (max-width:480px)


  .trainer-list-container
    margin-left: 0
    background: $bg-color
    border-radius: 0
    padding: 0
    max-width: 100%
    .search-container
      display: none
  .trainer-list
    padding-right: 0
</style>
