// DARK & LIGHT THEME

document.addEventListener('DOMContentLoaded', function() {
  const themeToggleBtn = document.getElementById('theme-toggle');

  const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

  if (currentTheme) {
    document.body.classList.add(currentTheme);

    if (currentTheme === 'dark-mode') {
      themeToggleBtn.textContent = 'Light Mode';
    }
  }

  themeToggleBtn.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
      themeToggleBtn.textContent = 'Light Mode';
      localStorage.setItem('theme', 'dark-mode');
    } else {
      themeToggleBtn.textContent = 'Dark Mode';
      localStorage.setItem('theme', 'light-mode');
    }
  });
});


// IMAGE ZOOM

function openModal(imageSrc) {
  var modal = document.getElementById("modal");
  var modalImage = document.getElementById("modal-image");
  modal.style.display = "block";
  modalImage.src = imageSrc;
}

function closeModal() {
  var modal = document.getElementById("modal");
  modal.style.display = "none";
}

// FAQ

function toggleContent(answerId) {
  var answerElement = document.getElementById(answerId);
  if (answerElement.style.maxHeight) {
    answerElement.style.maxHeight = null;
  } else {
    answerElement.style.maxHeight = answerElement.scrollHeight + "px";
  }
}

function toggleFAQVisibility() {
  var faqContainer = document.getElementById('faq-container');
  var toggleButton = document.getElementById('toggle-faq-visibility');
  if (faqContainer && toggleButton) {
    if (faqContainer.style.display === "none" || faqContainer.style.display === "") {
      faqContainer.style.display = "block";
      toggleButton.textContent = "HIDE";
    } else {
      faqContainer.style.display = "none";
      toggleButton.textContent = "SHOW";
    }
  }
}

// ADVANCED FORM I FORM SUBMISSION

$(document).ready(function () { 

  let usernameError = true; 
  let emailError = true; 
  let passwordError = true; 
  let confirmPasswordError = true; 

  $("#usercheck").hide(); 
  $("#usernames").keyup(function () { 
      validateUsername(); 
  }); 

  function validateUsername() { 
      let usernameValue = $("#usernames").val(); 
      if (usernameValue.length == "") { 
          $("#usercheck").show(); 
          usernameError = false; 
          return false; 
      } else if (usernameValue.length < 3 || usernameValue.length > 10) { 
          $("#usercheck").show(); 
          $("#usercheck").html("Length of username must be between 3 and 10"); 
          usernameError = false; 
          return false; 
      } else { 
          $("#usercheck").hide(); 
          usernameError = true; 
      } 
  } 

  $("#emailcheck").hide(); 
  $("#email").blur(function () { 
      validateEmail(); 
  }); 

  function validateEmail() { 
      let emailValue = $("#email").val(); 
      let regex = /^([_\-\.0-9a-zA-Z]+)@([_\-\.0-9a-zA-Z]+)\.([a-zA-Z]){2,7}$/; 
      if (regex.test(emailValue)) { 
          $("#emailcheck").hide(); 
          emailError = true; 
      } else { 
          $("#emailcheck").show(); 
          $("#emailcheck").html("Enter valid email"); 
          $("#emailcheck").css("color", "red"); 
          emailError = false; 
      } 
  } 

  $("#passcheck").hide(); 
  $("#password").keyup(function () { 
      validatePassword(); 
  }); 
  function validatePassword() { 
      let passwordValue = $("#password").val(); 
      if (passwordValue.length == "") { 
          $("#passcheck").show(); 
          passwordError = false; 
          return false; 
      } 
      if (passwordValue.length < 3 || passwordValue.length > 10) { 
          $("#passcheck").show(); 
          $("#passcheck").html("Length of your password must be between 3 and 10"); 
          $("#passcheck").css("color", "red"); 
          passwordError = false; 
          return false; 
      } else { 
          $("#passcheck").hide(); 
          passwordError = true; 
      } 
  } 

  $("#conpasscheck").hide(); 
  $("#conpassword").keyup(function () { 
      validateConfirmPassword(); 
  }); 
  function validateConfirmPassword() { 
      let confirmPasswordValue = $("#conpassword").val(); 
      let passwordValue = $("#password").val(); 
      if (passwordValue != confirmPasswordValue) { 
          $("#conpasscheck").show(); 
          $("#conpasscheck").html("Password didn't match"); 
          $("#conpasscheck").css("color", "red"); 
          confirmPasswordError = false; 
          return false; 
      } else { 
          $("#conpasscheck").hide(); 
          confirmPasswordError = true; 
      } 
  } 

  $("#submitbtn").click(function (event) { 
      event.preventDefault(); 

      if ($("#password").val() !== $("#conpassword").val()) {
          $("#conpasscheck").show(); 
          $("#conpasscheck").html("Password didn't match"); 
          $("#conpasscheck").css("color", "red"); 
          return false;
      } else {
          $("#conpasscheck").hide(); 
          validateUsername(); 
          validatePassword(); 
          validateConfirmPassword(); 
          validateEmail(); 
          if ( 
              usernameError == true && 
              passwordError == true && 
              confirmPasswordError == true && 
              emailError == true
          ) { 
              var formData = {
                  username: $("#usernames").val(),
                  email: $("#email").val(),
                  password: $("#password").val()
              };

              $.ajax({
                  type: "POST",
                  url: "https://httpbin.org/post",
                  data: JSON.stringify(formData),
                  contentType: "application/json",
                  success: function(response) {
                      // Prikaz uspešne poruke
                      $("#success-message").text("Data is successfully saved!");
                      $("#success-message").show();
                  },
                  error: function() {
                      // Prikaz poruke o grešci
                      $("#success-message").text("There was an error saving your data.");
                      $("#success-message").show();
                  }
              });
          } else { 
              return false; 
          }
      }
  });
});

// NOTIFIKACIJA

$(document).ready(function () {
  if ($("body").text().trim() !== "") {
      toastr["success"]("Successful loading");
  } else {
      toastr["error"]("Failed loading");
  }
});

// PRODUCT LISTING

$(document).ready(function () {
  $.ajax({
    url: 'data.json', 
    method: 'GET',
    dataType: 'json',
    success: function(data) {
      var productList = $('#product-list');
      data.forEach(function(product) {
        var productHtml = `
          <div class="product">
            <div class="product-info">
              <h2 class="product-name">${product.name}</h2>
              <p class="product-description">${product.description}</p>
              <p class="product-price">${product.price}</p>
            </div>
            <div class ="product-img-btn">
              <img src="${product.image}" alt="${product.name}" class="product-image">
              <button class="products-btn" data-url="${product.detailsUrl}">MORE</button>
            </div>
          </div>
        `;
        productList.append(productHtml);
      });
      
      $('.products-btn').click(function() {
        var productUrl = $(this).data('url');
        window.location.href = productUrl;
      });
    },
    error: function(error) {
      console.error('Error loading product listings:', error);
    }
  });
});


// VIEW MORE

document.getElementById('view-more').addEventListener('click', function() {
    var detailsDiv = document.getElementById('details');
    if (detailsDiv.style.display === 'none') {
        detailsDiv.style.display = 'block'; 
        this.textContent = 'View Less'; 
    } else {
        detailsDiv.style.display = 'none'; 
        this.textContent = 'View More'; 
    }
});

// EDIT & DELETE

fetch('countries.json')
  .then(response => response.json())
  .then(data => {
    displayCountries(data);
  })
  .catch(error => console.error('Error loading JSON file:', error));

function displayCountries(countries) {
  const footerContent = document.getElementById('country-content');
  let remainingCountries = countries.length; 

  countries.forEach((country, index) => {
    const continentSelector = document.createElement('div');
    continentSelector.classList.add('country-selector');

    const countryText = document.createElement('p');
    countryText.classList.add('country-text');
    countryText.innerHTML = `${country.continent} - <span contenteditable="true">${country.country}</span>`;

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('country-btn');
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = function() {
      deleteCountry(continentSelector);
      remainingCountries--;
      checkRemainingCountries();
    };

    continentSelector.appendChild(countryText);
    continentSelector.appendChild(deleteBtn);
    footerContent.appendChild(continentSelector);
  });

  function checkRemainingCountries() {
    if (remainingCountries === 1) {
      const deleteButtons = document.querySelectorAll('.country-btn');
      deleteButtons.forEach(button => {
        button.style.display = 'none';
      });

      const sendBtn = document.createElement('button');
      sendBtn.textContent = 'Send';
      sendBtn.classList = 'send-btn';
      sendBtn.onclick = function() {
        sendLastCountry();
      };
      footerContent.appendChild(sendBtn);
    }
  }
}

function deleteCountry(countrySelector) {
  countrySelector.remove();  
}

function sendLastCountry() {
  alert('Thank you for your response!');
}
