<template>
  <div class="showcase">
    <div class="showcase__ponies">
      <div class="pony" v-for="pony in defaultPonies" :key="pony.name">
        <div class="pony__image-wrapper">
          <img
            class="pony__image"
            :src="require(`@/assets/ponies/${pony.key}.png`)"
            alt=""
          />
        </div>
        <div class="pony__name">{{ pony.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    defaultPonies: {
      type: Array,
      require: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.showcase {
  background-color: $main-color;
  position: relative;
  padding-bottom: 20px;

  &::before {
    content: "";
    position: absolute;
    background-color: #ec058e;
    width: 111%;
    height: 100%;
    left: -5%;
    top: -100%;
    mask: url("../assets/clouds.svg");
    mask-repeat: no-repeat;
    mask-size: cover;
    z-index: 2;
  }
  &::after {
    content: "";
    position: absolute;
    background-color: $light;
    width: 115%;
    height: 102%;
    left: -6%;
    top: -107%;
    mask: url("../assets/clouds.svg");
    mask-repeat: no-repeat;
    mask-size: cover;
    z-index: 0;
  }

  .showcase__ponies {
    display: flex;
    gap: 25px;
    justify-content: space-evenly;
    position: relative;
    top: -20px;
    z-index: 3;

    .pony {
      width: 13%;
      cursor: pointer;

      &:hover .pony__image-wrapper {
        transform: scale(1.1);
      }

      .pony__image-wrapper {
        border-radius: 100%;
        overflow: hidden;
        border: 10px solid $light;
        transition: transform 200ms ease-in-out;
        background: $main-color;
        position: relative;

        .pony__image {
          width: 100%;
          aspect-ratio: 1/1;
          object-fit: cover;
        }
      }

      .pony__name {
        font-family: $font-decorative;
        font-weight: 600;
        color: white;
        font-size: 24px;
        position: relative;
        top: -15px;
      }
    }
  }
}
</style>
