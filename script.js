document.getElementById("mobile-menu").addEventListener("click", function () {
  this.classList.toggle("active");
  document.getElementById("nav").classList.toggle("active");
});

const modal = document.getElementById("videoModal");
const video = document.getElementById("demoVideo");
const liveDemoBtn = document.getElementById("live-demo-btn");
const closeBtn = document.querySelector(".close");

// Show the modal and play video when 'Live Demo' is clicked
liveDemoBtn.addEventListener("click", () => {
  modal.style.display = "flex";
  video.play();
});

// Hide the modal and pause the video when 'Close' is clicked
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
  video.pause();
  video.currentTime = 0; // Reset video to start
});

// Hide the modal when clicking outside of the video
window.addEventListener("click", (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
    video.pause();
    video.currentTime = 0; // Reset video to start
  }
});

document
  .getElementById("cropDiagnosisForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const fileInput = document.getElementById("cropImage");
    const file = fileInput.files[0];

    if (!file) {
      alert("Please select an image to upload.");
      return;
    }

    // Create a FormData object
    const formData = new FormData();
    formData.append("image", file);

    try {
      // Replace 'YOUR_API_ENDPOINT' with the URL of your deployed API
      const response = await fetch("YOUR_API_ENDPOINT/predict", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      // Display the result
      const resultBox = document.getElementById("resultBox");
      resultBox.classList.remove("hidden");

      document.getElementById("condition").textContent =
        result.condition || "N/A";
      document.getElementById("suggestions").textContent =
        result.suggestions || "N/A";
      document.getElementById("remedies").textContent =
        result.remedies || "N/A";
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while processing the image.");
    }
  });

  const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const slider = document.querySelector('.slider');
let currentIndex = 0;

function updateSlider() {
    const slideWidth = slider.clientWidth;
    slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}

prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateSlider();
    }
});

nextButton.addEventListener('click', () => {
    const totalSlides = document.querySelectorAll('.slide').length;
    if (currentIndex < totalSlides - 1) {
        currentIndex++;
        updateSlider();
    }
});

// Initialize slider width
updateSlider();
window.addEventListener('resize', updateSlider);

document.getElementById('cropImage').addEventListener('change', function(event) {
  const fileName = event.target.files[0] ? event.target.files[0].name : 'No file chosen';
  document.getElementById('fileName').textContent = `Selected file: ${fileName}`;
});

document.getElementById('cropDiagnosisForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form from submitting the default way

  // Display the result box
  document.getElementById('resultBox').classList.remove('hidden');

  // Display the message
  document.getElementById('submissionMessage').innerText = 'Thank you for submitting your image. Processing it.';
  document.getElementById('submissionMessage').classList.remove('hidden');
});

