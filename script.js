// script.js - Complete with all functionality
const translations = {
  en: {
    about: "About",
    skills: "Skills",
    experience: "Experience",
    projects: "Projects",
    production: "Production",
    contact: "Contact",
    visitGithub: "Visit GitHub",
    hiIm: "Hello, I'm",
    aboutPara: "I am a passionate full-stack developer with expertise in JavaScript, TypeScript, React, C#, .NET, Vue.js and Angular. I create responsive web applications and secure APIs with clean, maintainable code.",
    role: "Full-Stack Developer",
    download: "Download CV",
    contactMe: "Contact Me",
    frontend: "Front-End",
    frontendYears: "2+ Years",
    frontendText: "Expert in React, Vue, Angular with responsive design.",
    backend: "Back-End",
    backendYears: "1+ Year",
    backendText: "C#/.NET, APIs, SQL Server, PostgreSQL, Entity Framework.",
    design: "UI/UX Design",
    designYears: "1 Year",
    designText: "Figma, Canva, modern interface design principles.",
    devops: "DevOps",
    devopsYears: "6 Months",
    devopsText: "Docker, Git, Linux, Cloud fundamentals.",
    kiQuiz: "KiQuiz",
    kiQuizText: "React quiz app with Gemini AI integration.",
    hotdog: "Delicious HotDog",
    hotdogText: "Vue.js restaurant simulator with CRUD operations.",
    animefind: "AnimeFind",
    animefindText: "Anime search using Jikan API v4.",
    memory: "One Piece Memory Game",
    memoryText: "Interactive memory game with JavaScript.",
    hr: "HR System",
    hrText: "Fullstack .NET + Vanilla JS management system.",
    todo: "Todo List",
    todoText: "Task organizer built with Vue.js.",
    courses: "Courses API",
    coursesText: ".NET REST API for course management.",
    income: "Income Tracker",
    incomeText: "Finance management with Vue.js.",
    quilombo: "Quilombo Sertão do Moxotó",
    quilomboText: "CNPq institutional website for Quilombola communities research.",
    email: "Email",
    phone: "Phone",
    copyright: "© All Rights Reserved | Dávisson Falcão",
    liveDemo: "Live Demo",
    githubRepo: "GitHub",
    visitSite: "Visit Site"
  },
  pt: {
    about: "Sobre",
    skills: "Habilidades",
    experience: "Experiência",
    projects: "Projetos",
    production: "Produção",
    contact: "Contato",
    visitGithub: "Ver GitHub",
    hiIm: "Olá, eu sou",
    aboutPara: "Sou um desenvolvedor full-stack apaixonado com expertise em JavaScript, TypeScript, React, C#, .NET, Vue.js e Angular. Crio aplicações web responsivas e APIs seguras com código limpo e organizado.",
    role: "Desenvolvedor Full-Stack",
    download: "Baixar CV",
    contactMe: "Contate-me",
    frontend: "Front-End",
    frontendYears: "2+ Anos",
    frontendText: "Expert em React, Vue, Angular com design responsivo.",
    backend: "Back-End",
    backendYears: "1+ Ano",
    backendText: "C#/.NET, APIs, SQL Server, PostgreSQL, Entity Framework.",
    design: "UI/UX Design",
    designYears: "1 Ano",
    designText: "Figma, Canva, princípios de design de interfaces.",
    devops: "DevOps",
    devopsYears: "6 Meses",
    devopsText: "Docker, Git, Linux, fundamentos de Cloud.",
    kiQuiz: "KiQuiz",
    kiQuizText: "App de quiz React com integração Gemini AI.",
    hotdog: "Delicious HotDog",
    hotdogText: "Simulador de restaurante Vue.js com CRUD.",
    animefind: "AnimeFind",
    animefindText: "Busca de animes usando Jikan API v4.",
    memory: "One Piece Jogo da Memória",
    memoryText: "Jogo da memória interativo com JavaScript.",
    hr: "Sistema RH",
    hrText: "Sistema fullstack .NET + Vanilla JS.",
    todo: "Lista de Tarefas",
    todoText: "Organizador de tarefas com Vue.js.",
    courses: "API de Cursos",
    coursesText: "API REST .NET para gerenciamento de cursos.",
    income: "Rastreador de Renda",
    incomeText: "Gestão financeira com Vue.js.",
    quilombo: "Quilombo Sertão do Moxotó",
    quilomboText: "Site institucional do CNPq para pesquisa de comunidades quilombolas.",
    email: "Email",
    phone: "Telefone",
    copyright: "© Todos os Direitos Reservados | Dávisson Falcão",
    liveDemo: "Demonstração",
    githubRepo: "GitHub",
    visitSite: "Visitar Site"
  }
};

let currentLang = localStorage.getItem('lang') || 'en';

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  
  document.querySelectorAll('.nav-links a, footer ul li a').forEach(el => {
    const key = el.getAttribute('href')?.substring(1);
    if(key && translations[lang][key]) el.textContent = translations[lang][key];
  });
  
  document.getElementById('visit-btn').textContent = translations[lang].visitGithub;
  document.querySelector('#about .info-box h3').textContent = translations[lang].hiIm;
  document.querySelector('#about .info-box p').textContent = translations[lang].aboutPara;
  document.querySelector('#about .info-box span').textContent = translations[lang].role;
  document.querySelector('.btn a').textContent = translations[lang].download;
  document.getElementById('contactBtn').textContent = translations[lang].contactMe;
  
  const cards = document.querySelectorAll('.grid-card');
  const texts = ['frontend', 'backend', 'design', 'devops'];
  cards.forEach((card, i) => {
    if(texts[i]) {
      card.querySelector('span').textContent = translations[lang][texts[i]];
      card.querySelector('h3').textContent = translations[lang][`${texts[i]}Years`];
      card.querySelector('p').textContent = translations[lang][`${texts[i]}Text`];
    }
  });
  
  const projects = ['kiQuiz', 'hotdog', 'animefind', 'memory', 'hr', 'todo', 'courses', 'income'];
  document.querySelectorAll('.project-card:not(.production-card)').forEach((card, i) => {
    if(projects[i]) {
      card.querySelector('h3').textContent = translations[lang][projects[i]];
      card.querySelector('p').textContent = translations[lang][`${projects[i]}Text`];
    }
  });
  
  const prodCard = document.querySelector('.production-card');
  if(prodCard) {
    prodCard.querySelector('h3').textContent = translations[lang].quilombo;
    prodCard.querySelector('p').textContent = translations[lang].quilomboText;
  }
  
  document.querySelectorAll('.card-contact h4').forEach((el, i) => {
    el.textContent = i === 0 ? translations[lang].email : translations[lang].phone;
  });
  
  document.querySelector('.copyright').textContent = translations[lang].copyright;
  
  document.querySelectorAll('.btn-group .btn').forEach(btn => {
    const text = btn.textContent;
    if(text === 'Live Demo' || text === 'Demonstração') btn.textContent = translations[lang].liveDemo;
    if(text === 'GitHub Repo' || text === 'GitHub') btn.textContent = translations[lang].githubRepo;
  });
}

function initDarkMode() {
  const dark = localStorage.getItem('darkMode') === 'true';
  if(dark) document.body.classList.add('dark');
  const btn = document.getElementById('theme-toggle');
  btn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    localStorage.setItem('darkMode', document.body.classList.contains('dark'));
  });
}

function initMobileMenu() {
  const menu = document.getElementById('menu-icon');
  const nav = document.querySelector('.nav-links');
  menu.addEventListener('click', () => nav.classList.toggle('active'));
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => nav.classList.remove('active'));
  });
}

function initLinks() {
  const links = {
    'github-icon': 'https://github.com/davissonjr',
    'linkedin-icon': 'https://www.linkedin.com/in/d%C3%A1visson-falc%C3%A3o-602132321/',
    'visit-btn': 'https://github.com/davissonjr',
    'contactBtn': 'mailto:davissonbeat@gmail.com',
    'repo-1': 'https://github.com/DavissonJr/Controle-de-Financas',
    'memogame-repo': 'https://github.com/DavissonJr/Memory-Game',
    'repo-3': 'https://github.com/DavissonJr/todo-vuejs',
    'demo-1': 'https://controle-de-financas-seven.vercel.app/',
    'demo-memo': 'https://onepiece-memorygame.vercel.app/',
    'demo-3': 'https://todo-vuejs-peach.vercel.app/',
    'demo-quiz': 'https://study-app-ia.vercel.app/',
    'repo-quiz': 'https://github.com/DavissonJr/KiQuiz-IA',
    'repo-apic': 'https://github.com/DavissonJr/api-gerenciamento-cursos',
    'repo-hr': 'https://github.com/DavissonJr/hr-management-system',
    'repo-anime': 'https://github.com/DavissonJr/animefind',
    'demo-anime': 'https://animefind.vercel.app/',
    'repo-hotdog': 'https://github.com/DavissonJr/delicioushotdog',
    'demo-hotdog': 'https://www.instagram.com/p/DEQsqwNK3ab/',
    'visit-production': 'http://quilombosertaodomoxoto.com.br/'
  };
  
  Object.keys(links).forEach(id => {
    const el = document.getElementById(id);
    if(el) el.addEventListener('click', () => window.open(links[id], '_blank'));
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initDarkMode();
  initMobileMenu();
  initLinks();
  
  document.getElementById('lang-en').addEventListener('click', () => {
    setLanguage('en');
    document.getElementById('lang-en').classList.add('active');
    document.getElementById('lang-pt').classList.remove('active');
  });
  
  document.getElementById('lang-pt').addEventListener('click', () => {
    setLanguage('pt');
    document.getElementById('lang-pt').classList.add('active');
    document.getElementById('lang-en').classList.remove('active');
  });
  
  setLanguage(currentLang);
  if(currentLang === 'en') {
    document.getElementById('lang-en').classList.add('active');
  } else {
    document.getElementById('lang-pt').classList.add('active');
  }
});