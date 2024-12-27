import { ApiService } from './ApiService.js';
import { GameRenderer } from './GameRenderer.js';
import { GameDetail } from './GameDetail.js';
import { NavBar } from './NavBar.js';
import { Spinner } from './Spinner.js';

class GameApp {
  constructor() {
    const apiBaseUrl = 'https://free-to-play-games-database.p.rapidapi.com/api';
    const apiHeaders = {
      'x-rapidapi-key': '244f9092fcmshec52d2dd2019ed7p155937jsn7fd31bbc1221',
      'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com',
    };

    this.apiService = new ApiService(apiBaseUrl, apiHeaders);
    this.spinner = new Spinner(
      document.querySelector('.spinner'),
      document.querySelector('main')
    );
    this.navBar = new NavBar(
      document.querySelector('.navbar-toggler'),
      document.querySelector('nav')
    );
    this.gameRenderer = new GameRenderer(
      document.querySelector('.row'),
      this.handleGameClick.bind(this)
    );
    this.gameDetail = new GameDetail(
      document.querySelector('.game-detail'),
      document.querySelector('.home')
    );

    this.init();
  }

  async init() {
    console.log('...........init');
    
    await this.loadGames();
    this.setupCategoryLinks();
  }

  async loadGames() {
    this.spinner.show();
    const games = await this.apiService.fetchGames('games');
    if (games) {
      this.gameRenderer.renderGames(games);
    }
    this.spinner.hide();
  }

  async handleGameClick(gameId) {
    this.spinner.show();
    const gameDetails = await this.apiService.fetchGames(`game?id=${gameId}`);
    if (gameDetails) {
      this.gameDetail.showGameDetails(gameDetails);
    }
    this.spinner.hide();
  }

  setupCategoryLinks() {
    const links = document.querySelectorAll('li > a');
    links.forEach(link => {
      link.addEventListener('click', async () => {
        links.forEach(link => link.classList.remove('active'));
        link.classList.add('active');
        const category = link.innerHTML;
        const games = await this.apiService.fetchGames(`games?category=${category}`);
        if (games) {
          this.gameRenderer.renderGames(games);
        }
      });
    });
  }
}

const app = new GameApp();
