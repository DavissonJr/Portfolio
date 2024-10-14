const menuIcon = document.querySelector('#menu-icon');
const navLinks = document.querySelector('.nav-links');

menuIcon.onclick = () => {
    navLinks.classList.toggle('active');
}

document.getElementById("contactBtn").addEventListener("click", function() {
    window.location.href = "mailto:davissonbeat@gmail.com?subject=Contact%20Request&body=Hello%20there";
});

document.getElementById("github-icon").addEventListener('click', ()=>{
    window.open("https://github.com/davissonjr", "_blank");
});

document.getElementById("linkedin-icon").addEventListener('click', ()=>{
    window.open("https://www.linkedin.com/in/d%C3%A1visson-falc%C3%A3o-602132321/", "_blank");
});

document.getElementById("repo-1").addEventListener('click', ()=>{
    window.open("https://github.com/DavissonJr/Controle-de-Financas", "_blank");
});

document.getElementById("memogame-repo").addEventListener('click', ()=>{
    window.open("https://github.com/DavissonJr/Memory-Game", "_blank");
});

document.getElementById("repo-3").addEventListener('click', ()=>{
    window.open("https://github.com/DavissonJr/todo-vuejs", "_blank");
});

document.getElementById("demo-1").addEventListener('click', ()=>{
    window.open("https://controle-de-financas-seven.vercel.app/", "_blank");
});

document.getElementById("demo-memo").addEventListener('click', ()=>{
    window.open("https://onepiece-memorygame.vercel.app/", "_blank");
});

document.getElementById("demo-3").addEventListener('click', ()=>{
    window.open("https://todo-vuejs-peach.vercel.app/", "_blank");
});

document.getElementById("visit-btn").addEventListener('click', ()=>{
    window.open("https://github.com/davissonjr", "_blank");
});
