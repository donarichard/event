import Vue from "vue";
import Vuex from "vuex";
import event from "./modules/event";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    event
  },
  plugins: [createPersistedState()]
});

export default store;
