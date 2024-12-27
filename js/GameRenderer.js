export class GameRenderer {
    constructor(container, onGameClick) {
      this.container = container;
      this.onGameClick = onGameClick;
    }
  
    renderGames(games) {
      const content = games.map(game => `
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
  
      this.container.innerHTML = content;
      this.addGameClickEvents();
    }
  
    addGameClickEvents() {
      const gameDivs = this.container.querySelectorAll('.inner > div');
      gameDivs.forEach(div => {
        div.addEventListener('click', () => {
          const gameId = div.getAttribute('data-id');
          this.onGameClick(gameId);
        });
      });
    }
  }
  