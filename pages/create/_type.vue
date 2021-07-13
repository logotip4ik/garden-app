<template>
  <form class="form" @submit.prevent="save" @reset.prevent="reset">
    <div class="form__item">
      <label>{{
        type === 'groups' ? 'Веддіть назву Групи:' : 'Веддіть назву Рослини:'
      }}</label>
      <input
        ref="input1"
        v-model="name"
        type="text"
        required
        :placeholder="type === 'groups' ? 'Яблуні...' : 'Юпітер'"
      />
    </div>
    <div v-if="type === 'groups'" class="form__item">
      <label>Веддіть тип Рослин:</label>
      <select ref="inputPlantType" v-model="plantType" required>
        <option value="yablyniGrushi" selected>Яблуні та Груші</option>
        <option value="slivi">Сливи</option>
        <option value="chereshniVishni">Черешні та Вишні</option>
        <option value="abrkosPersik">Абрикос та Персик</option>
        <option value="smorodina">Смородина</option>
        <option value="malina">Малина</option>
        <option value="vinograd">Виноград</option>
        <option value="suniza">Суниця</option>
      </select>
    </div>
    <div class="form__action">
      <button class="button save" type="submit">Зберегти</button>
      <button class="button reset" type="reset">Скасувати</button>
    </div>
  </form>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  computed: {
    plantType: {
      get() {
        return this.$store.state.plantType
      },
      set(val) {
        return this.$store.commit('update', ['plantType', val])
      },
    },
    name: {
      get() {
        return this.$store.state.name
      },
      set(val) {
        return this.$store.commit('update', ['name', val])
      },
    },
    type() {
      return this.$route.params.type
    },
  },
  mounted() {
    this.$refs.input1.focus()
  },
  methods: {
    ...mapActions(['saveForm', 'resetForm']),
    save() {
      this.saveForm(this.type)
      this.$nuxt.$loading.start()
    },
    reset() {
      this.resetForm()
      this.$router.go(-1)
    },
  },
}
</script>

<style lang="scss" scoped>
.form {
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  padding: 1.5rem 1rem 0;
  &__item {
    margin-bottom: 2rem;
    label {
      display: block;
      font-size: 1.2rem;
      margin-bottom: 1rem;
    }
    input,
    select {
      width: 100%;
      border: none;
      border-radius: 0;
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
