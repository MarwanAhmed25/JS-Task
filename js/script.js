
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
        const response = await fetch(api, {method:'GET', headers:{
            "X-RapidAPI-Key":"761bBa3226msh868f0d927cb6ea4p117ef0jsn46d63d281712",
            "X-RapidAPI-Host":"free-to-play-games-database.p.rapidapi.com",
        }});
        const res = await response.json()
        console.log(res);
        
    }



display();