export class GameDetail {
    constructor(detailContainer, homeContainer) {
      this.detailContainer = detailContainer;
      this.homeContainer = homeContainer;
    }
  
    showGameDetails(game) {
      this.homeContainer.classList.add('d-none');
      this.detailContainer.classList.remove('d-none');
      this.detailContainer.innerHTML = `
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
  
      document.querySelector('#close-btn').addEventListener('click', () => {
        this.homeContainer.classList.remove('d-none');
        this.detailContainer.classList.add('d-none');
      });
    }
  }
  