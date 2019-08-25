<template lang="html">
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign in</h1>
          <p class="text-xs-center">
            <router-link :to="{ name: 'register' }">
              Need an account?
            </router-link>
          </p>
          <ul v-if="errors" class="error-messages">
            <li v-for="(v, k) in errors" :key="k">{{ k }} {{ v | error }}</li>
          </ul>
          <form v-on:submit.prevent="onSubmit(email, password);">
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                v-model="email"
                placeholder="Email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                v-model="password"
                placeholder="Password"
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { LOGIN } from "@/store/actions.type";
export default {
  name: "RwvLogin",
  data() {
    return {
      email: null,
      password: null
    };
  },
  methods: {
    onSubmit(email, password) {
      this.$store
        .dispatch(LOGIN, { email, password })
        .then(() => this.$router.push({ name: "home" }));
    }
  },
  computed: {
    ...mapState({
      errors: state => state.auth.errors
    })
  }
};
</script>

<style lang="scss" scoped>
div.wrapper-layout {
  overflow-y: auto;
}
div.wrapper-layout,
div.wrapper-layout * {
  font-size: 16 !important;
}

.flex {
  // padding: 2rem;
  // font-size: 1.8rem;
  @include flex() {
    background-color: gold;
  }
}

.grid {
  @include grid(repeat(1, auto), repeat(1, auto), row) {
    background-color: var(--brown-500);
    color: var(--color-white-snow);
  }
  @include mq(md) {
    @include grid(repeat(2, auto), repeat(2, auto), row) {
      background-color: var(--deeporange-400);
      color: var(--grey-200);
    }
  }
  @include mq(lg) {
    @include grid(repeat(2, auto), repeat(4, auto), row) {
      background-color: var(--bluegrey-50);
      color: var(--grey-800);
    }
  }
}

.item {
  // flex: 1;
  // display: inline-block;
  border: thin solid black;
  margin: 0.25em;
  padding: 0.25em;
}
</style>