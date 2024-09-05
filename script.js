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

    const model = await tf.loadLayersModel('./model/model.json');
    const reader = new FileReader();
    reader.onload = async function (e){
      const image = new Image();
      image.src = e.target.result;
      image.onload = async function (){
          const tensor = tf.browser.fromPixels(image).resizeNearestNeighbor([224,224]).toFloat().expandDims();
          const predictions = await model.predict(tensor).data();
          const classNames = [
            "Apple Black Rot",
            "Apple Healthy",
            "Apple Rust",
            "Apple Scab",
            "Cassava Bacterial Blight",
            "Brown Streak Disease",
            "Green Mottle",
            "Cassava Healthy",
            "Cassava Mosaic Disease",
            "Cherry Healthy",
            "Cherry Powdery Mildew",
            "Chilli Healthy",
            "Chilli Leaf Curl",
            "Chilli Leaf Spot",
            "Chili Whitefly",
            "Chili Yellowish",
            "Coffee Cercosport Leaf Spot",
            "Coffee Healthy",
            "Coffee Red spider mite",
            "Coffee Rust",
            "Corn Common Rust",
            "Corn Gray Leaf Spot",
            "Corn Healthy",
            "Corn Northern Leaf Blight",
            "Cucumber Diseased",
            "Cucumber Healthy",
            "Guava Diseased",
            "Guava Healthy",
            "Grape Black Measles",
            "Grape Black Rot",
            "Grape Healthy",
            "Grape Leaf Blight",
            "Jamun Diseased",
            "Jamun Healthy",
            "Lemon Diseased",
            "Lemon Healthy",
            "Mango Diseased",
            "Mango Healthy",
            "Peach Bacterial Spot",
            "Peach Healthy",
            "Pepper Bell Bacterial Spot",
            "Pepper Bell Healthy",
            "Pomegranate Diseased",
            "Pomegranate Healthy",
            "Potato Early Blight",
            "Potato Healthy",
            "Potato Late Blight",
            "Rice Brown Spot",
            "Rice Healthy",
            "Rice Hispa",
            "Rice Leaf Black",
            "Rice Neck Blast",
            "Soybean Bacterial Blight",
            "Soybean Caterpillar",
            "Soybean Diabrotica Speciosa",
            "Soybean Downy Mildew",
            "Soybean Healthy",
            "Soybean Mosaic Virus",
            "Soybean Powdery Mildew",
            "Soybean Rust",
            "Soybean Southern Blight",
            "Strawberry Leaf Scorch",
            "Strawberry Healthy",
            "Sugarcane Bacterial Blight",
            "Sugarcane Healthy",
            "Sugarcane Red Rot",
            "Sugarcane Red Stripe",
            "Sugarcane Rust",
            "Tea Algal Leaf",
            "Tea Anthracnose",
            "Tea Bird Eye Spot",
            "Tea Brown Blight",
            "Tea Healthy",
            "Tea Red Leaf Spot",
            "Tomato Bacterial Spot",
            "Tomato Early Blight",
            "Tomato Healthy",
            "Tomato Late Blight",
            "Tomato Leaf Mold",
            "Tomato Mosaic Virus",
            "Tomato Septoria Leaf Spot",
            "Tomato Spider Mites",
            "Tomato Target Spot",
            "Tomato Yellow Leaf Curl Virus",
            "Wheat Brown Rust",
            "Wheat Healthy",
            "Wheat Septoria",
            "Wheat Yellow Rust"
          ];

              const predictedClass = classNames[predictions.indexOf(Math.max(...predictions))];
              const resultBox = document.getElementById("resultBox");
              resultBox.classList.remove("hidden");
              document.getElementById("condition").textContent = predictedClass || "N/A";
              loadSuggestionsAndRemedies(predictedClass);
      };
    };
    reader.readAsDataURL(file);
  });

  async function loadSuggestionsAndRemedies(predictedClass) {
    try {
        const response = await fetch('model/suggestions_remedies.json');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        const classData = data[predictedClass];
        if (classData) {
            document.getElementById("suggestions").textContent = classData.suggestions || "N/A";
            document.getElementById("remedies").textContent = classData.remedies || "N/A";
        } else {
            document.getElementById("suggestions").textContent = "N/A";
            document.getElementById("remedies").textContent = "N/A";
        }
    } catch (error) {
        console.error("Error loading suggestions and remedies:", error);
    }
}


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

// Chatbot
