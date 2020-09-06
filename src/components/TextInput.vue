<template>
  <v-text-field
    solo
    v-model="input"
    :label="lable"
    :clearable="clearable"
    :prepend-inner-icon="icon"
    @input="inputType"
    :type="type"
    :error-messages="error"
  />
</template>

<script>
export default {
  props: {
    lable: {
      type: String,
      default: ""
    },
    clearable: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: ""
    },
    error: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "text"
    }
  },
  data() {
    return {
      input: ""
    };
  },
  methods: {
    inputType() {
      this.$emit("change", this.input);
    }
  }
};
</script>

<style></style>
