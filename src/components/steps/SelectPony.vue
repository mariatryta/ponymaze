<template>
  <div class="md:w-6/12 w-4/5">
    <form @submit.prevent="submitValue" class="mb-2">
      <vInput
        ref="input"
        name="pony"
        label="Write a valid pony name"
        :value.sync="userPonyName"
        type="text"
        >Write a valid My Little Pony character</vInput
      >
      <vButton type="submit">Submit</vButton>
    </form>

    <p
      @click="showDefaultPonies = true"
      @keydown.enter="showDefaultPonies = true"
      @keydown.space="showDefaultPonies = true"
      tabindex="0"
      role="button"
      class="text-sm font-light text-gray-600 cursor-pointer focus:ring-2 focus:ring-pink-600 focus:outline-none"
    >
      Don't know any ponies ? Choose one here
    </p>

    <div
      v-if="error.active"
      class="my-4 p-4 text-red-700 border rounded border-red-900/10 bg-red-100"
      role="alert"
    >
      <strong class="text-sm font-medium">{{ error.message }}</strong>
    </div>

    <Modal
      v-show="showDefaultPonies"
      labeledBy="showcaseTitle"
      closeButton="Cancel"
      :isActive="showDefaultPonies"
      @close="showDefaultPonies = false"
    >
      <template slot="main">
        <PonyShowcase
          :defaultPonies="defaultPonies"
          class="mt-auto"
          selectButton="Confirm Selection"
          @select="
            (val) => {
              showDefaultPonies = false;
              userPonyName = val;
            }
          "
        ></PonyShowcase>
      </template>
    </Modal>
  </div>
</template>

<script>
import vButton from "../Button.vue";
import vInput from "../Input.vue";
import PonyShowcase from "../PonyShowcase.vue";
import Modal from "../Modal.vue";
import fetchData from "../../helpers/fetchData.js";

export default {
  name: "SelectPony",

  components: {
    vButton,
    vInput,
    Modal,
    PonyShowcase,
  },

  data() {
    return {
      showDefaultPonies: false,
      error: {
        active: false,
        message: "",
      },
      defaultPonies: [
        { name: "Rarity", key: "rarity" },
        { name: "Princess Luna", key: "princess-luna" },
        { name: "Fluttershy", key: "fluttershy" },
        { name: "Spike", key: "spike" },
        { name: "Twilight Sparkle", key: "twillight-sparkle" },
      ],
    };
  },
  computed: {
    userPonyName: {
      get: function () {
        return this.$store.getters["user/ponyName"];
      },

      set: function (value) {
        this.$store.commit("user/setPonyName", value);
      },
    },
  },
  methods: {
    submitValue() {
      this.error.active = false;

      if (!this.userPonyName || this.userPonyName === "") {
        return;
      }

      this.loading = true;

      fetchData(`http://ponyweb.ml/v1/character/${this.userPonyName}`)
        .then(({ data }) => {
          if (data.length > 0) {
            this.$store.commit("user/setPony", data[0]);
            this.$emit("nextState");
          } else {
            this.error = {
              message: "Couldn't find pony with this name",
              active: true,
            };
            throw new Error(this.error);
          }
        })
        .finally(() => {
          this.loading = true;
        });
    },
  },
  mounted() {
    const input = this.$refs.input.$el.querySelector("input");
    input.focus();
  },
};
</script>

