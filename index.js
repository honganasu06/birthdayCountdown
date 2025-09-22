"use strict";

// Elements
const happyContainer = document.querySelector('.happy__content'); 
const countdownContainer = document.querySelector('.countdown__content'); 
const subline = document.querySelector('.subline h2');
const day = document.querySelector('.days');
const hour = document.querySelector('.hours');
const minute = document.querySelector('.minutes');
const second = document.querySelector('.seconds');

// Birthday setup
const today = new Date();
const nextBirthday = new Date(today.getFullYear(), 9, 14); // 14 Oct (month is 0-indexed)
let birthday = nextBirthday > today ? nextBirthday : new Date(today.getFullYear()+1, 9, 14);

// Show in subline
subline.textContent = `remaining days for the blast ${birthday.toDateString()}`;

// Make distanceOfTime global for Canvas.js
let distanceOfTime;

// Countdown interval (every second)
setInterval(() => {
  const now = new Date().getTime();
  distanceOfTime = birthday.getTime() - now;

  const days = Math.floor(distanceOfTime / (1000*60*60*24));
  const hours = Math.floor((distanceOfTime % (1000*60*60*24)) / (1000*60*60));
  const minutes = Math.floor((distanceOfTime % (1000*60*60)) / (1000*60));
  const seconds = Math.floor((distanceOfTime % (1000*60)) / 1000);

  day.textContent = days;
  hour.textContent = hours;
  minute.textContent = minutes;
  second.textContent = seconds;

  if(distanceOfTime < 0){
    countdownContainer.style.display = 'none';
    happyContainer.style.display = 'block';
  } else {
    countdownContainer.style.display = 'block';
    happyContainer.style.display = 'none';
  }

  // expose globally
  window.distanceOfTime = distanceOfTime;
}, 1000);
