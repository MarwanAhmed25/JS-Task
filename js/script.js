
const navBarBtn = document.querySelector('.navbar-toggler');
const nav = document.querySelector('nav');



navBarBtn.addEventListener('click', ()=>{
    
    const navBarLinks = document.querySelector('#navbarNav');
    if(navBarLinks.classList.contains('show')){
        navBarBtn.setAttribute('aria-expanded', 'true');
        nav.style.paddingBottom= '8px';
    }else{
        navBarBtn.setAttribute('aria-expanded', 'false');
        nav.style.paddingBottom= '350px';
    }
    navBarLinks.classList.toggle('show');
});




    const api = 'https://www.freetogame.com/api/games';


    async function display(){
        const response = await fetch(api, {method:'GET', mode:'no-cors'});
        const res = await response.json();
        console.log(res);
        
    }



display();