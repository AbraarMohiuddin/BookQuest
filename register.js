Vue.component("register-component", {
  template: `
    <v-card class="mx-auto my-12" max-width="400">
      <v-card-title>
        <span class="headline">Register</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" @submit.prevent="handleSubmit">
          <v-text-field
            v-model="firstName"
            label="First Name"
            :rules="[v => !!v || 'First Name is required']"
            required
          ></v-text-field>
          <v-text-field
            v-model="lastName"
            label="Last Name"
            :rules="[v => !!v || 'Last Name is required']"
            required
          ></v-text-field>
          <v-text-field
            v-model="username"
            label="Username"
            :rules="[v => !!v || 'Username is required']"
            required
          ></v-text-field>
          <v-text-field
            v-model="password"
            label="Password"
            type="password"
            :rules="[v => !!v || 'Password is required']"
            required
          ></v-text-field>
          <v-btn :disabled="!valid" type="submit" color="primary" block>Register</v-btn>
        </v-form>
        <v-alert v-if="errorMessage" type="error">{{ errorMessage }}</v-alert>
        <v-alert v-if="successMessage" type="success">{{ successMessage }}</v-alert>
      </v-card-text>
    </v-card>
  `,
  data() {
    return {
      valid: false,
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      errorMessage: "",
      successMessage: "",
    };
  },
  methods: {
    handleSubmit() {
      if (this.$refs.form.validate()) {
        this.register();
      }
    },
    async register() {
      try {
        const response = await fetch("resources/api_user.php/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: this.username,
            password: this.password,
          }),
        });

        const data = await response.json();

        if (data && data.id) {
          this.successMessage = "Registration successful!";
          setTimeout(() => {
            window.location.href = "home.html";
          }, 2000);
        } else {
          this.errorMessage =
            data.error || "Registration failed. Please try again.";
        }
      } catch (error) {
        this.errorMessage = "An error occurred. Please try again later.";
      }
    },
  },
});

new Vue({
  el: "#app",
  vuetify: new Vuetify(),
});
