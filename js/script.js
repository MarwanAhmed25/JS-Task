
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

input.addEventListener('input', ()=>{
    getData(input.value);
})