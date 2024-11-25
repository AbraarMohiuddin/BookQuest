const { createApp } = Vue;
const { createVuetify } = Vuetify;
const { VApp, VContainer, VForm, VTextField, VBtn } = Vuetify.components;

const CreateBookComponent = {
  template: `
    <v-form ref="form" v-model="valid">
      <v-text-field
        label="OpenLibrary ID (OLID)"
        v-model="book.id"
        :rules="[v => !!v || 'OpenLibrary ID is required']"
        required
      ></v-text-field>
      <v-text-field
        label="Title"
        v-model="book.title"
        :rules="[v => !!v || 'Title is required']"
        required
      ></v-text-field>
      <v-text-field
        label="Author"
        v-model="book.author"
        :rules="[v => !!v || 'Author is required']"
        required
      ></v-text-field>
      <v-text-field
        label="Cover URL"
        v-model="book.cover_url"
        :rules="[v => !!v || 'Cover URL is required']"
        required
      ></v-text-field>
      <v-btn :disabled="!valid" @click="createBook">Create Book</v-btn>
    </v-form>
  `,
  data() {
    return {
      valid: false,
      book: {
        id: "",
        title: "",
        author: "",
        cover_url: "",
      },
    };
  },
  methods: {
    async createBook() {
      if (this.$refs.form.validate()) {
        try {
          const response = await fetch("resources/apis.php", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(this.book),
          });

          if (response.ok) {
            alert("Book created successfully!");
            window.location.href = "home.html";
          } else {
            const errorData = await response.json();
            alert("Error creating book: " + errorData.error);
          }
        } catch (error) {
          console.error("Error creating book:", error);
        }
      }
    },
  },
};

// Create and mount the Vue app
const vuetify = createVuetify();

const app = createApp({
  components: {
    CreateBook: CreateBookComponent,
  },
});

app.use(vuetify);
app.mount("#app");
