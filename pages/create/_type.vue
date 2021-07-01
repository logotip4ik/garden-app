<template>
  <form
    class="form"
    @submit.prevent="() => saveForm(type)"
    @reset.prevent="resetForm"
  >
    <div class="form__item">
      <label>{{ type === 'group' ? 'Веддіть назву Групи:' : '' }}</label>
      <input
        ref="input1"
        v-model="name"
        type="text"
        :placeholder="type === 'group' ? 'Яблуні...' : ''"
      />
    </div>
    <div class="form__action">
      <button class="button save" type="submit">save</button>
      <button class="button reset" type="reset">reset</button>
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
  mounted() {
    this.$refs.input1.focus()
  },
  methods: {
    ...mapActions(['saveForm', 'resetForm']),
  },
}
</script>

<style lang="scss" scoped>
.form {
  width: 100%;
  max-width: 400px;
  padding: 1.5rem 1rem 0;
  &__item {
    label {
      display: block;
      font-size: 1.2rem;
      margin-bottom: 1rem;
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
  &__action {
    padding: 1rem 0 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    gap: 1rem;

    .save {
      color: black;
      background-color: var(--secondary-color);
    }
    .reset {
      color: black;
      background-color: var(--secondary-color-light);
    }
    *:hover {
      border-color: rgba($color: #000000, $alpha: 0.1);
    }
  }
}
</style>
