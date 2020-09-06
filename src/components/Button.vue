<template>
  <v-btn @click="buttonClick" :color="color">{{ lable }}</v-btn>
</template>

<script>
export default {
  props: {
    lable: {
      type: String,
      default: "Button"
    },
    color: {
      type: String,
      default: "primary"
    }
  },
  methods: {
    buttonClick() {
      this.$emit("buttonClicked");
    }
  }
};
</script>

<style></style>
