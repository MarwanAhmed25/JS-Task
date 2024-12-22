class GameApp {
    constructor() {
      this.apiBaseUrl = 'https://free-to-play-games-database.p.rapidapi.com/api';
      this.apiHeaders = {
        'x-rapidapi-key': '244f9092fcmshec52d2dd2019ed7p155937jsn7fd31bbc1221',
        'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com',
      };
      this.gamesContainer = document.querySelector('.row');
      this.main = document.querySelector('main');
      this.links = document.querySelectorAll('li > a');
      this.home = document.querySelector('.home');
      this.detail = document.querySelector('.game-detail');
      this.navBarBtn = document.querySelector('.navbar-toggler');
      this.nav = document.querySelector('nav');
      this.spinner = document.querySelector('.spinner'); // Spinner element
      this.init();
    }
  
    init() {
      this.setupNavBar();
      this.loadGames();
      this.setupCategoryLinks();
    }
  
    setupNavBar() {
      this.navBarBtn.addEventListener('click', () => {
        const navBarLinks = document.querySelector('#navbarNav');
        const isExpanded = navBarLinks.classList.contains('show');
        this.navBarBtn.setAttribute('aria-expanded', !isExpanded);
        this.nav.style.paddingBottom = isExpanded ? '8px' : '350px';
        navBarLinks.classList.toggle('show');
      });
    }
  
    async fetchGames(endpoint) {
      try {
        this.showSpinner(); // Show spinner before fetching
        const response = await fetch(`${this.apiBaseUrl}/${endpoint}`, {
          method: 'GET',
          headers: this.apiHeaders,
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        this.hideSpinner(); // Hide spinner after fetching
      }
    }
  
    async loadGames() {
      const games = await this.fetchGames('games');
      if (games) {
        this.renderGames(games);
      }
    }
  
    renderGames(games) {
      const container = games.map((game) => `
        <section class="inner p-3 col-12 col-md-6 col-lg-4 col-xl-3">
          <div data-id="${game.id}">
            <section class="p-2">
              <section class="image-container pb-2">
                <img src="${game.thumbnail}" width="100%" alt="">
              </section>
              <section class="d-flex justify-content-between px-2">
                <span class="text-white">${game.title}</span>
                <span class="badge custom-bg d-flex align-items-center">Free</span>
              </section>
              <p class="lead text-secondary">${game.short_description.slice(0, 50)}...</p>
            </section>
            <section class="d-flex justify-content-between p-2 section-bottom">
              <span class="badge badge-secondary bg-secondary">${game.genre}</span>
              <span class="badge badge-secondary bg-secondary">${game.platform}</span>
            </section>
          </div>
        </section>
      `).join('');
  
      this.gamesContainer.innerHTML = container;
      this.addGameClickEvents();
    }
  
    addGameClickEvents() {
      const gameDivs = document.querySelectorAll('.row .inner > div');
      gameDivs.forEach((div) => {
        div.addEventListener('click', async () => {
          const gameId = div.getAttribute('data-id');
          const gameDetails = await this.fetchGames(`game?id=${gameId}`);
          if (gameDetails) {
            this.showGameDetails(gameDetails);
          }
        });
      });
    }
  
    showGameDetails(game) {
      this.home.classList.add('d-none');
      this.detail.classList.remove('d-none');
      this.detail.innerHTML = `
        <section class="header d-flex justify-content-between align-items-center">
          <h1>Game Detail</h1>
          <button id="close-btn" class="border-0"><i class="fa-solid fa-xmark text-secondary"></i></button>
        </section>
        <section class="main-game-detail d-flex flex-wrap my-5">
          <section class="image-container">
            <img src="${game.thumbnail}" width="100%" alt="game">
          </section>
          <section class="main-content-container pt-3 pt-lg-0 ps-lg-3">
            <section class="main-content text-start">
              <p class="lead">Title: ${game.title}</p>
              <p class="lead">Category: <span class="badge bg-info">${game.genre}</span></p>
              <p class="lead">Platform: <span class="badge bg-info">${game.platform}</span></p>
              <p class="lead">Status: <span class="badge bg-info">${game.status}</span></p>
              <p class="lead">${game.description}</p>
              <a href="${game.freetogame_profile_url}" class="btn btn-outline-warning">Show Game</a>
            </section>
          </section>
        </section>
      `;
  
      const closeDetailBtn = document.querySelector('#close-btn');
      closeDetailBtn.addEventListener('click', () => {
        this.home.classList.remove('d-none');
        this.detail.classList.add('d-none');
      });
    }
  
    setupCategoryLinks() {
      this.links.forEach((link) => {
        link.addEventListener('click', async () => {
          this.links.forEach((link) => link.classList.remove('active'));
          link.classList.add('active');
          const category = link.innerHTML;
          const games = await this.fetchGames(`games?category=${category}`);
          if (games) {
            this.renderGames(games);
          }
        });
      });
    }
  
    showSpinner() {
      if (this.spinner) {
        this.spinner.classList.remove('d-none');
        this.main.classList.add('d-none');
      }
    }
  
    hideSpinner() {
      if (this.spinner) {
        this.spinner.classList.add('d-none');
        this.main.classList.remove('d-none');
      }
    }
  }
  
  const app = new GameApp();
  