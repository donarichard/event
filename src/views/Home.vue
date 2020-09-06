<template>
  <div>
    <div class=" container d-flex align-items-center p-3">
      <TextInput
        @change="search"
        lable="Search"
        :clearable="true"
        icon="mdi-search-web"
      />
    </div>
    <div class="container">
      <div class="row">
        <div v-if="resultQuery.length === 0" class="col">
          <div class=" text-center"></div>
          No result found
        </div>
        <div v-else class="col" v-for="item in resultQuery" :key="item._id">
          <EventCard @buttonClicked="booknow" :event="item" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TextInput from "@/components/TextInput";
import EventCard from "@/components/EventCard";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Home",
  components: {
    TextInput,
    EventCard
  },
  data() {
    return {
      searchQuery: null
    };
  },
  methods: {
    ...mapActions("event", ["getEvent"]),
    search(value) {
      this.searchQuery = value;
    },
    click() {
      console.log("click");
    },
    async getEventList() {
      await this.getEvent();
    },
    booknow(event) {
      if (!event.inStock) {
        return this.$toast.error("Event Sold out");
      }
      this.$router.push({ name: "booking", params: { id: event._id } });
    }
  },
  created() {
    this.getEventList();
  },
  computed: {
    ...mapGetters("event", ["events"]),
    resultQuery() {
      if (this.searchQuery) {
        return this.events.filter(item => {
          return this.searchQuery
            .toLowerCase()
            .split(" ")
            .every(v => item.name.toLowerCase().includes(v));
        });
      } else {
        return this.events;
      }
    }
  }
};
</script>
