<template>
  <a class="relative block bg-black group" href="">
    <img
      class="absolute inset-0 object-cover w-full h-full transition-opacity opacity-75 group-hover:opacity-50"
      :src="data.image[0]"
      alt=""
    />
    <div class="relative p-8">
      <p class="text-2xl font-bold text-white">{{ data.name }}</p>

      <div class="mt-64">
        <div
          class="transition-all transform translate-y-8 opacity-0 group-hover:opacity-100 group-hover:translate-y-0"
        >
          <p class="text-sm text-white">
            {{ data.occupation }}
          </p>
        </div>
      </div>
    </div>
  </a>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
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
