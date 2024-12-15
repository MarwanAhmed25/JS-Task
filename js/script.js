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

// Fetch weather data for a given city
async function getData(city = 'Cairo') {
    try {
        const response = await fetch(`${baseApi}?key=${apiKey}&q=${city}&days=3`);
        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
        const res = await response.json();

        // Render the weather data
        renderWeatherData(res);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        containerDiv.innerHTML = `<p class="text-danger">Failed to fetch weather data. Please try again.</p>`;
    }
}

// Render weather data dynamically
function renderWeatherData(data) {
    const today = new Date();

    // Generate sections for each forecast day
    const sections = data.forecast.forecastday.map((forecast, index) => {
        const dayIndex = (today.getDay() + index) % 7; // Wrap around week days
        const dayName = dayNames[dayIndex];
        const date = index === 0 ? `${today.getDate()} ${monthNames[today.getMonth()]}` : '';

        return `
            <section class="day flex-lg-grow-1 text-secondary mx-auto pb-3 text-start">
                <p class="lead text-light px-4 py-2 first w-100 d-flex justify-content-between">
                    <span>${dayName}</span><span>${date}</span>
                </p>
                <p class="lead px-4 py-2">${data.location.name}</p>
                <p class="lead px-4 py-2 h1 text-white">${index === 0 ? data.current.feelslike_c : forecast.day.maxtemp_c}°C</p>
                <p class="lead px-4 py-2 h6 text-secondary">${forecast.day.mintemp_c ? `${forecast.day.mintemp_c}°C` : ''}</p>
                <p class="lead px-4 py-2 text-info">${forecast.day.condition.text}</p>
                <p class="px-4 py-2">
                    <span class="pe-2"><i class="fa-solid fa-umbrella"></i> 20%</span>
                    <span class="pe-2"><i class="fa-solid fa-wind"></i> ${forecast.day.maxwind_kph} km/h</span>
                    <span class="pe-2"><i class="fa-regular fa-compass"></i> ${data.current.wind_dir}</span>
                </p>
            </section>`;
    });

    // Update the container with generated sections
    containerDiv.innerHTML = sections.join('');
}

// Toggle navbar visibility
navBarBtn.addEventListener('click', () => {
    const navBarLinks = document.querySelector('#navbarNav');
    const isExpanded = navBarLinks.classList.contains('show');

    navBarBtn.setAttribute('aria-expanded', !isExpanded);
    nav.style.paddingBottom = isExpanded ? '8px' : '350px';
    navBarLinks.classList.toggle('show');
});

// Handle input changes to fetch weather data for a new city
input.addEventListener('input', () => {
    const city = input.value.trim();
    if (city) getData(city);
});

// Fetch initial data for default city (Cairo)
getData();
