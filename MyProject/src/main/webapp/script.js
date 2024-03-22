 
		function submitForm() {
        var formData = new FormData(document.getElementById("registrationForm"));
        
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "RegisterServlet", true);
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        
        xhr.onload = function() {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                alert(response.message); // Display the message in a popup
            } else {
                alert("Registration failed. Please try again.");
            }
        };
        
        xhr.send(formData);
    }

		
	


        window.addEventListener('DOMContentLoaded', (event) => {
            var sliderImages = document.querySelectorAll('.slider-image');
            var currentImageIndex = 0;

            function showNextImage() {
                sliderImages[currentImageIndex].classList.remove('active');
                currentImageIndex = (currentImageIndex + 1) % sliderImages.length;
                sliderImages[currentImageIndex].classList.add('active');
            }

            setInterval(showNextImage, 3000); 
        });

        function toggleSidebar() {
            var sidebar = document.getElementById('sidebar');
            sidebar.classList.toggle('visible');
        }

        $(document).ready(function(){
            $("#testimonial-slider").owlCarousel({
            items:1,
            itemsDesktop:[1000,1],
            itemsDesktopSmall:[979,1],
            itemsTablet:[768,1],
            itemsMobile:[550,1],
            pagination: false,
            navigation:true,
            navigationText:["",""],
            slideSpeed:1000,
            transitionStyle:"goDown",
            autoPlay:true
            });
        });


        function openForm(formId) {
            document.getElementById(formId).style.display = "block";
        }

        function closeForm(formId) {
            document.getElementById(formId).style.display = "none";
        }

        document.addEventListener("DOMContentLoaded", function() {
            document.getElementById("loginButton").addEventListener("click", function() {
                openForm("loginForm");
                closeForm("registerForm"); 
            });

            document.getElementById("registerButton").addEventListener("click", function() {
                openForm("registerForm");
                closeForm("loginForm"); 
            });
        });
        
        document.addEventListener("DOMContentLoaded", function() {
        var passwordField = document.getElementById("passwordField");
        var showPasswordButton = document.getElementById("showPasswordButton");

        showPasswordButton.addEventListener("click", function () {
            if (passwordField.type === "password") {
                passwordField.type = "text";
            } else {
                passwordField.type = "password";
            }
        });
        
            // Search functionality and suggestions
    const searchInput = document.querySelector('.search-input');
    const suggestionsBox = document.querySelector('.suggestions-box');
    const suggestions = ['Indian Maharaja Thali', 'Rajashthani Thali', 'Gujrati Thali', 'Maharashtrian Thali','Chinese','south indian thali'];

    function displaySuggestions() {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredSuggestions = suggestions.filter(suggestion => suggestion.toLowerCase().includes(searchTerm));

        suggestionsBox.innerHTML = '';
        filteredSuggestions.forEach(suggestion => {
            const suggestionItem = document.createElement('div');
            suggestionItem.classList.add('suggestion-item');
            suggestionItem.textContent = suggestion;
            suggestionItem.addEventListener('click', () => {
                // Redirect to next.html when a suggestion is clicked
                window.location.href = 'browse.html'; 
            });
            suggestionsBox.appendChild(suggestionItem);
        });
    }

    const searchBtn = document.querySelector('.search-btn');
    searchBtn.addEventListener('click', displaySuggestions);
    searchInput.addEventListener('input', displaySuggestions);
    });
    

    
  