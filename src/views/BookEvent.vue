<template>
  <div class=" container">
    <div class="container d-flex align-items-center">
      <div class="row">
        <div class="col-12">
          <div class=" text-center center align-center align-self-center">
            <h3>{{ events[0].name }}</h3>
          </div>
        </div>
        <div class="col">
          <div class=" text-center center align-center align-self-center">
            Number of available : {{ events[0].available }}
          </div>
        </div>
      </div>
    </div>
    <v-card class="mx-auto" outlined>
      <v-list-item>
        <v-list-item-content class="p-2">
          <v-list-item-avatar tile size="300" color="grey">
            <v-img :src="events[0].imageUrl" />
          </v-list-item-avatar>
          <div class="p-2">
            <TextInput :error="isValidName" @change="getName" lable="name" />
            <TextInput :error="isValidEmail" @change="getEmail" lable="Email" />
            <TextInput
              :error="isValidNumber"
              @change="getMobile"
              type="number"
              lable="Phone"
            />
            <v-combobox
              v-model="select"
              :items="seat"
              @change="selectSeat"
              label="Number of seat"
            ></v-combobox>
            <TextInput
              :error="isValidAttend"
              @change="getAttend"
              :lable="inputlable"
            />
          </div>
        </v-list-item-content>
      </v-list-item>

      <v-card-actions>
        <v-spacer></v-spacer>
        <Button @buttonClicked="back()" color="default" lable="back" />
        <Button @buttonClicked="bookNow()" lable="Book Now" />
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Button from "@/components/Button";
import TextInput from "@/components/TextInput";
export default {
  name: "BookEvent",
  components: {
    Button,
    TextInput
  },
  data() {
    return {
      select: 1,
      inputlable: "Number of Attendee 1",
      name: null,
      email: null,
      attend: null,
      mobile: null,
      isValidName: "",
      isValidAttend: "",
      isValidEmail: "",
      isValidNumber: "",
      reg: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    };
  },
  created() {
    this.getEventsById();
  },
  methods: {
    ...mapActions("event", ["getEventById", "bookEvent"]),
    async getEventsById() {
      await this.getEventById(this.$route.params.id);
    },
    back() {
      this.$router.push("/");
    },
    selectSeat() {
      this.inputlable = "Number of Attendee " + this.select;
    },
    async bookNow() {
      if (
        !this.isValidName &&
        !this.isValidEmail &&
        !this.isValidNumber &&
        !this.isValidAttend
      ) {
        if (
          this.name &&
          this.email &&
          this.mobile &&
          this.select &&
          this.attend
        ) {
          const bookData = {
            name: this.name,
            email: this.email,
            seat: this.select,
            mobile: this.mobile,
            attendee: [this.attend],
            id: this.$route.params.id
          };
          await this.bookEvent(bookData).then(() => {
            this.$toast.success("Booked Successfully");
            this.$router.push("/");
          });
        } else {
          this.$toast.error("Please enter valid input");
        }
      } else {
        this.$toast.error("Please enter valid input");
      }
    },
    getName(value) {
      if (value.length < 4) {
        this.isValidName = "InValid Name";
      } else {
        this.name = value;
        this.isValidName = "";
      }
    },
    getAttend(value) {
      if (value.length < 4) {
        this.isValidAttend = "InValid Attend Name";
      } else {
        this.attend = value;
        this.isValidAttend = "";
      }
    },
    getEmail(value) {
      if (!this.reg.test(value)) {
        this.isValidEmail = "InValid Email";
      } else {
        this.email = value;
        this.isValidEmail = "";
      }
    },
    getMobile(value) {
      if (!value.match(/^(\+\d{1,3}[- ]?)?\d{10}$/) && !value.match(/0{5,}/)) {
        this.isValidNumber = "InValid Mobile Number";
      } else {
        this.mobile = value;
        this.isValidNumber = "";
      }
    }
  },
  computed: {
    ...mapGetters("event", ["events"]),
    seat() {
      return Array.from({ length: this.events[0].available }, (_, i) => i + 1);
    }
  },
  beforeMount() {
    if (this.$route.params.id) {
      this.$route.params.id;
    }
  }
};
</script>

<style></style>
