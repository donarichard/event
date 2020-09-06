<template>
  <v-card class="mx-auto h-auto" max-width="344" outlined>
    <v-list-item>
      <v-list-item-avatar tile size="80" color="grey">
        <v-img height="100%" :src="event.imageUrl" />
      </v-list-item-avatar>
      <v-list-item-content>
        <div class=" mb-4">{{ event.name }}</div>
        <v-list-item-subtitle>{{
          new Date(event.date).toLocaleDateString()
        }}</v-list-item-subtitle>
        <v-list-item-subtitle
          >Seats Available {{ event.available }}</v-list-item-subtitle
        >
      </v-list-item-content>
    </v-list-item>

    <v-card-actions>
      <v-spacer></v-spacer>
      <Button
        @buttonClicked="click(event)"
        :color="buttonColor"
        :lable="buttonLable"
      />
    </v-card-actions>
  </v-card>
</template>

<script>
import Button from "@/components/Button";
export default {
  name: "EventCard",
  components: {
    Button
  },
  props: {
    event: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    buttonLable() {
      return this.event.inStock ? "Book Now" : "Sold Out";
    },
    buttonColor() {
      return this.event.inStock ? "primary" : "error";
    }
  },
  methods: {
    click(event) {
      this.$emit("buttonClicked", event);
    }
  }
};
</script>

<style></style>
