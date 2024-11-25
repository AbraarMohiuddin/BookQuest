const { createApp } = Vue;

const HomeComponent = {
  template: `
    <div>
      <div v-if="!isLoggedIn" class="welcome-banner">
        <img src="https://foodtank.com/wp-content/uploads/2021/07/alfons-morales-YLSwjSy7stw-unsplash.jpg" alt="Welcome Image" class="banner-image">
        <div class="banner-text">
          <h1>Welcome to BookQuest</h1>
          <p>Your one-stop destination for exploring the best books!</p>
        </div>
      </div>
      
      <!-- Logged Banner for Logged In Users -->
      <div v-if="isLoggedIn" class="logged-banner">
        <div class="logged-text">
          <h1>Welcome back to BookQuest 📚</h1>
          <p>Explore the world of books with us! 🌟</p>
        </div>
      </div>

      <!-- Control Icons -->
      <div v-if="isLoggedIn" class="text-end icon-container">
        <div class="icon-with-text" @click="openCreateBooks" style="cursor: pointer;">
          <i class="material-icons">build</i>
          <span>Create</span>
        </div>
        <div class="icon-with-text" @click="openEditBooks" style="cursor: pointer;">
          <i class="material-icons">edit</i>
          <span>Edit</span>
        </div>
        <div class="icon-with-text" @click="openDeleteBooks" style="cursor: pointer;">
          <i class="material-icons">delete</i>
          <span>Delete</span>
        </div>
      </div>

      <!-- Featured Books Section -->
      <h2 class="mt-5">Featured Books</h2>
      <br><br>
      <div class="row">
        <div class="col-md-2 mb-4" v-for="featuredBook in paginatedFeaturedBooks" :key="featuredBook.id">
          <div class="card h-100">
            <img :src="featuredBook.cover_url" alt="Book cover" class="card-img-top">
            <div class="card-body">
              <h5 class="card-title">{{ featuredBook.title }}</h5>
              <p class="card-text">Book ID: {{ featuredBook.bid }}</p>
              <p class="card-text">Author: {{ featuredBook.author }}</p>
              <p class="card-text" v-if="isLoggedIn">Likes: {{ featuredBook.likes }}</p>
              <button @click="viewBookDetails(featuredBook.id)" class="btn btn-info">View Details</button>
              <button v-if="isLoggedIn" @click="likeBook(featuredBook.bid, 'featured_books')" class="btn btn-primary">Like</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination Controls -->
      <ul class="pagination">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <a class="page-link" @click="previousPage">Previous</a>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <a class="page-link" @click="nextPage">Next</a>
        </li>
      </ul>

      <!-- Most Liked Books Section -->
      <h2 class="mt-5" v-if="isLoggedIn">Most Liked Books from our Featured Books</h2>
      <div class="row" v-if="isLoggedIn">
        <div class="col-md-2 mb-4" v-for="likedBook in paginatedMostLikedBooks" :key="likedBook.id">
          <div class="card h-100">
            <img :src="likedBook.cover_url" alt="Book cover" class="card-img-top">
            <div class="card-body">
              <h5 class="card-title">{{ likedBook.title }}</h5>
              <p class="card-text">Author: {{ likedBook.author }}</p>
              <p class="card-text">Likes: {{ likedBook.likes }}</p>
              <button @click="viewBookDetails(likedBook.id)" class="btn btn-info">View Details</button>
              <button @click="likeBook(likedBook.bid, 'featured_books')" class="btn btn-primary">Like</button>
            </div>
          </div>
        </div>
      </div>
      <ul class="pagination" v-if="isLoggedIn">
        <li class="page-item" :class="{ disabled: currentLikedPage === 1 }">
          <a class="page-link" @click="previousLikedPage">Previous</a>
        </li>
        <li class="page-item" :class="{ disabled: currentLikedPage === totalLikedPages }">
          <a class="page-link" @click="nextLikedPage">Next</a>
        </li>
      </ul>

      <!-- Best Sellers Section -->
      <h2 class="mt-5">Best Sellers</h2>
      <div class="row">
        <div class="col-md-2 mb-4" v-for="bestSeller in paginatedBestSellers" :key="bestSeller.id">
          <div class="card h-100">
            <img :src="bestSeller.cover_url" alt="Book cover" class="card-img-top">
            <div class="card-body">
              <h5 class="card-title">{{ bestSeller.title }}</h5>
              <p class="card-text">Author: {{ bestSeller.author }}</p>
              <p class="card-text" v-if="isLoggedIn">Likes: {{ bestSeller.likes }}</p>
              <button @click="viewBookDetails(bestSeller.id)" class="btn btn-info">View Details</button>
              <button v-if="isLoggedIn" @click="likeBook(bestSeller.bid, 'best_sellers')" class="btn btn-primary">Like</button>
            </div>
          </div>
        </div>
      </div>
      <ul class="pagination">
        <li class="page-item" :class="{ disabled: currentBestSellersPage === 1 }">
          <a class="page-link" @click="previousBestSellersPage">Previous</a>
        </li>
        <li class="page-item" :class="{ disabled: currentBestSellersPage === totalBestSellersPages }">
          <a class="page-link" @click="nextBestSellersPage">Next</a>
        </li>
      </ul>

      <!-- All Time Hits Section -->
      <h2 class="mt-5">All Time Hits</h2>
      <div class="row">
        <div class="col-md-2 mb-4" v-for="allTimeHit in paginatedAllTimeHits" :key="allTimeHit.id">
          <div class="card h-100">
            <img :src="allTimeHit.cover_url" alt="Book cover" class="card-img-top">
            <div class="card-body">
              <h5 class="card-title">{{ allTimeHit.title }}</h5>
              <p class="card-text">Author: {{ allTimeHit.author }}</p>
              <p class="card-text" v-if="isLoggedIn">Likes: {{ allTimeHit.likes }}</p>
              <button @click="viewBookDetails(allTimeHit.id)" class="btn btn-info">View Details</button>
              <button v-if="isLoggedIn" @click="likeBook(allTimeHit.bid, 'all_time_hits')" class="btn btn-primary">Like</button>
            </div>
          </div>
        </div>
      </div>
      <ul class="pagination">
        <li class="page-item" :class="{ disabled: currentAllTimeHitsPage === 1 }">
          <a class="page-link" @click="previousAllTimeHitsPage">Previous</a>
        </li>
        <li class="page-item" :class="{ disabled: currentAllTimeHitsPage === totalAllTimeHitsPages }">
          <a class="page-link" @click="nextAllTimeHitsPage">Next</a>
        </li>
      </ul>
    </div>
  `,
  data() {
    return {
      books: [],
      featuredBooks: [],
      mostLikedBooks: [],
      bestSellers: [],
      allTimeHits: [],
      searchQuery: 'The Lord of the Rings',
      currentPage: 1,
      itemsPerPage: 6,
      currentLikedPage: 1,
      likedItemsPerPage: 6,
      currentBestSellersPage: 1,
      currentAllTimeHitsPage: 1,
      isLoggedIn: localStorage.getItem('isLoggedIn') === 'true'
    };
  },
  mounted() {
    this.checkLogin();
    this.fetchFeaturedBooks();
    this.fetchMostLikedBooks();
    this.fetchBestSellers();
    this.fetchAllTimeHits();
  },
  computed: {
    totalPages() {
      return Math.ceil(this.featuredBooks.length / this.itemsPerPage);
    },
    totalLikedPages() {
      return Math.ceil(this.mostLikedBooks.length / this.likedItemsPerPage);
    },
    totalBestSellersPages() {
      return Math.ceil(this.bestSellers.length / this.itemsPerPage);
    },
    totalAllTimeHitsPages() {
      return Math.ceil(this.allTimeHits.length / this.itemsPerPage);
    },
    paginatedFeaturedBooks() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.featuredBooks.slice(startIndex, endIndex);
    },
    paginatedMostLikedBooks() {
      const startIndex = (this.currentLikedPage - 1) * this.likedItemsPerPage;
      const endIndex = startIndex + this.likedItemsPerPage;
      return this.mostLikedBooks.slice(startIndex, endIndex);
    },
    paginatedBestSellers() {
      const startIndex = (this.currentBestSellersPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.bestSellers.slice(startIndex, endIndex);
    },
    paginatedAllTimeHits() {
      const startIndex = (this.currentAllTimeHitsPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.allTimeHits.slice(startIndex, endIndex);
    }
  },
  methods: {
    async fetchFeaturedBooks() {
      try {
        const response = await fetch('resources/apis.php/featured_books');
        this.featuredBooks = await response.json();
      } catch (error) {
        console.error('Error fetching featured books:', error);
      }
    },
    async fetchMostLikedBooks() {
      try {
        const response = await fetch('resources/apis.php/featured_books/most_liked');
        this.mostLikedBooks = await response.json();
      } catch (error) {
        console.error('Error fetching most liked books:', error);
      }
    },
    async fetchBestSellers() {
      try {
        const response = await fetch('resources/apis.php/best_sellers');
        this.bestSellers = await response.json();
      } catch (error) {
        console.error('Error fetching best sellers:', error);
      }
    },
    async fetchAllTimeHits() {
      try {
        const response = await fetch('resources/apis.php/all_time_hits');
        this.allTimeHits = await response.json();
      } catch (error) {
        console.error('Error fetching all time hits:', error);
      }
    },
    async fetchBooks() {
      const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(this.searchQuery)}`);
      const data = await response.json();
      this.books = data.docs.map(book => ({
        ...book,
        likes: 0
      }));
    },
    viewBookDetails(bookId) {
      const path = `/works/${bookId}`;
      window.location.href = `bookdetails.html?key=${encodeURIComponent(path)}`;
    },
    checkLogin() {
      this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'; 
    },
    logout() {
      localStorage.removeItem('isLoggedIn'); 
      this.isLoggedIn = false;
      alert('Logged out successfully');
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
    previousLikedPage() {
      if (this.currentLikedPage > 1) {
        this.currentLikedPage--;
      }
    },
    nextLikedPage() {
      if (this.currentLikedPage < this.totalLikedPages) {
        this.currentLikedPage++;
      }
    },
    previousBestSellersPage() {
      if (this.currentBestSellersPage > 1) {
        this.currentBestSellersPage--;
      }
    },
    nextBestSellersPage() {
      if (this.currentBestSellersPage < this.totalBestSellersPages) {
        this.currentBestSellersPage++;
      }
    },
    previousAllTimeHitsPage() {
      if (this.currentAllTimeHitsPage > 1) {
        this.currentAllTimeHitsPage--;
      }
    },
    nextAllTimeHitsPage() {
      if (this.currentAllTimeHitsPage < this.totalAllTimeHitsPages) {
        this.currentAllTimeHitsPage++;
      }
    },
    openCreateBooks() {
      window.location.href = 'createbooks.html';
    },
    openEditBooks() {
      window.location.href = 'editbooks.html';
    },
    openDeleteBooks() {
      window.location.href = 'deletebook.html';
    },
    async likeBook(bid, table) {
      try {
        const response = await fetch(`resources/apis.php/${table}?bid=${bid}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          this.fetchFeaturedBooks();
          this.fetchMostLikedBooks();
          this.fetchBestSellers();
          this.fetchAllTimeHits();
        } else {
          const errorData = await response.json();
          alert('Error liking book: ' + errorData.error);
        }
      } catch (error) {
        console.error('Error liking book:', error);
      }
    }
  }
};

const routes = [
  { path: '/', component: HomeComponent },
  { path: '/books/:id', component: { template: '<div><router-view /></div>' } }
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes
});

const app = createApp(HomeComponent);
app.use(router).mount('#app');
