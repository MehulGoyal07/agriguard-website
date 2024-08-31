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

  // JavaScript for slider controls
  const prev = document.querySelector('.prev');
  const next = document.querySelector('.next');
  const slider = document.querySelector('.slider');
  const slides = document.querySelectorAll('.slide');
  
  let currentSlide = 0;
  let slidesToShow = 3; // Default for larger screens
  let totalSlides; // Total number of groups
  
  // Function to update the number of slides to show based on screen size
  function setSlidesToShow() {
      if (window.innerWidth <= 768) {
          slidesToShow = 1;
      } else {
          slidesToShow = 3;
      }
      totalSlides = Math.ceil(slides.length / slidesToShow); // Recalculate totalSlides
      updateSliderPosition(); // Update the position on screen size change
  }
  
  // Function to update the slider position based on the current slide and slidesToShow
  function updateSliderPosition() {
      const slideWidth = slider.clientWidth / slidesToShow;
      slider.style.transform = `translateX(-${currentSlide * slideWidth * slidesToShow}px)`;
  }
  
  // Next button event listener
  next.addEventListener('click', () => {
      if (currentSlide < totalSlides - 1) {
          currentSlide++;
          updateSliderPosition();
      }
  });
  
  // Previous button event listener
  prev.addEventListener('click', () => {
      if (currentSlide > 0) {
          currentSlide--;
          updateSliderPosition();
      }
  });
  
  // Set initial number of slides to show
  setSlidesToShow();
  
  // Update the number of slides to show on window resize
  window.addEventListener('resize', setSlidesToShow);
  


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

