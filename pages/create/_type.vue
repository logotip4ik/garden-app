<template>
  <form class="form" @submit.prevent="() => save(type)" @reset.prevent="reset">
    <div class="form__item">
      <label>{{ type === 'group' ? 'Веддіть назву Групи:' : '' }}</label>
      <input
        v-model="name"
        type="text"
        :placeholder="type === 'group' ? 'Яблуні' : ''"
      />
    </div>
    <div class="form__action">
      <button class="save" type="submit">save</button>
      <button class="reset" type="reset">reset</button>
    </div>
  </form>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  asyncData({ params }) {
    return { type: params.type }
  },
  computed: {
    name: {
      get() {
        return this.$store.state.name
      },
      set(val) {
        return this.$store.commit('update', ['name', val])
      },
    },
  },
  methods: {
    ...mapActions({ save: 'saveForm', reset: 'resetForm' }),
  },
}
</script>

<style lang="scss" scoped>
.form {
  width: 100%;
  max-width: 400px;
  padding: 0.5rem;
  &__item {
    label {
      display: block;
      font-size: 1.2rem;
      margin-bottom: 0.5rem;
    }
    input {
      width: 100%;
      border: none;
      border-bottom: 1px solid rgba($color: #000000, $alpha: 0.2);
      font-size: 1.2rem;
      padding: 0.25rem 0.1rem;
      outline: none;
      transition: border-bottom-color 200ms ease-out,
        border-bottom-width 200ms ease-out;
      &:hover {
        border-bottom-color: rgba($color: #000000, $alpha: 0.5);
      }
      &:focus {
        border-bottom-color: rgba($color: #000000, $alpha: 1);
        border-bottom-width: 2px;
      }
    }
  }
}
</style>
