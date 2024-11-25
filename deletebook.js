const { createApp } = Vue;
const { createVuetify } = Vuetify;
const { VApp, VContainer, VForm, VTextField, VBtn } = Vuetify.components;

const DeleteBookComponent = {
  template: `
    <v-form ref="form" v-model="valid">
      <v-text-field
        label="Book ID (BID)"
        v-model="book.bid"
      ></v-text-field>
      <v-btn :disabled="!valid" color="error" @click="deleteBook">Delete Book</v-btn>
    </v-form>
  `,
  data() {
    return {
      valid: false,
      book: {
        bid: "",
      },
    };
  },
  methods: {
    async deleteBook() {
      if (this.$refs.form.validate()) {
        try {
          const response = await fetch(
            `resources/apis.php?bid=${this.book.bid}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (response.ok) {
            alert("Book deleted successfully!");
            window.location.href = "home.html";
          } else {
            const errorData = await response.json();
            alert("Error deleting book: " + errorData.error);
          }
        } catch (error) {
          console.error("Error deleting book:", error);
        }
      }
    },
  },
};

const vuetify = createVuetify();

const app = createApp({
  components: {
    DeleteBook: DeleteBookComponent,
  },
});

app.use(vuetify);
app.mount("#app");
