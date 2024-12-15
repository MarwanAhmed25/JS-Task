const apiKey = '4557a25e1df34627b9f112239241112';
const baseApi = 'http://api.weatherapi.com/v1/forecast.json';
const containerDiv = document.querySelector('.days');
const monthNames = [
    "January", "February", "March", "April", "May", 
    "June", "July", "August", "September", "October", 
    "November", "December"
];
const dayNames = [
    "Sunday", "Monday", "Tuesday", "Wednesday", 
    "Thursday", "Friday", "Saturday"
];

const navBarBtn = document.querySelector('.navbar-toggler');
const nav = document.querySelector('nav');
const input = document.querySelector('input');


async function getData(city='cairo'){
    const res = await fetch(`${baseApi}?key=${apiKey}&q=${city}&days=3`).then((res)=>{
        return res.json();
    });
    let today = new Date()
    
    let ele = `<section class="one flex-lg-grow-1 text-secondary mx-auto pb-3 text-start">
                    <p class="lead text-light px-4 py-2 first w-100 d-flex justify-content-between"><span>${dayNames[today.getDay()]}</span><span>${today.getDate()} ${monthNames[today.getMonth()]}</span></p>
                    <p class="lead  px-4 py-2">${res.location.name}</p>
                    <p class="lead  px-4 py-2 h1 text-white">${res.current.feelslike_c}</p>
                    <p class="lead  px-4 py-2 h6 text-secondry"><i class="fa-regular fa-sun" style="color: #FFD43B;"></i></p>
                    <p class=" px-4 py-2 text-info lead">${res.current.condition.text}</p>
                    <p class=" px-4 py-2">
                        <span class="pe-2"><i class="fa-solid fa-umbrella"></i> 20%</span>
                        <span class="pe-2"><i class="fa-solid fa-wind"></i> ${res.current.wind_kph} km/h</span>
                        <span class="pe-2"><i class="fa-regular fa-compass"></i> ${res.current.wind_dir}</span>
                    </p>
                </section>
                <section class="two flex-lg-grow-1 text-secondary mx-auto pb-3">
                    <p class="second lead text-light  px-4 py-2">${dayNames[today.getDay()+1]}</p>
                    <p class="lead px-4 py-2"><i class="fa-regular fa-sun" style="color: #FFD43B;"></i></p>
                    <p class="lead h1 px-4 py-2 text-white">${res.forecast.forecastday[1].day.maxtemp_c} C</p>
                    <p class="lead h6 px-4 py-2 text-secondary">${res.forecast.forecastday[1].day.mintemp_c} C</p>
                   
                    <p class="text-info lead px-4 py-2">${res.forecast.forecastday[1].day.condition.text}</p>
                   
                </section>
                <section class="three flex-lg-grow-1 text-secondary mx-auto pb-3">
                    <p class="first lead text-light px-4 py-2">${dayNames[today.getDay()+2]}</p>
                    <p class="lead px-4 py-2"><i class="fa-regular fa-sun" style="color: #FFD43B;"></i></p>
                    <p class="lead px-4 py-2 h1 text-white">${res.forecast.forecastday[2].day.maxtemp_c} C</p>
                    <p class="lead px-4 py-2 h6 text-secondary">${res.forecast.forecastday[2].day.mintemp_c} C</p>
                    
                    <p class=" px-4 py-2 text-info lead">${res.forecast.forecastday[2].day.condition.text}</p>
                   
                </section>`;
        containerDiv.innerHTML = ele;
    
}
getData();


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

input.addEventListener('input', ()=>{
    getData(input.value);
})