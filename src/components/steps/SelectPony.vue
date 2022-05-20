<template>
  <div class="md:w-6/12 w-4/5">
    <form @submit.prevent="submitValue" class="mb-2">
      <vInput
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
      class="text-sm font-light text-gray-600 cursor-pointer"
    >
      Don't know any ponies ? Choose one here
    </p>

    <Modal
      v-show="showDefaultPonies"
      labeledBy="showcaseTitle"
      closeButton="Cancel"
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
      if (!this.userPonyName || this.userPonyName === "") {
        return;
      }

      this.loading = true;

      fetch(`http://ponyweb.ml/v1/character/${this.userPonyName}`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Something went wrong while fetching pony's name.");
        })
        .then(({ data }) => {
          if (data.length > 0) {
            this.$store.commit("user/setPony", data[0]);

            this.$emit("nextState");
          } else {
            throw new Error("Couldn't find pony with this name");
          }
        })
        .catch((error) => console.log(error))
        .finally(() => {
          this.loading = true;
        });
    },
  },
};
</script>

