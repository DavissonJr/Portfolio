/* Dávisson Falcão — portfólio
   Tudo aqui é melhoria progressiva: sem JS (ou sem GSAP) o site continua legível. */

(() => {
  const root = document.documentElement;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(pointer: fine)").matches;
  const hasGsap = typeof window.gsap !== "undefined" && typeof window.ScrollTrigger !== "undefined";

  const store = {
    get(k) {
      try { return localStorage.getItem(k); } catch { return null; }
    },
    set(k, v) {
      try { localStorage.setItem(k, v); } catch {}
    },
  };
  const isPt = () => root.lang === "pt-BR";
  const t = (pt, en) => (isPt() ? pt : en);

  /* ---------------------------------------------------- idioma e tema --- */

  function applyTitle() {
    const v = root.dataset[isPt() ? "titlePt" : "titleEn"];
    if (v) document.title = v;
  }
  applyTitle();

  $$("[data-lang-toggle]").forEach((btn) => {
    btn.addEventListener("click", () => {
      root.lang = isPt() ? "en" : "pt-BR";
      store.set("lang", root.lang);
      applyTitle();
      document.dispatchEvent(new CustomEvent("langchange"));
      if (hasGsap) ScrollTrigger.refresh();
    });
  });

  $$("[data-theme-toggle]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const current =
        root.dataset.theme ||
        (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
      root.dataset.theme = current === "dark" ? "light" : "dark";
      store.set("theme", root.dataset.theme);
    });
  });

  /* ------------------------------------------------------------ relógio --- */

  const clocks = $$("[data-clock]");
  function tick() {
    const s = new Intl.DateTimeFormat("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "America/Recife",
    }).format(new Date());
    clocks.forEach((c) => (c.textContent = s));
  }
  if (clocks.length) {
    tick();
    setInterval(tick, 15000);
  }

  $$("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));

  /* ------------------------------------------------------------- header --- */

  const head = $(".head");
  let lastY = window.scrollY;
  function onScrollHead(y) {
    if (!head) return;
    head.classList.toggle("is-solid", y > 40);
    const goingDown = y > lastY && y > 240;
    if (!document.body.classList.contains("menu-open")) head.classList.toggle("is-hidden", goingDown);
    lastY = y;
  }

  const drawer = $(".drawer");
  const menuBtn = $(".menu-btn");
  function setMenu(open) {
    if (!drawer) return;
    drawer.classList.toggle("is-open", open);
    document.body.classList.toggle("menu-open", open);
    menuBtn?.setAttribute("aria-expanded", String(open));
    if (menuBtn) {
      $$("[data-menu-label]", menuBtn).forEach((s) => (s.textContent = open ? s.dataset.close : s.dataset.open));
    }
    if (lenis) open ? lenis.stop() : lenis.start();
  }
  menuBtn?.addEventListener("click", () => setMenu(!drawer.classList.contains("is-open")));
  drawer && $$("a", drawer).forEach((a) => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (e) => e.key === "Escape" && setMenu(false));

  /* -------------------------------------------------------- copiar e-mail --- */

  $$("[data-copy]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(btn.dataset.copy);
        const old = btn.innerHTML;
        btn.innerHTML = `<span>${t("Copiado ✓", "Copied ✓")}</span>`;
        setTimeout(() => (btn.innerHTML = old), 1800);
      } catch {
        window.location.href = "mailto:" + btn.dataset.copy;
      }
    });
  });

  /* ----------------------------------------------------- scroll suave --- */

  let lenis = null;
  if (!reduced && typeof window.Lenis !== "undefined") {
    lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1 });
    if (hasGsap) {
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    } else {
      const raf = (time) => {
        lenis.raf(time);
        requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);
    }
  }
  if (lenis) lenis.on("scroll", ({ scroll }) => onScrollHead(scroll));
  else window.addEventListener("scroll", () => onScrollHead(window.scrollY), { passive: true });

  // âncoras internas passam pelo Lenis
  $$('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (id.length < 2) return;
      const target = $(id);
      if (!target) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(target, { offset: -20, duration: 1.4 });
      else target.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
      history.replaceState(null, "", id);
    });
  });

  /* -------------------------------------------------- transição de página --- */

  const curtain = $(".curtain");
  function isInternal(a) {
    if (!a || a.target === "_blank" || a.hasAttribute("download")) return false;
    const href = a.getAttribute("href");
    if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return false;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin) return false;
    if (url.pathname === location.pathname && url.hash) return false;
    return /\.html?$|\/$/.test(url.pathname);
  }
  if (hasGsap && curtain && !reduced) {
    document.addEventListener("click", (e) => {
      const a = e.target.closest("a");
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
      if (!isInternal(a)) return;
      e.preventDefault();
      const label = a.dataset.curtain;
      $("span", curtain).textContent = label || "";
      try { sessionStorage.setItem("entering", "1"); } catch {}
      gsap.set(curtain, { visibility: "visible" });
      gsap.fromTo(curtain, { yPercent: 100 }, {
        yPercent: 0,
        duration: 0.75,
        ease: "power4.inOut",
        onComplete: () => (window.location.href = a.href),
      });
      gsap.fromTo($("span", curtain), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.3 });
    });
  }
  window.addEventListener("pageshow", (e) => {
    if (e.persisted && curtain) {
      root.classList.remove("is-entering");
      if (hasGsap) gsap.set(curtain, { yPercent: 100, visibility: "hidden" });
    }
  });

  function enterCurtain() {
    return new Promise((resolve) => {
      if (!root.classList.contains("is-entering") || !curtain) return resolve();
      if (!hasGsap) {
        root.classList.remove("is-entering");
        return resolve();
      }
      gsap.set(curtain, { yPercent: 0, visibility: "visible" });
      root.classList.remove("is-entering");
      gsap.to($("span", curtain), { opacity: 0, duration: 0.3 });
      gsap.to(curtain, {
        yPercent: -100,
        duration: 0.9,
        ease: "power4.inOut",
        delay: 0.1,
        onComplete: () => gsap.set(curtain, { yPercent: 100, visibility: "hidden" }),
      });
      setTimeout(resolve, 450);
    });
  }

  /* ------------------------------------------------------------- cursor --- */

  const cursor = $(".cursor");
  if (cursor && finePointer && hasGsap && !reduced) {
    root.classList.add("has-cursor");
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.35, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.35, ease: "power3" });
    window.addEventListener("pointermove", (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
    });
    const label = $("span", cursor);
    document.addEventListener("pointerover", (e) => {
      const big = e.target.closest("[data-cursor]");
      const link = e.target.closest("a, button, input, label, [role='button']");
      if (big) {
        label.textContent = isPt() ? big.dataset.cursor : big.dataset.cursorEn || big.dataset.cursor;
        cursor.classList.add("is-big");
        cursor.classList.remove("is-link");
      } else if (link) {
        cursor.classList.add("is-link");
        cursor.classList.remove("is-big");
      } else {
        cursor.classList.remove("is-big", "is-link");
      }
    });
    document.addEventListener("pointerleave", () => gsap.to(cursor, { opacity: 0, duration: 0.2 }));
    document.addEventListener("pointerenter", () => gsap.to(cursor, { opacity: 1, duration: 0.2 }));
  }

  /* ------------------------------------------------------------ animação --- */

  function setupMotion() {
    gsap.registerPlugin(ScrollTrigger);
    root.classList.add("anim");

    // revelações simples
    ScrollTrigger.batch($$("[data-reveal]").filter((el) => !el.closest("[data-intro]")), {
      start: "top 88%",
      once: true,
      onEnter: (els) =>
        gsap.to(els, { opacity: 1, y: 0, duration: 1.1, ease: "expo.out", stagger: 0.08, overwrite: true }),
    });

    // títulos em linhas (fora do hero, que tem intro própria)
    $$("[data-lines]").forEach((block) => {
      if (block.closest("[data-intro]")) return;
      gsap.to($$(".line > span", block), {
        y: 0,
        duration: 1.2,
        ease: "expo.out",
        stagger: 0.09,
        scrollTrigger: { trigger: block, start: "top 85%", once: true },
      });
    });

    // linhas que se desenham
    $$("[data-draw]").forEach((el) =>
      gsap.to(el, {
        scaleX: 1,
        duration: 1.4,
        ease: "expo.inOut",
        scrollTrigger: { trigger: el, start: "top 92%", once: true },
      })
    );

    // contadores
    $$("[data-count]").forEach((el) => {
      const to = parseFloat(el.dataset.count);
      const fmt = new Intl.NumberFormat("pt-BR");
      const obj = { v: 0 };
      el.textContent = "0";
      gsap.to(obj, {
        v: to,
        duration: 2,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
        onUpdate: () => (el.textContent = fmt.format(Math.round(obj.v))),
      });
    });

    // parallax leve em imagens
    $$("[data-parallax]").forEach((img) => {
      gsap.fromTo(
        img,
        { yPercent: -6 },
        {
          yPercent: 6,
          ease: "none",
          scrollTrigger: { trigger: img.parentElement, start: "top bottom", end: "bottom top", scrub: true },
        }
      );
    });

    // foto do hero cresce um pouco enquanto o nome sai de cena
    const heroName = $(".hero-name");
    if (heroName) {
      gsap.to(heroName, {
        yPercent: -12,
        ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
      });
    }

    // galeria horizontal fixa
    const gallery = $(".gallery");
    if (gallery && window.innerWidth > 860) {
      const track = $(".gallery-track", gallery);
      const dist = () => track.scrollWidth - window.innerWidth;
      gsap.to(track, {
        x: () => -dist(),
        ease: "none",
        scrollTrigger: {
          trigger: gallery,
          start: "center center",
          end: () => "+=" + dist(),
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });
    }

    // marquee guiado pela velocidade da rolagem
    $$(".marquee-track").forEach((track) => {
      let x = 0;
      let dir = -1;
      let boost = 0;
      const half = () => track.scrollWidth / 2;
      ScrollTrigger.create({
        trigger: track,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          dir = self.direction === 1 ? -1 : 1;
          boost = Math.min(Math.abs(self.getVelocity()) / 120, 18);
        },
      });
      gsap.ticker.add(() => {
        boost *= 0.92;
        x += dir * (0.6 + boost);
        const w = half();
        if (x <= -w) x += w;
        if (x > 0) x -= w;
        gsap.set(track, { x });
      });
    });

    // seção atual no menu
    $$(".nav a[href^='#']").forEach((a) => {
      const sec = $(a.getAttribute("href"));
      if (!sec) return;
      ScrollTrigger.create({
        trigger: sec,
        start: "top 50%",
        end: "bottom 50%",
        onToggle: (self) => a.setAttribute("aria-current", self.isActive ? "true" : "false"),
      });
    });
  }

  function intro() {
    const box = $("[data-intro]");
    if (!box) return;
    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
    tl.to($$(".line > span", box), { y: 0, duration: 1.4, stagger: 0.1 })
      .fromTo(
        ".hero-photo",
        { clipPath: "inset(50% 0% 50% 0% round 999px)" },
        { clipPath: "inset(0% 0% 0% 0% round 999px)", duration: 1.3, ease: "expo.inOut" },
        0.15
      )
      .from(".hero-photo img", { scale: 3, duration: 1.8 }, 0.15)
      .to($$("[data-reveal]", box), { opacity: 1, y: 0, duration: 1, stagger: 0.08 }, 0.5);
  }

  /* ---------------------------------------- prévia flutuante dos projetos --- */

  function setupPreview() {
    const preview = $(".preview");
    if (!preview || !finePointer || !hasGsap) return;
    const inner = $(".preview-inner", preview);
    const imgs = {};
    $$("[data-preview]").forEach((row) => {
      const src = row.dataset.preview;
      if (!imgs[src]) {
        const img = new Image();
        img.src = src;
        img.alt = "";
        img.decoding = "async";
        inner.appendChild(img);
        imgs[src] = img;
      }
    });
    const xTo = gsap.quickTo(preview, "x", { duration: 0.6, ease: "power3" });
    const yTo = gsap.quickTo(preview, "y", { duration: 0.6, ease: "power3" });
    const rTo = gsap.quickTo(preview, "rotation", { duration: 0.8, ease: "power3" });
    let lastX = 0;
    let visible = false;
    window.addEventListener("pointermove", (e) => {
      const w = preview.offsetWidth;
      const h = preview.offsetHeight;
      xTo(e.clientX - w / 2);
      yTo(e.clientY - h / 2);
      if (visible) rTo(Math.max(-8, Math.min(8, (e.clientX - lastX) * 0.5)));
      lastX = e.clientX;
    });
    $$("[data-preview]").forEach((row) => {
      row.addEventListener("pointerenter", () => {
        Object.values(imgs).forEach((i) => i.classList.remove("is-on"));
        imgs[row.dataset.preview].classList.add("is-on");
        visible = true;
        gsap.to(preview, { opacity: 1, scale: 1, duration: 0.5, ease: "power3.out", overwrite: "auto" });
      });
      row.addEventListener("pointerleave", () => {
        visible = false;
        gsap.to(preview, { opacity: 0, scale: 0.6, rotation: 0, duration: 0.4, ease: "power3.in", overwrite: "auto" });
      });
    });
  }

  /* ======================================================== widgets ===== */

  // Licitação: a cor muda por órgão, o contraste tem que continuar passando
  function widgetOrgao(el) {
    const orgaos = [
      { nome: "Câmara Municipal de Exemplo", sigla: "C", tipo: ["Câmara", "City Council"], primaria: "#00703a", forte: "#004d28", suave: "#e0f2e8", faixa: ["#d0102b", "#ffffff", "#00703a"] },
      { nome: "Prefeitura de Serra Azul", sigla: "P", tipo: ["Prefeitura", "City Hall"], primaria: "#1351b4", forte: "#0c326f", suave: "#e1ebfa", faixa: ["#1351b4", "#ffcd07", "#1351b4"] },
      { nome: "Instituto de Previdência", sigla: "I", tipo: ["RPPS", "Pension fund"], primaria: "#7a1f3d", forte: "#521428", suave: "#f6e4ea", faixa: ["#7a1f3d", "#e8c26a", "#7a1f3d"] },
      { nome: "Autarquia de Águas", sigla: "A", tipo: ["Autarquia", "Public agency"], primaria: "#3fa7d6", forte: "#1d6f94", suave: "#e2f3fb", faixa: ["#3fa7d6", "#ffffff", "#3fa7d6"] },
    ];
    const demo = $(".orgao-demo", el);
    const chips = $(".chips", el);
    const out = $(".contrast", el);

    const lum = (hex) => {
      const c = hex.replace("#", "").match(/../g).map((h) => {
        const v = parseInt(h, 16) / 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
    };
    const ratio = (a, b) => {
      const [l1, l2] = [lum(a), lum(b)].sort((x, y) => y - x);
      return (l1 + 0.05) / (l2 + 0.05);
    };

    let current = 0;
    function render() {
      chips.innerHTML = orgaos
        .map((o, i) => `<button class="chip" aria-pressed="${i === current}" data-i="${i}">${o.tipo[isPt() ? 0 : 1]}</button>`)
        .join("");
      const o = orgaos[current];
      const branco = ratio(o.primaria, "#ffffff");
      const preto = ratio(o.primaria, "#111111");
      const sobre = branco >= preto ? "#ffffff" : "#111111";
      const r = Math.max(branco, preto);
      demo.style.setProperty("--primaria", o.primaria);
      demo.style.setProperty("--primaria-forte", o.forte);
      demo.style.setProperty("--primaria-suave", o.suave);
      demo.style.setProperty("--sobre", sobre);
      $(".od-faixa", demo).innerHTML = o.faixa.map((c) => `<i style="background:${c}"></i>`).join("");
      $(".od-nome", demo).textContent = o.nome;
      $(".od-brasao", demo).textContent = o.sigla;
      const ok = r >= 4.5;
      out.innerHTML = `
        <span>${t("Primária", "Primary")} <b>${o.primaria}</b></span>
        <span>${t("Texto sobre ela", "Text on top")} <b>${sobre === "#ffffff" ? t("branco", "white") : t("preto", "black")}</b></span>
        <span>${t("Contraste", "Contrast")} <b class="${ok ? "pass" : "fail"}">${r.toFixed(2).replace(".", isPt() ? "," : ".")}:1 ${ok ? "✓" : "✗"}</b> <span class="muted">(${t("mínimo 4,5:1", "minimum 4.5:1")} · eMAG)</span></span>`;
    }
    chips.addEventListener("click", (e) => {
      const b = e.target.closest("[data-i]");
      if (!b) return;
      current = +b.dataset.i;
      render();
    });
    document.addEventListener("langchange", render);
    render();
  }

  // Olheiro: arraste o preço do concorrente e veja quando o aviso dispara
  function widgetAviso(el) {
    const meu = 189.9;
    const range = $("input", el);
    const val = $("[data-concorrente]", el);
    const diff = $("[data-diff]", el);
    const chat = $(".tg", el);
    const brl = (n) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    let lastState = null;
    function render(fromInput) {
      const v = +range.value / 10;
      val.textContent = brl(v);
      const d = v - meu;
      diff.textContent =
        d < 0 ? t(`${brl(-d)} abaixo de você`, `${brl(-d)} below you`) : d === 0 ? t("empatado", "tied") : t(`${brl(d)} acima`, `${brl(d)} above`);
      diff.style.color = d < 0 ? "var(--accent)" : "var(--ok)";
      const state = d < 0 ? "alert" : "quiet";
      if (state === lastState && fromInput) {
        const msg = chat.lastElementChild;
        if (msg && state === "alert") $("[data-v]", msg).textContent = brl(v);
        return;
      }
      lastState = state;
      const hora = new Intl.DateTimeFormat("pt-BR", { hour: "2-digit", minute: "2-digit" }).format(new Date());
      const msg = document.createElement("div");
      msg.className = "tg-msg pop" + (state === "quiet" ? " is-quiet" : "");
      msg.innerHTML =
        state === "alert"
          ? `<span class="tg-from">Olheiro de Preço</span><br>${t("🔻 CASADOFONE baixou o preço do Fone Bluetooth TWS Pro para", "🔻 CASADOFONE dropped the price of Fone Bluetooth TWS Pro to")} <b data-v>${brl(v)}</b>. ${t("Seu anúncio está em", "Your listing is at")} ${brl(meu)}.<small>${hora}</small>`
          : `${t("Preço conferido. Ninguém abaixo de você.", "Price checked. Nobody below you.")}<small>${hora}</small>`;
      chat.appendChild(msg);
      while (chat.children.length > 3) chat.firstElementChild.remove();
    }
    range.addEventListener("input", () => render(true));
    document.addEventListener("langchange", () => {
      chat.innerHTML = "";
      lastState = null;
      render(false);
    });
    render(false);
  }

  // Imoboo: por onde passa uma mensagem do WhatsApp
  function widgetPipe(el) {
    const steps = [
      { pt: ["Webhook recebe", "valida token, resolve o tenant pela instância, registra idempotência"], en: ["Webhook receives", "checks token, resolves tenant from the instance, records idempotency"], cost: "< 50 ms" },
      { pt: ["Fila e lock", "worker fora do ciclo HTTP, lock por telefone no Redis"], en: ["Queue and lock", "worker outside the HTTP cycle, per-phone lock in Redis"], cost: "redis" },
      { pt: ["Lead e conversa", "identifica ou cria, grava a mensagem"], en: ["Lead and conversation", "find or create, store the message"], cost: "sql" },
      { pt: ["Está com o corretor?", "se um humano assumiu, para aqui"], en: ["Is a broker on it?", "if a human took over, stop here"], cost: "0 tokens" },
      { pt: ["Pediu humano?", "regra determinística antes do modelo"], en: ["Asked for a human?", "deterministic rule before the model"], cost: "0 tokens" },
      { pt: ["Extrai preferências", "modelo rápido · cache de 7 dias"], en: ["Extract preferences", "fast model · 7-day cache"], cost: "tier 1", ai: true },
      { pt: ["Busca no catálogo", "WHERE no SQL, no máximo 5 imóveis"], en: ["Search the catalog", "SQL WHERE, at most 5 listings"], cost: "sql" },
      { pt: ["Gera a resposta", "modelo balanceado · cache de 6 horas"], en: ["Write the reply", "balanced model · 6-hour cache"], cost: "tier 2", ai: true },
      { pt: ["Envia e registra", "Evolution API, atualiza lead e conversa"], en: ["Send and log", "Evolution API, update lead and conversation"], cost: "" },
    ];
    const cenarios = [
      {
        label: ["“Tem apê de 2 quartos até 300 mil?”", "“Any 2-bed flat under 300k?”"],
        path: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        out: ["A IA responde com os imóveis que vieram do banco — preço e metragem nunca saem do modelo.", "The AI answers with listings from the database — price and size never come from the model."],
      },
      {
        label: ["“Quero falar com o corretor”", "“I want to talk to an agent”"],
        path: [0, 1, 2, 3, 4],
        stop: 4,
        out: ["Handoff na hora. Nenhum token gasto: a frase bateu na regra antes de chegar ao modelo.", "Instant handoff. Zero tokens: the phrase hit the rule before reaching the model."],
      },
      {
        label: ["Mesma pergunta, 2ª vez", "Same question, 2nd time"],
        path: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        cached: [5, 7],
        out: ["Extração e resposta saem do cache. Mesma pergunta + mesmo catálogo = mesma resposta, sem nova chamada.", "Extraction and reply come from cache. Same question + same catalog = same answer, no new call."],
      },
      {
        label: ["Webhook reentregue", "Redelivered webhook"],
        path: [0],
        stop: 0,
        out: ["Índice único em (Provider, ExternalEventId) descarta no insert. O cliente não recebe duas respostas.", "A unique index on (Provider, ExternalEventId) drops it at insert. The customer never gets two replies."],
      },
    ];
    const list = $(".pipe", el);
    const chips = $(".chips", el);
    const out = $(".pipe-out", el);
    let current = 0;
    let timers = [];

    function draw() {
      list.innerHTML = steps
        .map((s, i) => {
          const [b, sm] = isPt() ? s.pt : s.en;
          return `<li class="${s.ai ? "is-ai" : ""}"><span class="n">${i + 1}</span><span><b>${b}</b><small>${sm}</small></span><span class="cost">${s.cost}</span></li>`;
        })
        .join("");
      chips.innerHTML = cenarios
        .map((c, i) => `<button class="chip" aria-pressed="${i === current}" data-i="${i}">${c.label[isPt() ? 0 : 1]}</button>`)
        .join("");
    }
    function run() {
      timers.forEach(clearTimeout);
      timers = [];
      draw();
      const c = cenarios[current];
      const lis = $$("li", list);
      out.innerHTML = `<span class="mono">${t("resultado", "result")}</span>…`;
      const delay = reduced ? 0 : 260;
      c.path.forEach((idx, k) => {
        timers.push(
          setTimeout(() => {
            lis[idx].classList.add("is-on");
            if (c.cached?.includes(idx)) $(".cost", lis[idx]).textContent = "cache ✓";
            if (c.stop === idx) lis[idx].classList.add("is-stop");
          }, k * delay)
        );
      });
      timers.push(
        setTimeout(() => {
          lis.forEach((li, i) => !c.path.includes(i) && li.classList.add("is-skip"));
          out.innerHTML = `<span class="mono">${t("resultado", "result")}</span>${c.out[isPt() ? 0 : 1]}`;
        }, c.path.length * delay)
      );
    }
    chips.addEventListener("click", (e) => {
      const b = e.target.closest("[data-i]");
      if (!b) return;
      current = +b.dataset.i;
      run();
    });
    document.addEventListener("langchange", run);
    draw();
    // só roda quando aparece na tela
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        run();
        io.disconnect();
      }
    }, { threshold: 0.4 });
    io.observe(el);
  }

  // Diário: a conta da porção
  function widgetPorcao(el) {
    const alimentos = [
      { pt: "Frango grelhado", en: "Grilled chicken", kcal: 159, base: 100, un: "g" },
      { pt: "Arroz branco", en: "White rice", kcal: 128, base: 100, un: "g" },
      { pt: "Leite integral", en: "Whole milk", kcal: 61, base: 100, un: "ml" },
      { pt: "Ovo", en: "Egg", kcal: 72, base: 1, un: "un", peso: 50 },
    ];
    const chips = $(".chips", el);
    const range = $("input", el);
    const qty = $(".qty", el);
    const kcal = $(".calc-out b", el);
    const formula = $(".formula", el);
    let current = 0;
    function render() {
      const a = alimentos[current];
      chips.innerHTML = alimentos
        .map((x, i) => `<button class="chip" aria-pressed="${i === current}" data-i="${i}">${isPt() ? x.pt : x.en}</button>`)
        .join("");
      if (a.un === "un") {
        range.min = 1;
        range.max = 6;
        range.step = 1;
      } else {
        range.min = 10;
        range.max = 400;
        range.step = 10;
      }
      const q = Math.min(Math.max(+range.value, +range.min), +range.max);
      range.value = q;
      const total = Math.round((q * a.kcal) / a.base);
      qty.textContent = a.un === "un" ? `${q} ${t(q > 1 ? "unidades" : "unidade", q > 1 ? "units" : "unit")} · ${q * a.peso} g` : `${q} ${a.un}`;
      kcal.textContent = total;
      formula.textContent =
        a.un === "un"
          ? `${q} × ${a.kcal} kcal ${t("por unidade", "per unit")} = ${total} kcal`
          : `${q} ${a.un} × ${a.kcal} kcal / ${a.base} ${a.un} = ${total} kcal`;
    }
    chips.addEventListener("click", (e) => {
      const b = e.target.closest("[data-i]");
      if (!b) return;
      current = +b.dataset.i;
      range.value = alimentos[current].un === "un" ? 3 : 170;
      render();
    });
    range.addEventListener("input", render);
    document.addEventListener("langchange", render);
    render();
  }

  // Diário: o bug das 21h
  function widgetFuso(el) {
    const range = $("input[type=range]", el);
    const fix = $("input[type=checkbox]", el);
    const local = $("[data-local]", el);
    const server = $("[data-server]", el);
    const hourL = $("[data-hour]", el);
    const note = $("[data-note]", el);
    function render() {
      const h = +range.value;
      const utc = h + 3;
      const virou = utc >= 24;
      const dLocal = t("14 out", "Oct 14");
      const dServer = virou && !fix.checked ? t("15 out", "Oct 15") : dLocal;
      hourL.textContent = `${String(h).padStart(2, "0")}:30`;
      local.textContent = dLocal;
      server.textContent = dServer;
      server.className = dServer === dLocal ? "good" : "bad";
      note.textContent =
        dServer === dLocal
          ? virou
            ? t("Com TZ_OFFSET=-3 e a data local vinda do front, o jantar fica no dia certo.", "With TZ_OFFSET=-3 and the local date sent by the client, dinner stays on the right day.")
            : t("Antes das 21h, UTC e Brasil concordam sobre o dia.", "Before 9 pm, UTC and Brazil agree on the date.")
          : t(`São ${String(utc - 24).padStart(2, "0")}:30 em UTC — o jantar seria gravado amanhã.`, `It's ${String(utc - 24).padStart(2, "0")}:30 UTC — dinner would be saved as tomorrow.`);
    }
    range.addEventListener("input", render);
    fix.addEventListener("change", render);
    document.addEventListener("langchange", render);
    render();
  }

  const widgets = { orgao: widgetOrgao, aviso: widgetAviso, pipe: widgetPipe, porcao: widgetPorcao, fuso: widgetFuso };
  $$("[data-widget]").forEach((el) => {
    try {
      widgets[el.dataset.widget]?.(el);
    } catch (err) {
      console.error(err);
    }
  });

  /* ---------------------------------------------------------- partida --- */

  setupPreview();

  if (hasGsap && !reduced) {
    try {
      setupMotion();
    } catch (err) {
      console.error(err);
      root.classList.remove("anim");
    }
    enterCurtain().then(() => {
      intro();
      ScrollTrigger.refresh();
    });
    window.addEventListener("load", () => ScrollTrigger.refresh());
  } else {
    root.classList.remove("is-entering");
  }
})();
