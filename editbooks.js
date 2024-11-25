const { createApp } = Vue;

const EditBookComponent = {
  template: `
    <div>
      <h2>Edit Featured Book</h2>
      <form @submit.prevent="validateForm">
        <div class="mb-3">
          <label for="bid" class="form-label">Book ID (BID)</label>
          <input type="number" class="form-control" id="bid" v-model="book.bid" @blur="validateField('bid')" required>
          <div v-if="errors.bid" class="text-danger">{{ errors.bid }}</div>
        </div>
        <div class="mb-3">
          <label for="olid" class="form-label">OpenLibrary ID (OLID)</label>
          <input type="text" class="form-control" id="olid" v-model="book.id" @blur="validateField('id')" required>
          <div v-if="errors.id" class="text-danger">{{ errors.id }}</div>
        </div>
        <div class="mb-3">
          <label for="title" class="form-label">Title</label>
          <input type="text" class="form-control" id="title" v-model="book.title" @blur="validateField('title')" required>
          <div v-if="errors.title" class="text-danger">{{ errors.title }}</div>
        </div>
        <div class="mb-3">
          <label for="author" class="form-label">Author</label>
          <input type="text" class="form-control" id="author" v-model="book.author" @blur="validateField('author')" required>
          <div v-if="errors.author" class="text-danger">{{ errors.author }}</div>
        </div>
        <div class="mb-3">
          <label for="cover_url" class="form-label">Cover URL</label>
          <input type="text" class="form-control" id="cover_url" v-model="book.cover_url" @blur="validateField('cover_url')" required>
          <div v-if="errors.cover_url" class="text-danger">{{ errors.cover_url }}</div>
        </div>
        <button type="submit" class="btn btn-primary">Edit Book</button>
      </form>
    </div>
  `,
  data() {
    return {
      book: {
        bid: "",
        id: "",
        title: "",
        author: "",
        cover_url: "",
      },
      errors: {
        bid: "",
        id: "",
        title: "",
        author: "",
        cover_url: "",
      },
    };
  },
  methods: {
    validateField(field) {
      this.errors[field] = "";
      if (field === "bid" && (!this.book.bid || isNaN(this.book.bid))) {
        this.errors.bid = "Book ID is required and must be a number.";
      } else if (field !== "bid" && !this.book[field]) {
        this.errors[field] = `${this.capitalize(field)} is required.`;
      }
    },
    validateForm() {
      this.validateField("bid");
      this.validateField("id");
      this.validateField("title");
      this.validateField("author");
      this.validateField("cover_url");
      if (!Object.values(this.errors).some((error) => error)) {
        this.editBook();
      }
    },
    async editBook() {
      try {
        const response = await fetch("resources/apis.php", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.book),
        });

        if (response.ok) {
          alert("Book edited successfully!");
          window.location.href = "home.html";
        } else {
          const errorData = await response.json();
          alert("Error editing book: " + errorData.error);
        }
      } catch (error) {
        console.error("Error editing book:", error);
      }
    },
    capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
  },
};

const app = createApp(EditBookComponent);
app.mount("#app");
