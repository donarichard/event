import { getEvents, getEventsById, bookEvents } from "../../services/event";

export default {
  namespaced: true,
  state: {
    events: []
  },
  getters: {
    events: state => state.events
  },
  mutations: {
    setEvents: (state, event) => {
      state.events = event;
    }
  },
  actions: {
    async getEvent({ commit }) {
      await getEvents().then(response => {
        commit("setEvents", response.event);
      });
    },
    async getEventById({ commit }, id) {
      await getEventsById(id).then(response => {
        commit("setEvents", response.event);
      });
    },
    async bookEvent({ commit }, bookdata) {
      const id = bookdata.id;
      delete bookdata.id;
      await bookEvents(id, bookdata).then(response => {
        commit("setEvents", response.event);
      });
    }
  }
};
