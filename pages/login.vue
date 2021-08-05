<template>
  <div class="container">
    <h1 class="container__title">
      С<span style="color: var(--primary-color)">а</span>д<span
        style="color: var(--primary-color)"
        >о</span
      >к
    </h1>
    <client-only>
      <transition name="fade" mode="out-in">
        <VuePhoneNumberInput
          v-if="!sentSms"
          v-model="number"
          class="container__number-input"
          :loader="loading"
          @update="setNumber"
          @keypress.enter.native="sendSms"
        />
        <CodeInput
          v-else
          ref="codeInput"
          type="6"
          :fields="6"
          :field-width="35"
          :field-height="35"
          :auto-focus="true"
          :loading="loading"
          class="container__code-input"
          @change="code = $event"
          @complete="signInWithPhoneNumber"
        />
      </transition>
    </client-only>
    <transition>
      <button
        v-if="!sentSms"
        id="sign-in-button"
        ref="signIn"
        class="container__button"
        @click="sendSms"
      >
        Send sms
      </button>
      <span v-else>&nbsp;</span>
    </transition>
  </div>
</template>

<script>
import { fire } from '~/hooks/useFirebase'

export default {
  layout: 'login',
  data: () => ({
    number: '',
    formattedNumber: '',
    code: '',
    sentSms: false,
    loading: false,
  }),
  head: {
    title: 'Увійдіть в акаунт',
  },
  watch: {
    sentSms() {
      setTimeout(this.fixCodeInput, 500)
    },
  },
  mounted() {
    fire.auth().useDeviceLanguage()
    this.tryReAuth()
    window.recaptchaVerifier = new fire.auth.RecaptchaVerifier(
      'sign-in-button',
      { size: 'invisible' }
    )
  },
  methods: {
    fixCodeInput() {
      if (!this.$refs.codeInput) return
      const inputs = this.$refs.codeInput.$el.children[0].children
      for (let i = 0; i < inputs.length; i++) {
        const input = inputs[i]
        input.setAttribute('type', 'tel')
      }
      inputs[0].focus()
    },
    tryReAuth() {
      fire.auth().onAuthStateChanged((user) => {
        if (!user) return
        this.$store.commit('update', ['authenticated', true])
        this.$router.push({ name: 'index' })
      })
    },
    signInWithPhoneNumber() {
      if (!this.code) return
      this.loading = true
      window.confirmationResult
        .confirm(this.code)
        .then((result) => {
          const { user } = result
          this.loading = false
          if (!user) return
          this.$store.commit('update', ['authenticated', true])
          this.$router.push({ name: 'index' })
        })
        .catch((error) => {
          console.warn(error)
          this.loading = false
          this.formattedNumber = ''
          this.number = ''
          this.sentSms = false
          this.code = ''
        })
    },
    sendSms() {
      if (!this.formattedNumber) return
      this.loading = true
      const phoneNumber = this.formattedNumber
      const appVerifier = window.recaptchaVerifier

      fire
        .auth()
        .signInWithPhoneNumber(phoneNumber, appVerifier)
        .then((confirmationResult) => {
          this.loading = false
          this.sentSms = true
          window.confirmationResult = confirmationResult
        })
        .catch((error) => {
          this.loading = false
          console.warn({ error })
        })
    },
    setNumber({ formattedNumber = '' }) {
      this.formattedNumber = formattedNumber
    },
  },
}
</script>

<style lang="scss">
.container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 0.25rem;
  box-shadow: 0 0 2px 0 rgba($color: #000000, $alpha: 0.25),
    0 0 10px 0 rgba($color: #000000, $alpha: 0.1);
  padding: 2rem 3vw;
  width: 95vw;
  max-width: 500px;
  text-align: center;
  &__title {
    margin-bottom: 2rem;
  }

  &__code-input {
    margin: 0 auto 0.32rem;

    & > .react-code-input > input {
      font-family: inherit !important;
    }
  }

  &__button {
    margin-top: 2rem;
    border-radius: 0.25rem;
    border: none;
    padding: 0.5rem 1rem;
    text-transform: uppercase;
    box-shadow: 0 0 2px 0 rgba($color: #000000, $alpha: 0.25),
      0 0 10px 0 rgba($color: #000000, $alpha: 0.1);
    font: inherit;
    font-size: 1rem;
    font-weight: 600;
    background-color: white;
    cursor: pointer;
    transition: background-color 200ms ease, color 200ms ease;

    &:hover {
      background-color: var(--secondary-color-dark);
      color: white;
    }
  }
}
</style>
