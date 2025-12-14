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
