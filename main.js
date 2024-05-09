import './style.css';
import javascriptLogo from './javascript.svg';
import viteLogo from '/vite.svg';
import { setupCounter } from './counter.js';

document.addEventListener('DOMContentLoaded', function () {
  const filterSelect = document.getElementById('filter');
  const sortSelect = document.getElementById('sort');
  const mainContent = document.getElementById('main-content');

  // Function to fetch and display data
  function fetchData() {
    fetch('data/data.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        displayDrinks(data.drinks);
      })
      .catch(error => console.error('Failed to load the drink data:', error));
  }

  // Function to display drinks
  function displayDrinks(drinks) {
    const filteredDrinks = drinks.filter(drink => filterSelect.value === 'all' || drink.type === filterSelect.value);
    filteredDrinks.sort((a, b) => {
      if (sortSelect.value === 'newest') {
        return new Date(b.dateAdded) - new Date(a.dateAdded);
      }
      return b.popularity - a.popularity;
    });

    mainContent.innerHTML = filteredDrinks.map(drink => `
      <div>
        <h2>${drink.name}</h2>
        <picture>
          <source srcset="${drink.image}-large.jpg 2x, ${drink.image}-small.jpg" media="(min-width: 800px)">
          <img src="${drink.image}-small.jpg" alt="Picture of ${drink.name}" style="width:100px; height:auto;">
        </picture>
        <p>${drink.price}</p>
        <p>${drink.description}</p>
      </div>
    `).join('');
  }

  filterSelect.addEventListener('change', fetchData);
  sortSelect.addEventListener('change', fetchData);

  fetchData();  // Initial fetch of data

  // Setup dark/light theme toggle
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    document.body.className = event.matches ? 'theme-dark' : 'theme-light';
  });

  // Setup counter functionality
  const counterButton = document.querySelector('#counter');
  if (counterButton) {
    setupCounter(counterButton);
  }
});
