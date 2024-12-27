export class NavBar {
    constructor(navBarBtn, navElement) {
      this.navBarBtn = navBarBtn;
      this.navElement = navElement;
      this.setupNavBar();
    }
  
    setupNavBar() {
      this.navBarBtn.addEventListener('click', () => {
        const navBarLinks = document.querySelector('#navbarNav');
        const isExpanded = navBarLinks.classList.contains('show');
        this.navBarBtn.setAttribute('aria-expanded', !isExpanded);
        this.navElement.style.paddingBottom = isExpanded ? '8px' : '350px';
        navBarLinks.classList.toggle('show');
      });
    }
  }
  