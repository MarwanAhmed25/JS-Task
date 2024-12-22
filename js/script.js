
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

////////////////////////////////////////////////////

const gamesContainer = document.querySelector('.row');
const links = document.querySelectorAll('li>a');

async function display(){
    
    const url = `https://free-to-play-games-database.p.rapidapi.com/api/games`;
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '244f9092fcmshec52d2dd2019ed7p155937jsn7fd31bbc1221',
		'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.json();
    console.log(result);
    
    showGames(result)
    
} catch (error) {
	console.error(error);
} 
}

    
function showGames(games){
    let container = ``;

    for(let i=0; i<games.length; i++){
        container +=  
        `<section class="inner p-3 col-12 col-md-6 col-lg-4 col-xl-3">
                            <div  data-id=${games[i].id}>
                              <section class="p-2">
                                <section class="image-container pb-2">
                                  <img src="${games[i].thumbnail}" width="100%" alt="">
                                </section>
                                <section class="d-flex justify-content-between px-2">
                                  <span class="text-white">${games[i].title}</span>
                                  <span class="badge custom-bg d-flex align-items-center">Free</span>
                                </section>
                                <p class="lead text-secondary">${games[i].short_description.slice(0,50)}...</p>
                              </section>
                              <section class="d-flex justify-content-between p-2 section-bottom">
                                <span class="badge badge-secondry bg-secondary">${games[i].genre}</span>
                                  <span class="badge badge-secondry bg-secondary">${games[i].platform}</span>
                              </section>
                            </div>
                          </section>   
        `;
    }
    gamesContainer.innerHTML = container;
    const gamesDiv = document.querySelectorAll('.row .inner>div');
const home = document.querySelector('.home');
const detail = document.querySelector('.game-detail');

    for(let i=0; i<gamesDiv.length; i++){
            gamesDiv[i].addEventListener('click', async ()=>{
                const url = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${gamesDiv[i].getAttribute('data-id')}`;
            const options = {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': '244f9092fcmshec52d2dd2019ed7p155937jsn7fd31bbc1221',
                    'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
                }
            };

            
    
            try {
                const response = await fetch(url, options);
                const result = await response.json();
                console.log(result);
                home.classList.add('d-none');
                detail.classList.remove('d-none');            

                detail.innerHTML = `
                <section class="header d-flex justify-content-between align-items-center">
            <h1>Game Deatil</h1>
            <i class="fa-solid fa-xmark text-secondary" id="close-btn"></i>
          </section>
          <section class="main-game-detail d-flex flex-wrap my-5">
            <section class="image-container">
              <img src="${result.thumbnail}" width="100%" alt="game">
            </section>
            <section class="main-content-container pt-3 pt-lg-0 ps-lg-3">
              <section class="main-content text-start">
                <p class="lead">Title: ${result.title}</p>
                <p class="lead">Category: <span class="badge bg-info">${result.genre}</span></p>
                <p class="lead">Platefrom: <span class="badge bg-info">${result.platform}</span></p>
                <p class="lead">Status: <span class="badge bg-info">${result.status}</span></p>
                <p class="lead">${result.description}</p>
                <a href="${result.freetogame_profile_url}" class="btn btn-outline-warning">Show Game</a>
              </section>
            </section>
          </section>
                `;

                

const closeDetail = document.querySelector('#close-btn');
closeDetail.addEventListener('click', ()=>{
    home.classList.remove('d-none');
            detail.classList.add('d-none'); 
});
                
            } catch (error) {
                console.error(error);
            } 
        });
    }
}



function clickLinks(){
    for(let i=0; i<links.length; i++){
        links[i].addEventListener('click',async ()=>{
            for(let i=0; i<links.length; i++){
                links[i].classList.remove('active');
            }
            links[i].classList.add('active');
              
    const url = `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${links[i].innerHTML}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '244f9092fcmshec52d2dd2019ed7p155937jsn7fd31bbc1221',
            'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };
    
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
        
        showGames(result)
        
    } catch (error) {
        console.error(error);
    } 
        });
    }
}

display();
clickLinks();
