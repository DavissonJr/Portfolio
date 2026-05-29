// Data
const skillsMatrix = [
  "HTML5", "CSS3/Tailwind", "JavaScript/TS", "React", "Vue.js", "Angular",
  "C#/.NET", "SQL/Postgres", "Git", "Docker", "Azure/AWS", "Node.js"
];

const terminalLogs = [
  { title: "FRONTEND_ENGINEER", period: "2+ YEARS", desc: "React, Vue, Angular // Reactive interfaces // State management" },
  { title: "BACKEND_ARCHITECT", period: "1+ YEAR", desc: "C#/.NET, REST APIs, Entity Framework, SQL Server" },
  { title: "UI/UX_DESIGNER", period: "1 YEAR", desc: "Figma, design systems, prototyping, user research" },
  { title: "DEVOPS_INIT", period: "6 MONTHS", desc: "Docker, CI/CD pipelines, Git workflows, cloud basics" }
];

const projectsData = [
  { img: "imgs/quiz.png", name: "KiQuiz", desc: "React + Gemini AI quiz application", demo: "https://study-app-ia.vercel.app/", repo: "https://github.com/DavissonJr/KiQuiz-IA" },
  { img: "imgs/delicioushotdog.png", name: "HotDog Simulator", desc: "Vue.js restaurant with CRUD", demo: "https://www.instagram.com/p/DEQsqwNK3ab/", repo: "https://github.com/DavissonJr/delicioushotdog" },
  { img: "imgs/animefindpic.png", name: "AnimeFind", desc: "Search anime with Jikan API", demo: "https://animefind.vercel.app/", repo: "https://github.com/DavissonJr/animefind" },
  { img: "imgs/memorygame.png", name: "Memory Game", desc: "One Piece themed memory game", demo: "https://onepiece-memorygame.vercel.app/", repo: "https://github.com/DavissonJr/Memory-Game" },
  { img: "imgs/hrsystem.png", name: "HR System", desc: "Fullstack .NET management system", repo: "https://github.com/DavissonJr/hr-management-system" },
  { img: "imgs/todolist.png", name: "Todo List", desc: "Vue.js task manager", demo: "https://todo-vuejs-peach.vercel.app/", repo: "https://github.com/DavissonJr/todo-vuejs" },
  { img: "imgs/api.png", name: "Courses API", desc: ".NET REST API for courses", repo: "https://github.com/DavissonJr/api-gerenciamento-cursos" },
  { img: "imgs/incometracker.png", name: "Income Tracker", desc: "Finance management with Vue.js", demo: "https://controle-de-financas-seven.vercel.app/", repo: "https://github.com/DavissonJr/Controle-de-Financas" }
];

// Translations
const translations = {
  en: { 
    aboutDesc: "Full-stack engineer & digital architect. Building the future one line of code at a time.", 
    copyright: "ROOT_ACCESS_GRANTED" 
  },
  pt: { 
    aboutDesc: "Engenheiro full-stack & arquiteto digital. Construindo o futuro uma linha de codigo por vez.", 
    copyright: "ACESSO_ROOT_AUTORIZADO" 
  }
};

let currentLang = localStorage.getItem("lang") || "en";

// Render Functions
function renderMatrix() {
  const container = document.getElementById("matrixGrid");
  if (container) {
    container.innerHTML = skillsMatrix.map(s => `<div class="matrix-node">${s}</div>`).join('');
  }
}

function renderTimeline() {
  const container = document.getElementById("timelineTerminal");
  if (container) {
    container.innerHTML = terminalLogs.map(log => `
      <div class="terminal-log">
        <span class="log-prompt">$></span> <span class="log-title">${log.title}</span><br/>
        <span style="color:#ff00c6;">[${log.period}]</span><br/>
        <span style="color:#8892b0;">${log.desc}</span>
      </div>
    `).join('');
  }
}

function renderProjects() {
  const container = document.getElementById("projectHologrid");
  if (container) {
    container.innerHTML = projectsData.map(p => `
      <div class="holo-card-node">
        <img src="${p.img}" alt="${p.name}" onerror="this.src='https://placehold.co/400x160/0a0a0f/00ff9d?text=${p.name}'">
        <div class="holo-content">
          <h3>${p.name}</h3>
          <p>${p.desc}</p>
          <div class="holo-buttons">
            ${p.demo ? `<button class="holo-btn demo-btn" data-url="${p.demo}">[DEMO]</button>` : ''}
            <button class="holo-btn repo-btn" data-url="${p.repo}">[REPO]</button>
          </div>
        </div>
      </div>
    `).join('');
    
    document.querySelectorAll('.demo-btn, .repo-btn').forEach(btn => {
      btn.addEventListener('click', (e) => { 
        e.stopPropagation(); 
        window.open(btn.dataset.url, '_blank'); 
      });
    });
  }
}

function renderProduction() {
  const container = document.getElementById("productionNode");
  if (container) {
    container.innerHTML = `
      <div class="production-node">
        <h2>QUILOMBO SERDAO DO MOXOTO</h2>
        <p>CNPq research project · Quilombola heritage & territorial rights</p>
        <button id="visitProdNode" class="cyber-btn primary" style="margin-top:1.5rem;">[ CONNECT ]</button>
      </div>
    `;
    document.getElementById("visitProdNode")?.addEventListener('click', () => window.open('http://quilombosertaodomoxoto.com.br/', '_blank'));
  }
}

function renderContact() {
  const container = document.getElementById("contactGrid");
  if (container) {
    container.innerHTML = `
      <div class="contact-node" id="emailNode"><i class="fa-regular fa-envelope"></i><h4>EMAIL</h4><p>davissonbeat@gmail.com</p></div>
      <div class="contact-node" id="whatsNode"><i class="fa-brands fa-whatsapp"></i><h4>WHATSAPP</h4><p>+55 81 9653-3458</p></div>
    `;
    document.getElementById("emailNode")?.addEventListener('click', () => window.location.href = "mailto:davissonbeat@gmail.com");
    document.getElementById("whatsNode")?.addEventListener('click', () => window.open("https://wa.me/558196533458", "_blank"));
  }
}

function applyLanguage(lang) {
  const desc = document.getElementById("aboutDesc");
  const footer = document.getElementById("footerCopy");
  if (desc) desc.innerText = translations[lang].aboutDesc;
  if (footer) footer.innerText = translations[lang].copyright;
}

// Typing Animation
let typingInterval;
function startTerminalTyping() {
  const roles = ["Full-Stack Engineer", "Digital Architect", "Creative Coder", "Problem Solver"];
  let roleIdx = 0, charIdx = 0;
  const output = document.getElementById("terminalTyping");
  if (!output) return;
  
  function type() {
    if (charIdx < roles[roleIdx].length) {
      output.textContent += roles[roleIdx].charAt(charIdx);
      charIdx++;
      setTimeout(type, 70);
    } else {
      setTimeout(() => {
        let removing = setInterval(() => {
          if (output.textContent.length > 0) {
            output.textContent = output.textContent.slice(0, -1);
          } else {
            clearInterval(removing);
            roleIdx = (roleIdx + 1) % roles.length;
            charIdx = 0;
            type();
          }
        }, 40);
      }, 2500);
    }
  }
  type();
}

// DateTime
function updateDateTime() {
  const now = new Date();
  const datetimeEl = document.getElementById("datetime");
  if (datetimeEl) {
    datetimeEl.innerText = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  }
}
setInterval(updateDateTime, 1000);

// Theme Toggle
let isNeon = true;
function initTheme() {
  const themeBtn = document.getElementById("cyberTheme");
  themeBtn?.addEventListener("click", () => {
    isNeon = !isNeon;
    document.body.style.background = isNeon ? "#0a0a0f" : "#1a1a2e";
  });
}

// Mobile Menu
function initMobile() {
  const trigger = document.getElementById("mobileTrigger");
  const sidebar = document.getElementById("cyberSidebar");
  trigger?.addEventListener("click", () => sidebar.classList.toggle("mobile-open"));
  document.querySelectorAll(".cyber-link").forEach(link => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 900) sidebar.classList.remove("mobile-open");
    });
  });
}

// Active Nav on Scroll
function initActiveNav() {
  const sections = document.querySelectorAll(".cyber-section");
  const navLinks = document.querySelectorAll(".cyber-link");
  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
      const top = section.offsetTop - 200;
      if (window.scrollY >= top) current = section.getAttribute("id");
    });
    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("data-section") === current) link.classList.add("active");
    });
  });
}

// Social & Contact
function initSocial() {
  document.getElementById("gitNode")?.addEventListener("click", () => window.open("https://github.com/davissonjr", "_blank"));
  document.getElementById("liNode")?.addEventListener("click", () => window.open("https://www.linkedin.com/in/d%C3%A1visson-falc%C3%A3o-602132321/", "_blank"));
  document.getElementById("xNode")?.addEventListener("click", () => window.open("https://x.com/davissonjr", "_blank"));
  document.getElementById("cyberContactBtn")?.addEventListener("click", () => document.getElementById("contact").scrollIntoView({ behavior: "smooth" }));
}

// Language Switcher
function initLanguage() {
  document.querySelectorAll(".cyber-lang-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const lang = btn.getAttribute("data-lang");
      currentLang = lang;
      localStorage.setItem("lang", lang);
      applyLanguage(lang);
      document.querySelectorAll(".cyber-lang-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
    });
    if (btn.getAttribute("data-lang") === currentLang) btn.classList.add("active");
  });
}

// Initialize Everything
document.addEventListener("DOMContentLoaded", () => {
  renderMatrix();
  renderTimeline();
  renderProjects();
  renderProduction();
  renderContact();
  applyLanguage(currentLang);
  startTerminalTyping();
  updateDateTime();
  initTheme();
  initMobile();
  initActiveNav();
  initSocial();
  initLanguage();
});