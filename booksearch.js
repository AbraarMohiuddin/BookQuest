const { createApp } = Vue;
createApp({
  data() {
    return {
      books: [],
      searchQuery: "",
      filters: {
        author: "",
        language: "",
        year: "",
      },
      sortOrder: "",
      currentPage: 1,
      itemsPerPage: 8,
      totalItems: 24,
    };
  },
  computed: {
    filteredBooks() {
      let filtered = this.books.filter((book) => {
        const authorMatch = this.filters.author
          ? book.author_name &&
            book.author_name
              .join(", ")
              .toLowerCase()
              .includes(this.filters.author.toLowerCase())
          : true;
        const languageMatch = this.filters.language
          ? book.language && book.language.includes(this.filters.language)
          : true;
        const yearMatch = this.filters.year
          ? book.first_publish_year == this.filters.year
          : true;
        return authorMatch && languageMatch && yearMatch;
      });

      if (this.sortOrder === "latest") {
        filtered.sort((a, b) => b.first_publish_year - a.first_publish_year);
      } else if (this.sortOrder === "oldest") {
        filtered.sort((a, b) => a.first_publish_year - b.first_publish_year);
      }

      return filtered;
    },
    paginatedBooks() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.filteredBooks.slice(startIndex, endIndex);
    },
    totalPages() {
      return Math.ceil(this.filteredBooks.length / this.itemsPerPage);
    },
  },
  methods: {
    async fetchBooks() {
      if (this.searchQuery.trim() === "") {
        this.books = [];
        return;
      }
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(
          this.searchQuery
        )}&limit=24`
      );
      const data = await response.json();
      this.books = data.docs.map((book) => ({
        ...book,
        likes: 0,
        key: book.key.replace("/works/", ""),
      }));
      this.applyFilters();
    },
    getCoverImage(coverId) {
      return coverId
        ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
        : "https://via.placeholder.com/150";
    },
    likeBook(book) {
      book.likes++;
    },
    viewBookDetails(bookKey) {
      window.location.href = `bookdetails.html?key=/works/${encodeURIComponent(
        bookKey
      )}`;
    },
    applyFilters() {
      this.currentPage = 1;
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    goToPage(page) {
      this.currentPage = page;
    },
  },
}).mount("#app");
