<template>
  <div>
    <h5 class="mb-6 font-bold text-lg text-pink-700">
      {{ title }}
    </h5>

    <img
      class="object-cover w-full h-86 shadow-xl rounded-xl"
      :src="image"
      alt=""
    />

    <div class="p-4">
      <p class="mt-2 text-gray-500" v-if="description">
        {{ description }}
      </p>
    </div>

    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  display: flex;
  flex-direction: column;
  width: 30vw;
  min-width: 300px;
  border: 3px solid palevioletred;
  background: pink;
  border-radius: 3px;

  .card__image .image {
    width: 100%;
    aspect-ratio: 1.5/1;
    object-fit: cover;
  }

  .card__text {
    margin-top: 16px;
    white-space: pre-line;
    margin: 0 auto 20px;
    max-width: 80%;
    line-height: 24px;
  }
}
</style>
