<template>
  <div class="card">
    <div class="card__image">
      <img class="image" :src="data.image[0]" alt="" />
    </div>
    <div class="card__text">
      <h2 class="text__headline">{{ data.name }}</h2>
      <div class="text__description">{{ data.occupation }}</div>
    </div>
  </div>
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
