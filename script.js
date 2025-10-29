const translations = {
    en: {
      title: 'Portfolio - Dávisson',
      about: 'About',
      experience: 'Experience',
      projects: 'Projects',
      contact: 'Contact',
      visitGithub: 'Visit Github',
      hiIm: "Hi, I'm",
      aboutParagraph: "I am a passionate full-stack developer with a strong focus on creating responsive, user-friendly web applications, and secure, performatic API's. With expertise in JavaScript, TypeScript, React, C#, all the .NET environment and modern frameworks like Vue.js and Angular. I enjoy solving complex problems through clean, maintainable code and continuously exploring new technologies to enhance my skills. Check out some of the projects I've worked on below!",
      fullStackDeveloper: 'Full-Stack Developer',
      downloadCV: 'Download CV',
      frontend: 'Front-End Development',
      twoYears: '2 Years',
      frontendParagraph: 'A skilled Frontend Developer experienced in building responsive, user-friendly web applications using HTML, CSS, JavaScript, TypeScript, React, Bootstrap, Tailwind, and modern frameworks like Angular and Vue.',
      backend: 'Back-End Development',
      oneYear: '1 Year',
      backendParagraph: "I've started to study about back-end when I was an Intern at Elógica, developing web API's with C#, using Dapper & Entity Framework, applying all of SOLID principles, experienced modeling SQL databases, using SQL Server & Postgres.",
      webDesigner: 'Web Designer',
      webDesignerParagraph: 'In Front-End Development, knowledge about Graphic Design is very important, I have a solid knowledge using Figma and Canva.',
      devops: 'Devops',
      sixMonths: '6 Months',
      devopsParagraph: "I'm a Git admirer and this makes me interested about Devops segments like Docker, Linux, Cloud and Networks, I'm studying all of the fundamentals and I love it, Devops is really amazing.",
      recentProjects: 'Recent Projects',
      kiQuizTitle: 'KiQuiz',
      kiQuizParagraph: 'A Quiz Application developed in React, integrated with Gemini API to fetch dynamic questions and evaluate user answers.',
      deliciousHotDogTitle: 'Delicious HotDog',
      deliciousHotDogParagraph: 'A Vue.js project simulating a hot dog restaurant, where users customize orders and manage menu data via json-server with CRUD operations.',
      animeFindTitle: 'AnimeFind',
      animeFindParagraph: 'You can search for detailed information about anime, view images and navigate in a simple and practical way. Developed in Vue.js, using Jikan API v4 and SCSS',
      memoryGameTitle: 'One Piece - Memory Game',
      memoryGameParagraph: "A One Piece memory game, in this project I've learned a lot about JS and CSS",
      hrSystemTitle: 'HR Management System',
      hrSystemParagraph: 'A HR System, fullstack project using Vanilla JS, C# (.NET) and SQL Server, the API allows me to add employees and companies',
      todoListTitle: 'Todo List',
      todoListParagraph: 'A Todo List to organize your pending issues',
      coursesApiTitle: 'Courses Management API',
      coursesApiParagraph: 'A Courses management API developed in .NET, that allows me to add courses, students, teachers and relate all of them.',
      incomeTrackerTitle: 'Income Tracker',
      incomeTrackerParagraph: 'A finance management application made using Vue.js',
      contactMe: 'Contact Me',
      email: 'Email',
      phone: 'Phone',
      copyright: '© All Rights Reserved | Dávisson Falcão',
      liveDemo: 'Live Demo',
      videoDemo: 'Video Demo',
      githubRepo: 'Github Repo'
    },
    pt: {
      title: 'Portfólio - Dávisson',
      about: 'Sobre',
      experience: 'Experiência',
      projects: 'Projetos',
      contact: 'Contato',
      visitGithub: 'Visitar Github',
      hiIm: 'Oi, eu sou',
      aboutParagraph: "Sou um desenvolvedor full-stack apaixonado com um forte foco em criar aplicações web responsivas e amigáveis ao usuário, e APIs seguras e performáticas. Com expertise em JavaScript, TypeScript, React, C#, todo o ambiente .NET e frameworks modernos como Vue.js e Angular. Gosto de resolver problemas complexos através de código limpo e manutenível e de explorar continuamente novas tecnologias para aprimorar minhas habilidades. Confira alguns dos projetos em que trabalhei abaixo!",
      fullStackDeveloper: 'Desenvolvedor Full-Stack',
      downloadCV: 'Baixar CV',
      frontend: 'Desenvolvimento Front-End',
      twoYears: '2 Anos',
      frontendParagraph: 'Um desenvolvedor Frontend habilidoso com experiência em construir aplicações web responsivas e amigáveis ao usuário usando HTML, CSS, JavaScript, TypeScript, React, Bootstrap, Tailwind e frameworks modernos como Angular e Vue.',
      backend: 'Desenvolvimento Back-End',
      oneYear: '1 Ano',
      backendParagraph: "Comecei a estudar back-end quando era estagiário na Elógica, desenvolvendo APIs web com C#, usando Dapper e Entity Framework, aplicando todos os princípios SOLID, experiente em modelar bancos de dados SQL, usando SQL Server e Postgres.",
      webDesigner: 'Designer Web',
      webDesignerParagraph: 'No Desenvolvimento Front-End, conhecimento sobre Design Gráfico é muito importante, tenho um sólido conhecimento usando Figma e Canva.',
      devops: 'DevOps',
      sixMonths: '6 Meses',
      devopsParagraph: "Sou um admirador do Git e isso me faz interessar por segmentos de DevOps como Docker, Linux, Cloud e Redes, estou estudando todos os fundamentos e adoro, DevOps é realmente incrível.",
      recentProjects: 'Projetos Recentes',
      kiQuizTitle: 'KiQuiz',
      kiQuizParagraph: 'Uma Aplicação de Quiz desenvolvida em React, integrada com a API Gemini para buscar perguntas dinâmicas e avaliar respostas do usuário.',
      deliciousHotDogTitle: 'Delicious HotDog',
      deliciousHotDogParagraph: 'Um projeto Vue.js simulando um restaurante de hot dog, onde usuários personalizam pedidos e gerenciam dados do menu via json-server com operações CRUD.',
      animeFindTitle: 'AnimeFind',
      animeFindParagraph: 'Você pode buscar informações detalhadas sobre animes, ver imagens e navegar de forma simples e prática. Desenvolvido em Vue.js, usando Jikan API v4 e SCSS',
      memoryGameTitle: 'One Piece - Jogo da Memória',
      memoryGameParagraph: 'Um jogo da memória de One Piece, nesse projeto aprendi muito sobre JS e CSS',
      hrSystemTitle: 'Sistema de Gerenciamento de RH',
      hrSystemParagraph: 'Um Sistema de RH, projeto fullstack usando Vanilla JS, C# (.NET) e SQL Server, a API permite adicionar funcionários e empresas',
      todoListTitle: 'Lista de Tarefas',
      todoListParagraph: 'Uma Lista de Tarefas para organizar suas pendências',
      coursesApiTitle: 'API de Gerenciamento de Cursos',
      coursesApiParagraph: 'Uma API de gerenciamento de cursos desenvolvida em .NET, que permite adicionar cursos, estudantes, professores e relacioná-los todos.',
      incomeTrackerTitle: 'Rastreador de Renda',
      incomeTrackerParagraph: 'Uma aplicação de gerenciamento de finanças feita usando Vue.js',
      contactMe: 'Contate-me',
      email: 'Email',
      phone: 'Telefone',
      copyright: '© Todos os Direitos Reservados | Dávisson Falcão',
      liveDemo: 'Demonstração Ao Vivo',
      videoDemo: 'Demo em Vídeo',
      githubRepo: 'Repositório Github'
    }
  };
  
  function setLanguage(lang) {
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;
    document.title = translations[lang].title;
  
    // Nav and footer links
    document.querySelectorAll('a[href="#about"]').forEach(el => el.innerText = translations[lang].about);
    document.querySelectorAll('a[href="#experience"]').forEach(el => el.innerText = translations[lang].experience);
    document.querySelectorAll('a[href="#projects"]').forEach(el => el.innerText = translations[lang].projects);
    document.querySelectorAll('a[href="#contact"]').forEach(el => el.innerText = translations[lang].contact);
  
    // Header button
    document.getElementById('visit-btn').innerText = translations[lang].visitGithub;
  
    // About section
    document.querySelector('#about h3').innerText = translations[lang].hiIm;
    document.querySelector('#about p').innerText = translations[lang].aboutParagraph;
    document.querySelector('#about span').innerText = translations[lang].fullStackDeveloper;
    document.querySelector('a[download]').innerText = translations[lang].downloadCV;
    document.getElementById('contactBtn').innerText = translations[lang].contact;
  
    // Experience section
    document.querySelector('#experience .section-title').innerText = translations[lang].experience;
    const gridCards = document.querySelectorAll('.grid-card');
    gridCards[0].querySelector('span').innerText = translations[lang].frontend;
    gridCards[0].querySelector('h3').innerText = translations[lang].twoYears;
    gridCards[0].querySelector('p').innerText = translations[lang].frontendParagraph;
    gridCards[1].querySelector('span').innerText = translations[lang].backend;
    gridCards[1].querySelector('h3').innerText = translations[lang].oneYear;
    gridCards[1].querySelector('p').innerText = translations[lang].backendParagraph;
    gridCards[2].querySelector('span').innerText = translations[lang].webDesigner;
    gridCards[2].querySelector('h3').innerText = translations[lang].oneYear;
    gridCards[2].querySelector('p').innerText = translations[lang].webDesignerParagraph;
    gridCards[3].querySelector('span').innerText = translations[lang].devops;
    gridCards[3].querySelector('h3').innerText = translations[lang].sixMonths;
    gridCards[3].querySelector('p').innerText = translations[lang].devopsParagraph;
  
    // Projects section
    document.querySelector('#projects .section-title').innerText = translations[lang].recentProjects;
    const projectCards = document.querySelectorAll('.project-card');
    projectCards[0].querySelector('h3').innerText = translations[lang].kiQuizTitle;
    projectCards[0].querySelector('p').innerText = translations[lang].kiQuizParagraph;
    projectCards[1].querySelector('h3').innerText = translations[lang].deliciousHotDogTitle;
    projectCards[1].querySelector('p').innerText = translations[lang].deliciousHotDogParagraph;
    projectCards[2].querySelector('h3').innerText = translations[lang].animeFindTitle;
    projectCards[2].querySelector('p').innerText = translations[lang].animeFindParagraph;
    projectCards[3].querySelector('h3').innerText = translations[lang].memoryGameTitle;
    projectCards[3].querySelector('p').innerText = translations[lang].memoryGameParagraph;
    projectCards[4].querySelector('h3').innerText = translations[lang].hrSystemTitle;
    projectCards[4].querySelector('p').innerText = translations[lang].hrSystemParagraph;
    projectCards[5].querySelector('h3').innerText = translations[lang].todoListTitle;
    projectCards[5].querySelector('p').innerText = translations[lang].todoListParagraph;
    projectCards[6].querySelector('h3').innerText = translations[lang].coursesApiTitle;
    projectCards[6].querySelector('p').innerText = translations[lang].coursesApiParagraph;
    projectCards[7].querySelector('h3').innerText = translations[lang].incomeTrackerTitle;
    projectCards[7].querySelector('p').innerText = translations[lang].incomeTrackerParagraph;
  
    // Project buttons
    document.getElementById('demo-quiz').innerText = translations[lang].liveDemo;
    document.getElementById('repo-quiz').innerText = translations[lang].githubRepo;
    document.getElementById('demo-hotdog').innerText = translations[lang].videoDemo;
    document.getElementById('repo-hotdog').innerText = translations[lang].githubRepo;
    document.getElementById('demo-anime').innerText = translations[lang].liveDemo;
    document.getElementById('repo-anime').innerText = translations[lang].githubRepo;
    document.getElementById('demo-memo').innerText = translations[lang].liveDemo;
    document.getElementById('memogame-repo').innerText = translations[lang].githubRepo;
    document.getElementById('repo-hr').innerText = translations[lang].githubRepo;
    document.getElementById('demo-3').innerText = translations[lang].liveDemo;
    document.getElementById('repo-3').innerText = translations[lang].githubRepo;
    document.getElementById('repo-apic').innerText = translations[lang].githubRepo;
    document.getElementById('demo-1').innerText = translations[lang].liveDemo;
    document.getElementById('repo-1').innerText = translations[lang].githubRepo;
  
    // Contact section
    document.querySelector('#contact .section-title').innerText = translations[lang].contactMe;
    const contactCards = document.querySelectorAll('.card-contact');
    contactCards[0].querySelector('h4').innerText = translations[lang].email;
    contactCards[1].querySelector('h4').innerText = translations[lang].phone;
  
    // Footer
    document.querySelector('.copyright').innerText = translations[lang].copyright;
  }
  
  // Inicializa o idioma
  let currentLang = localStorage.getItem('lang') || 'en';
  setLanguage(currentLang);
  document.getElementById(`lang-${currentLang}`).classList.add('active');
  
  // Handlers para botões de idioma
  const langBtns = document.querySelectorAll('.lang-btn');
  langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.id.split('-')[1];
      if (lang !== currentLang) {
        setLanguage(lang);
        langBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentLang = lang;
      }
    });
  });
  
  // Código original continua abaixo
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
  
  
  document.getElementById("demo-quiz").addEventListener('click', ()=>{
      window.open("https://study-app-ia.vercel.app/", "_blank");
  });
  
  
  document.getElementById("repo-quiz").addEventListener('click', ()=>{
      window.open("https://github.com/DavissonJr/KiQuiz-IA", "_blank");
  });
  
  
  document.getElementById("repo-apic").addEventListener('click', ()=>{
      window.open("https://github.com/DavissonJr/api-gerenciamento-cursos", "_blank");
  });
  
  
  document.getElementById("repo-hr").addEventListener('click', ()=>{
      window.open("https://github.com/DavissonJr/hr-management-system", "_blank");
  });
  
  document.getElementById("repo-anime").addEventListener('click', ()=>{
      window.open("https://github.com/DavissonJr/animefind", "_blank");
  });
  
  document.getElementById("demo-anime").addEventListener('click', ()=>{
      window.open("https://animefind.vercel.app/", "_blank");
  });
  
  document.getElementById("repo-hotdog").addEventListener('click', ()=>{
      window.open("https://github.com/DavissonJr/delicioushotdog", "_blank");
  });
  
  document.getElementById("demo-hotdog").addEventListener('click', ()=>{
      window.open("https://www.instagram.com/p/DEQsqwNK3ab/", "_blank");
  });