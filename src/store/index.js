import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    levels: [],
    playerRank: 1,
    playerScore: 1,
    playerName: "",
    playerGender: ''
  },
  mutations: {
    SET_LEVELS: function (state, levels) {
      state.levels = levels;
    },
    SET_PLAYER_SCORE: function(state, score) {
      state.playerScore = score;
    },
    INC_RANK: function (state) {
      state.playerRank++;
    },
    SET_PLAYER: function (state, player) {
      state.playerName = player.name;
      state.playerGender = player.gender;
    }
  },
  actions: {
    addPlayerScore: function ({state , commit}, scoreAmount) {
      commit('SET_PLAYER_SCORE', state.playerScore + scoreAmount);
    },
    increasePlayerLevel: function ({commit}) {
      commit('INC_RANK');
    },
    parseLevels: async function({commit}) {
      const JSONLevels = require('../assets/levels');
      commit('SET_LEVELS', JSONLevels);
    },
    setPlayer: function({commit}, payload) {
      commit('SET_PLAYER', payload)
    }
  },
  getters: {
    getSlidesForLevel: (state) => (realmId, levelId) => {
      const level = state.levels.find(level => +level.realm === +realmId && +level.level === +levelId);
      return level ? level.slides : [];
    },
    getTypeForLevel: (state) => (realmId, levelId) => {
      const level = state.levels.find(level => +level.realm === +realmId && +level.level === +levelId);
      return level && level.type || '';
    },
    getWordList: (state) => (realmId, levelId) => {
      const level = state.levels.find(level => +level.realm === +realmId && +level.level === +levelId);
      return level ? level.wordlist : [];
    },
    getName: state => state.playerName,
    getGender: state => state.playerGender,
    getLevels: state => state.levels,
    getRank: state => state.playerRank,
    getScore: state => state.playerScore
  }
})
