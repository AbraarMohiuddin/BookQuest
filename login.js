Vue.component("login-login", {
  template: `
    <v-card class="mx-auto my-12" max-width="400">
      <div v-if="isLoggedIn" class="alert alert-success">
        Welcome Logged User
        <v-btn @click="logout" color="error">Logout</v-btn>
      </div>
      <v-card-title v-else>
        <span class="headline">Login</span>
      </v-card-title>
      <v-card-text v-if="!isLoggedIn">
        <v-form @submit.prevent="login">
          <v-text-field
            v-model="username"
            label="Username"
            required
          ></v-text-field>
          <v-text-field
            v-model="password"
            label="Password"
            type="password"
            required
          ></v-text-field>
          <v-btn type="submit" color="primary" block>Login</v-btn>
          <br>
          <v-btn @click="goToRegister" color="secondary" block>Register</v-btn>
        </v-form>
        <v-alert v-if="errorMessage" type="error">{{ errorMessage }}</v-alert>
      </v-card-text>
    </v-card>
  `,
  data() {
    return {
      username: "",
      password: "",
      errorMessage: "",
      isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
    };
  },
  methods: {
    async login() {
      try {
        const response = await fetch(
          "resources/api_user.php/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: this.username,
              password: this.password,
            }),
          }
        );

        const data = await response.json();

        if (data && data.id) {
          localStorage.setItem("isLoggedIn", true);
          this.isLoggedIn = true;
          window.location.href = "home.html"; 
        } else {
          this.errorMessage = "Invalid username or password";
        }
      } catch (error) {
        this.errorMessage = "An error occurred. Please try again later.";
      }
    },
    logout() {
      localStorage.removeItem("isLoggedIn");
      this.isLoggedIn = false;
      alert('Logged out successfully');
    },
    goToRegister() {
      window.location.href = "register.html";
    }
  },
});

new Vue({
  el: "#app",
  vuetify: new Vuetify(),
});
