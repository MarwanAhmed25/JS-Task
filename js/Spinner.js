export class Spinner {
    constructor(spinnerElement, mainElement) {
      this.spinnerElement = spinnerElement;
      this.mainElement = mainElement;
    }
  
    show() {
      this.spinnerElement.classList.remove('d-none');
      this.mainElement.classList.add('d-none');
    }
  
    hide() {
      this.spinnerElement.classList.add('d-none');
      this.mainElement.classList.remove('d-none');
    }
  }
  