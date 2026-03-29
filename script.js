const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const message = document.getElementById("message");
const mainCard = document.getElementById("mainCard");

let yesScale = 1;
let isSaving = false;

const noMessages = [
  "Mendoje edhe njëherë.",
  "A je e sigurt?",
  "Ndoshta duhet me e mendu pak ma shumë.",
  "Po e provoj prap.",
  "Sinqerisht?"
];

function createHearts() {
  const heartsBox = document.querySelector(".hearts");

  setInterval(() => {
    const heart = document.createElement("span");
    heart.innerHTML = "♡";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = Math.random() * 18 + 16 + "px";
    heart.style.animationDuration = Math.random() * 3 + 4 + "s";
    heartsBox.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 7000);
  }, 500);
}

createHearts();

async function saveAnswer(answer) {
  if (isSaving) return;
  isSaving = true;

  yesBtn.disabled = true;
  noBtn.disabled = true;
  message.textContent = "Duke e ruajtur përgjigjen...";

  try {
    await db.collection("responses").add({
      answer: answer,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      userAgent: navigator.userAgent
    });

    if (answer === "Po") {
      const photos = [
        "images/foto1.png",
        "images/foto2.png",
        "images/foto3.png",
        "images/foto4.png"
      ];

      let current = 0;

      mainCard.innerHTML = `
        <div class="gallery">
          <div class="emoji">❤</div>
          <h1>Faleminderit për përgjigjen</h1>
          <p>Këto janë disa momente të bukura.</p>
          <img id="slider" class="slider" src="${photos[0]}" alt="Foto">
          <div class="counter" id="counter">1 / ${photos.length}</div>
        </div>
      `;

      const slider = document.getElementById("slider");
      const counter = document.getElementById("counter");

      setInterval(() => {
        current++;
        if (current >= photos.length) current = 0;
        slider.src = photos[current];
        counter.textContent = `${current + 1} / ${photos.length}`;
      }, 2000);
    } else {
      message.textContent = "Përgjigjja u ruajt.";
      yesBtn.disabled = false;
      noBtn.disabled = false;
      isSaving = false;
    }
  } catch (error) {
    console.error("Gabim:", error);
    message.textContent = "Gabim gjatë ruajtjes.";
    yesBtn.disabled = false;
    noBtn.disabled = false;
    isSaving = false;
  }
}

noBtn.addEventListener("click", async () => {
  yesScale += 0.25;
  yesBtn.style.transform = `scale(${yesScale})`;
  message.textContent = noMessages[Math.floor(Math.random() * noMessages.length)];

  if (yesScale > 3.2) {
    noBtn.style.display = "none";
    message.textContent = "Po mbetet vetëm një përgjigje.";
  }

  await saveAnswer("Jo");
});

yesBtn.addEventListener("click", async () => {
  await saveAnswer("Po");
});