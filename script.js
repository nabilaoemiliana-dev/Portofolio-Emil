const activityDetails = {
  peta: {
    title: "PETA FTI 2023",
    kicker: "Secretary · Organizing Committee · Aug — Sep 2023",
    body: "Served as secretary for the Faculty Orientation Committee. Responsibilities included coordinating event schedules, preparing and documenting meeting minutes, correspondence and official committee letters, maintaining administrative records, supporting structured communication across 8 divisions, and preparing the final accountability and documentation reports.",
    stack: ["Administration", "Documentation", "Coordination", "Communication", "Reporting"]
  },
  porsematik: {
    title: "PORSEMATIK 2022",
    kicker: "Treasurer · Informatics Competition · Oct — Nov 2022",
    body: "Managed budgeting, fund allocation, and financial documentation for the event. Recorded financial transactions using Microsoft Excel, assessed spending priorities, coordinated financial needs with the committee head and 7 divisions, and prepared the final financial accountability report.",
    stack: ["Budgeting", "Microsoft Excel", "Bookkeeping", "Financial Reporting", "Coordination"]
  }
};

const projectDetails = {
  lokaswara: {
    title: "Lokaswara",
    kicker: "2D educational game · individual project",
    body: "An educational game introducing Indonesian traditional songs to children. The project covered user requirements, GDLC, system/game flows, interface and visual assets, Unity implementation, functional testing, and usability testing with 18 students plus content evaluation with a teacher.",
    stack: ["Unity", "C#", "GDLC", "Flowchart", "Usability Testing", "ISO 9241-11"]
  },
  emilio: {
    title: "Emilio",
    kicker: "UI/UX · team project · Best Project — Informatics Expo 2022",
    body: "A soft-skills development mobile app shaped through design thinking. The process started from identifying a real user problem, interviewing 10 target users, synthesizing their needs, and translating the insights into requirements, user flows, wireframes, and interactive prototypes.",
    stack: ["Figma", "Design Thinking", "User Research", "User Flow", "Prototyping"]
  },
  berkain: {
    title: "Berkain",
    kicker: "batik e-commerce · team project · Most Favorite Project — Informatics Expo 2023",
    body: "An e-commerce website for batik businesses. The System Analyst role involved gathering and analyzing requirements from two batik business owners, designing workflows and wireframes, supporting frontend implementation, coordinating with developers, and conducting functional testing.",
    stack: ["System Analysis", "HTML", "CSS", "JavaScript", "UML", "QA"]
  },
  financial: {
    title: "Financial Record",
    kicker: "mobile application · team project",
    body: "A personal finance management application developed in Kotlin. Work included user requirements, system workflows, UML, application prototypes, income and expense recording, data management, financial reporting, and functional testing.",
    stack: ["Kotlin", "Android Studio", "SDLC", "UML", "Functional Testing"]
  },
  laundry: {
    title: "LaundryKu",
    kicker: "business management website · team project",
    body: "A management system for laundry businesses. Contributions included process-flow design, frontend features, database mapping, and visualization tools intended to support business decision-making.",
    stack: ["System Analysis", "Frontend", "Database", "Process Flow"]
  },
  travelsage: {
    title: "TravelSage",
    kicker: "travel planning website · UI/UX team project",
    body: "A travel planning website developed through design thinking. The work focused on identifying user problems, developing interface solutions, and producing wireframes and interactive prototypes.",
    stack: ["Figma", "Design Thinking", "Wireframing", "Prototyping"]
  },
  midnight: {
    title: "Midnight Hidden Object",
    kicker: "2D game · team project",
    body: "A 2D hidden-object game. Contributions included gameplay concept design, visual assets, gameplay logic, flowcharts and system diagrams, plus functional testing.",
    stack: ["Unity", "GDLC", "Game Logic", "Functional Testing"]
  },
  inventory: {
    title: "Inventory Recording System",
    kicker: "administrative data system · individual KKN project",
    body: "A simple inventory management system using Google Apps Script and Google Sheets. It supports input, storage, updating, and retrieval of inventory records, with workflows and testing designed to keep administrative data organized and consistent.",
    stack: ["Google Apps Script", "Google Sheets", "Data Management", "Testing"]
  }
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, {threshold: 0.12});
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

const filters = document.querySelectorAll(".filter");
const cards = document.querySelectorAll(".project-card");
filters.forEach(button => {
  button.addEventListener("click", () => {
    filters.forEach(b => b.classList.remove("active"));
    button.classList.add("active");
    const filter = button.dataset.filter;
    cards.forEach(card => {
      const match = filter === "all" || card.dataset.tags.split(",").includes(filter);
      card.style.display = match ? "" : "none";
    });
  });
});

const modal = document.getElementById("projectModal");
const modalContent = document.getElementById("modalContent");
document.querySelectorAll(".details-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const data = projectDetails[btn.dataset.project];
    modalContent.innerHTML = `
      <div class="modal-kicker">${data.kicker}</div>
      <h3>${data.title}</h3>
      <p>${data.body}</p>
      <div class="modal-stack">${data.stack.map(x => `<span>${x}</span>`).join("")}</div>
      <p style="margin-top:24px"><b>Next step:</b> replace the project image placeholder and add your real Figma / GitHub / demo link in <code>index.html</code>.</p>
    `;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
  });
});
document.querySelectorAll(".activity-view").forEach(btn => {
  btn.addEventListener("click", () => {
    const data = activityDetails[btn.dataset.activity];
    modalContent.innerHTML = `
      <div class="modal-kicker">${data.kicker}</div>
      <h3>${data.title}</h3>
      <p>${data.body}</p>
      <div class="modal-stack">${data.stack.map(x => `<span>${x}</span>`).join("")}</div>
      <p style="margin-top:24px"><b>Media:</b> add the event photo and certificate image to this card when you're ready.</p>
    `;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
  });
});

document.querySelector(".modal-close").addEventListener("click", closeModal);
document.querySelector(".modal-backdrop").addEventListener("click", closeModal);
function closeModal(){modal.classList.remove("open");modal.setAttribute("aria-hidden","true")}
document.addEventListener("keydown", e => {if(e.key === "Escape") closeModal()});

const glow = document.querySelector(".cursor-glow");
window.addEventListener("pointermove", e => {
  glow.style.left = `${e.clientX}px`;
  glow.style.top = `${e.clientY}px`;
});

// BRIN UI/UX carousels: centered, manual, circular navigation.
// No autoplay. The currently selected slide is always the large/active image.
function setupCircularCarousel(carousel) {
  const track = carousel.querySelector('.carousel-track');
  if (!track) return;

  const originals = Array.from(track.querySelectorAll('.experience-frame'));
  if (originals.length < 2 || track.dataset.circularReady === 'true') return;

  const makeClone = (el) => {
    const clone = el.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    clone.dataset.clone = 'true';
    clone.classList.remove('is-active');
    return clone;
  };

  // One clone on each side keeps the active slide centered while navigation
  // remains circular: 1 → 2 → 3 → 1 and 1 ← 3 ← 2 ← 1.
  track.insertBefore(makeClone(originals[originals.length - 1]), track.firstChild);
  track.appendChild(makeClone(originals[0]));
  track.dataset.circularReady = 'true';

  let index = 1; // first real slide
  let isDragging = false;
  let startX = 0;
  let startScroll = 0;
  let dragMoved = false;

  function setActive() {
    Array.from(track.children).forEach((item, i) => {
      item.classList.toggle('is-active', i === index);
    });
  }

  function position(animate = true) {
    const item = track.children[index];
    if (!item) return;
    const target = item.offsetLeft - (track.clientWidth - item.offsetWidth) / 2;
    track.style.scrollBehavior = animate ? 'smooth' : 'auto';
    track.scrollLeft = target;
    setActive();
  }

  function move(direction) {
    index += direction;
    position(true);
  }

  carousel.querySelector('.prev').addEventListener('click', () => move(-1));
  carousel.querySelector('.next').addEventListener('click', () => move(1));

  function normalize() {
    const n = originals.length;
    if (index === 0) {
      index = n;
      position(false);
    } else if (index === n + 1) {
      index = 1;
      position(false);
    }
  }

  track.addEventListener('scrollend', normalize, { passive: true });
  track.addEventListener('scroll', () => {
    if (!isDragging) {
      const item = track.children[index];
      if (!item) return;
      const target = item.offsetLeft - (track.clientWidth - item.offsetWidth) / 2;
      if (Math.abs(track.scrollLeft - target) < 2) normalize();
    }
  }, { passive: true });

  track.addEventListener('pointerdown', e => {
    isDragging = true;
    dragMoved = false;
    startX = e.clientX;
    startScroll = track.scrollLeft;
    track.setPointerCapture?.(e.pointerId);
    track.classList.add('is-dragging');
  });

  track.addEventListener('pointermove', e => {
    if (!isDragging) return;
    const dx = e.clientX - startX;
    if (Math.abs(dx) > 4) dragMoved = true;
    track.scrollLeft = startScroll - dx;
  });

  track.addEventListener('pointerup', e => {
    if (!isDragging) return;
    isDragging = false;
    track.releasePointerCapture?.(e.pointerId);
    track.classList.remove('is-dragging');

    if (dragMoved) {
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 45) {
        index += dx < 0 ? 1 : -1;
      }
    }
    position(true);
  });

  track.addEventListener('pointercancel', () => {
    isDragging = false;
    track.classList.remove('is-dragging');
    position(true);
  });

  window.addEventListener('resize', () => position(false), { passive: true });
  requestAnimationFrame(() => position(false));
}

document.querySelectorAll('.experience-carousel').forEach(setupCircularCarousel);
