const sectors = [
  { color: "#1b6ef3ff", text: "#333333", label: "Pavithra 60" },
  { color: "#f7fcffff", text: "#333333", label: "Deepti 31" },
  { color: "#1b6ef3ff", text: "#333333", label: "Archana 23" },
  { color: "#f7fcffff", text: "#333333", label: "Kruthika M 42" },
  { color: "#1b6ef3ff", text: "#333333", label: "Poorvitha 62" },
  { color: "#f7fcffff", text: "#333333", label: "Ananya 13" },
  { color: "#1b6ef3ff", text: "#333333", label: "Jagadeesh36" },
  { color: "#f7fcffff", text: "#333333", label: "Manoj 49" },
  { color: "#1b6ef3ff", text: "#333333", label: "Manoj K 50" },
  { color: "#f7fcffff", text: "#333333", label: "Nisha 56" },
  { color: "#1b6ef3ff", text: "#333333", label: "Mandara 47" },
  { color: "#f7fcffff", text: "#333333", label: "Ganavi 32" },
  { color: "#1b6ef3ff", text: "#333333", label: "Ankosh 16" },
  { color: "#f7fcffff", text: "#333333", label: "Poorvaj 61" },
  { color: "#1b6ef3ff", text: "#333333", label: "Anushree 20" },
  { color: "#f7fcffff", text: "#333333", label: "Chanakya 28" },
  { color: "#1b6ef3ff", text: "#333333", label: "Kiran 39" },
  { color: "#f7fcffff", text: "#333333", label: "Abmika12" },
  { color: "#1b6ef3ff", text: "#333333", label: "Kiran S 40" },
  { color: "#f7fcffff", text: "#333333", label: "Gouri 33" },
  { color: "#1b6ef3ff", text: "#333333", label: "Adithi 08" },
  { color: "#f7fcffff", text: "#333333", label: "Niveditha 58" },
  { color: "#1b6ef3ff", text: "#333333", label: "Sinchana 26" },
  { color: "#f7fcffff", text: "#333333", label: "Krutika S 43" },
  { color: "#1b6ef3ff", text: "#333333", label: "Ajeya 10" },
  { color: "#f7fcffff", text: "#333333", label: "Harshitha35" },
  { color: "#1b6ef3ff", text: "#333333", label: "Bhavana 27" },
  { color: "#f7fcffff", text: "#333333", label: "Akshaya 11" },
  { color: "#1b6ef3ff", text: "#333333", label: "Apeksha 22" },
  { color: "#f7fcffff", text: "#333333", label: "Somshekar 25" },
  { color: "#1b6ef3ff", text: "#333333", label: "Darshan 29" },
  { color: "#f7fcffff", text: "#333333", label: "Anusha 19" },
  { color: "#1b6ef3ff", text: "#333333", label: "Madhulika 44" },
  { color: "#f7fcffff", text: "#333333", label: "Anish 14" },
  { color: "#1b6ef3ff", text: "#333333", label: "Deepa 30" },
  { color: "#f7fcffff", text: "#333333", label: "Mithesh 52" },
  { color: "#1b6ef3ff", text: "#333333", label: "Adarsh U 07" },
  { color: "#f7fcffff", text: "#333333", label: "Anush 18" },
  { color: "#1b6ef3ff", text: "#333333", label: "V6" },
  { color: "#f7fcffff", text: "#333333", label: "Nishmitha 57" },
  { color: "#1b6ef3ff", text: "#333333", label: "Sanvi 34" },
  { color: "#f7fcffff", text: "#333333", label: "Lehran 37" },
  { color: "#1b6ef3ff", text: "#333333", label: "Manjunath 48" },
  { color: "#f7fcffff", text: "#333333", label: "Anujna K S 17" },
  { color: "#1b6ef3ff", text: "#333333", label: "Aikyatha 09" },
  { color: "#f7fcffff", text: "#333333", label: "Ankitha 15" },
  { color: "#1b6ef3ff", text: "#333333", label: "Medha 51" },
  { color: "#f7fcffff", text: "#333333", label: "Mamata 46" },
  { color: "#1b6ef3ff", text: "#333333", label: "Pavan 59" },
  { color: "#f7fcffff", text: "#333333", label: "Mallareddy 45" },
  { color: "#1b6ef3ff", text: "#333333", label: "Nandini 54" },
  { color: "#f7fcffff", text: "#333333", label: "Nandini J 55" },
  { color: "#1b6ef3ff", text: "#333333", label: "Kiran 39" }, 
  { color: "#f7fcffff", text: "#333333", label: "Nagesh 53" },
  { color: "#1b6ef3ff", text: "#333333", label: "Ashika 24" },
  { color: "#f7fcffff", text: "#333333", label: "anushya 21" }
];

const events = {
  listeners: {},
  addListener: function (eventName, fn) {
    this.listeners[eventName] = this.listeners[eventName] || [];
    this.listeners[eventName].push(fn);
  },
  fire: function (eventName, ...args) {
    if (this.listeners[eventName]) {
      for (let fn of this.listeners[eventName]) {
        fn(...args);
      }
    }
  },
};

const rand = (m, M) => Math.random() * (M - m) + m;
const tot = sectors.length;
const spinEl = document.querySelector("#spin");
const ctx = document.querySelector("#wheel").getContext("2d");
const dia = ctx.canvas.width;
const rad = dia / 2;
const PI = Math.PI;
const TAU = 2 * PI;
const arc = TAU / sectors.length;

const friction = 0.991; // 0.995=soft, 0.99=mid, 0.98=hard
let angVel = 0; // Angular velocity
let ang = 0; // Angle in radians

let spinButtonClicked = false;

const getIndex = () => Math.floor(tot - (ang / TAU) * tot) % tot;

function drawSector(sector, i) {
  const ang = arc * i;
  ctx.save();

  // SHADOW EFFECT
  ctx.shadowColor = "rgba(0, 0, 0, 0.5)"; // Dark shadow
  ctx.shadowBlur = 15; // Blur effect
  ctx.shadowOffsetX = 5; // Offset X
  ctx.shadowOffsetY = 5; // Offset Y

  // COLOR
  ctx.beginPath();
  ctx.fillStyle = sector.color;
  ctx.moveTo(rad, rad);
  ctx.arc(rad, rad, rad, ang, ang + arc);
  ctx.lineTo(rad, rad);
  ctx.fill();

  ctx.restore();

  // TEXT
  ctx.save();
  ctx.translate(rad, rad);
  ctx.rotate(ang + arc / 2);
  ctx.textAlign = "right";
  ctx.fillStyle = sector.text;
  ctx.font = "bold 21px 'Lato', sans-serif";
  ctx.fillText(sector.label, rad - 20, 10);
  ctx.restore();
}
function rotate() {
  const sector = sectors[getIndex()];
  ctx.canvas.style.transform = `rotate(${ang - PI / 2}rad)`;

  spinEl.textContent = !angVel ? "SPIN" : sector.label;
  spinEl.style.background = sector.color;
  spinEl.style.color = sector.text;
}

function frame() {
  // Fire an event after the wheel has stopped spinning
  if (!angVel && spinButtonClicked) {
    const finalSector = sectors[getIndex()];
    events.fire("spinEnd", finalSector);
    spinButtonClicked = false; // reset the flag
    return;
  }

  angVel *= friction; // Decrement velocity by friction
  if (angVel < 0.002) angVel = 0; // Bring to stop
  ang += angVel; // Update angle
  ang %= TAU; // Normalize angle
  rotate();
}

function engine() {
  frame();
  requestAnimationFrame(engine);
}

function init() {
  sectors.forEach(drawSector);
  rotate(); // Initial rotation
  engine(); // Start engine
  spinEl.addEventListener("click", () => {
    if (!angVel) angVel = rand(0.25, 0.45);
    spinButtonClicked = true;
  });
}

init();

events.addListener("spinEnd", (sector) => {
  console.log(`Woop! You won ${sector.label}`);
});

