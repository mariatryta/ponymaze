<template>
  <div :class="['relative border-0', classNames]">
    <label class="block text-s font-medium text-gray-500 mb-4" :key="name">
      <slot></slot>
    </label>

    <input
      class="w-full p-3 text-sm border-2 border-gray-200 rounded focus:border-pink-600 focus:ring-0"
      :name="name"
      :id="name"
      :value="value"
      v-bind="$attrs"
      @input="$emit('update:value', $event.target.value)"
      :placeholder="placeholder"
    />
  </div>
</template>

<script>
export default {
  name: "Input",
  inheritAttrs: false,
  props: {
    name: {
      type: String,
      require: true,
    },
    placeholder: {
      type: String,
      require: false,
      default: "",
    },
    value: {
      type: [String, Number],
      require: true,
    },
    classNames: {
      type: String,
      require: false,
      default: "",
    },
  },
};
</script>

