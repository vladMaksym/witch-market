import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import './App.css';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDqLVg9St-UnLkjebvbHfHIr_5MsNgIlNg",
  authDomain: "catalog-d1c1f.firebaseapp.com",
  projectId: "catalog-d1c1f",
  storageBucket: "catalog-d1c1f.firebasestorage.app",
  messagingSenderId: "911614976955",
  appId: "1:911614976955:web:afe36fd674db06ebcb9a9e",
  measurementId: "G-G87L02MM7S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <header id="header" className={`header ${scrolled ? 'scrolled' : ''}`}>
        <svg width="63" height="63" viewBox="0 0 63 63" fill="none" xmlns="http://www.w3.org/2000/svg" class="logo">
          <g clip-path="url(#clip0_48_208)">
          <path d="M61.0454 31.5C61.0454 47.8176 47.8175 61.0455 31.5 61.0455C15.1825 61.0455 1.95453 47.8176 1.95453 31.5C1.95453 15.1825 15.1825 1.95459 31.5 1.95459C47.8175 1.95459 61.0454 15.1825 61.0454 31.5Z" stroke="#743093" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M31.5 4.77271V58.2272" stroke="#743093" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M4.77271 58.2273H58.2272" stroke="#743093" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M31.5 4.77271L58.2273 58.2272" stroke="#743093" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M31.5 4.77271L4.77271 58.2272" stroke="#743093" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M34.3182 31.4999C34.3182 33.0564 33.0564 34.3181 31.5 34.3181C29.9436 34.3181 28.6818 33.0564 28.6818 31.4999C28.6818 29.9435 29.9436 28.6818 31.5 28.6818C33.0564 28.6818 34.3182 29.9435 34.3182 31.4999Z" stroke="#743093" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M37.369 22.7873H25.6936C27.668 21.8255 29.6126 21.3595 31.5319 21.3595C33.4513 21.3595 35.3955 21.8255 37.369 22.7873Z" stroke="#743093" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M18.7522 36.3182H44.2478C39.9011 40.1349 35.6545 41.9556 31.5 41.9556C27.3455 41.9556 23.099 40.1349 18.7522 36.3182Z" stroke="#743093" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </g>
          <defs>
          <clipPath id="clip0_48_208">
          <rect width="63" height="63" fill="white"/>
          </clipPath>
          </defs>
        </svg>
        <a href="#header"><p class="logo-text">Witch Market</p></a>
        <nav>
          <ul>
            <li>
              <a href="#header">
                <h3><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.602 9.89797C21.602 9.17797 21.302 4.79797 21.302 4.79797C21.302 4.07797 21.062 3.65797 20.702 3.29797C20.402 2.99797 19.922 2.69797 19.202 2.69797C19.202 2.69797 14.822 2.39797 14.102 2.39797C13.022 2.39797 12.362 2.33797 11.042 3.71797C10.382 4.37797 3.24201 11.518 2.94201 11.818C2.64201 12.118 1.62201 13.318 3.36201 15.058L9.00201 20.698C10.742 22.438 11.942 21.418 12.242 21.118C12.542 20.818 19.682 13.678 20.342 13.018C21.662 11.638 21.602 10.918 21.602 9.89797ZM13.982 12.238L16.442 13.378L15.542 14.998L13.262 13.498C13.202 13.438 13.142 13.438 13.082 13.438C13.022 13.438 12.962 13.438 12.902 13.498C12.782 13.558 12.722 13.678 12.722 13.798L12.902 16.498L11.102 16.498L11.222 13.798C11.222 13.678 11.162 13.558 11.042 13.498C10.922 13.438 10.802 13.438 10.742 13.498L8.64201 14.998L7.68201 13.438L10.142 12.238C10.262 12.178 10.322 12.058 10.322 11.938C10.322 11.818 10.262 11.698 10.142 11.638L7.68201 10.498L8.58201 8.87797L10.862 10.378C10.982 10.438 11.102 10.438 11.162 10.378C11.282 10.318 11.342 10.198 11.342 10.078L11.162 7.37797L12.962 7.37797L12.842 10.078C12.842 10.198 12.902 10.318 13.022 10.378C13.142 10.438 13.262 10.438 13.322 10.378L15.542 8.87797L16.502 10.438L14.042 11.638C13.922 11.698 13.862 11.818 13.862 11.938C13.802 12.058 13.862 12.178 13.982 12.238ZM18.182 7.07797C17.522 7.07797 17.042 6.53797 17.042 5.93797C17.042 5.27797 17.582 4.79797 18.182 4.79797C18.842 4.79797 19.322 5.33797 19.322 5.93797C19.322 6.59797 18.782 7.07797 18.182 7.07797Z" fill="white"/>
                </svg>
                Про ринок</h3>
              </a>
            </li>
            <li>
              <a href="#items">
                <h3><svg width="23" height="24" viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 9.41992L13.58 11.9999" stroke="white" stroke-width="2.064" stroke-miterlimit="10"/>
                <path d="M18.226 6.40796L14.614 6.40796L14.614 22.232H18.226L18.226 6.40796Z" stroke="white" stroke-width="2.064" stroke-miterlimit="10" stroke-linecap="square"/>
                <path d="M13.57 3.42995V2.56995" stroke="white" stroke-width="2.064" stroke-miterlimit="10" stroke-linecap="square"/>
                <path d="M19.57 9.42993H20.43" stroke="white" stroke-width="2.064" stroke-miterlimit="10" stroke-linecap="square"/>
                </svg>
                Магічні предмети</h3>
              </a>
            </li>
            <li>
              <a href="#traders">
                <h3><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.84732 11.9269C9.7424 12.8995 9.28746 15.0771 7.3 15.7393C4.72 16.5993 3 17.5668 3 20.8993L20.2 20.8993C20.2 17.5668 18.48 16.5993 15.9 15.7393C13.9117 15.0762 13.4576 12.8995 13.3527 11.9269" stroke="white" stroke-width="2.064" stroke-miterlimit="10" stroke-linecap="round"/>
                <path d="M11.6 12.32C9.22554 12.32 7.3 10.3945 7.3 8.02L7.3 6.3C7.3 3.92554 9.22554 2 11.6 2C13.9745 2 15.9 3.92554 15.9 6.3L15.9 8.02C15.9 10.3945 13.9745 12.32 11.6 12.32Z" stroke="white" stroke-width="2.064" stroke-miterlimit="10" stroke-linecap="round"/>
                </svg>
                Торговці</h3>
              </a>
            </li>
            <li>
              <a href="#reviews">
                <h3><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 4.26001L13.9178 10.28L19.74 10.28L15.1132 13.8318L17.031 19.74L12 16.085L6.969 19.74L8.8868 13.8318L4.26 10.28L10.0822 10.28L12 4.26001Z" stroke="white" stroke-width="2.064" stroke-miterlimit="10" stroke-linecap="square"/>
                </svg>
                Відгуки</h3>
              </a>
            </li>
            <li>
              <a href="#offers">
                <h3><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.6198 13.6241L18.8802 7.69006L5.12021 7.69006L3.40021 21.4501L17.1602 21.4501" stroke="white" stroke-width="2.064" stroke-miterlimit="10"/>
                <path d="M17.14 15.4301V17.1501H18.86" stroke="white" stroke-width="2.064" stroke-miterlimit="10" stroke-linecap="square"/>
                <path d="M17.14 21.4401C19.5148 21.4401 21.44 19.5149 21.44 17.1401C21.44 14.7653 19.5148 12.8401 17.14 12.8401C14.7652 12.8401 12.84 14.7653 12.84 17.1401C12.84 19.5149 14.7652 21.4401 17.14 21.4401Z" stroke="white" stroke-width="2.064" stroke-miterlimit="10" stroke-linecap="square"/>
                <path d="M8.56001 10.3001L8.56001 6.00006C8.56001 4.10806 10.108 2.56006 12 2.56006C13.892 2.56006 15.44 4.10806 15.44 6.00006L15.44 10.3001" stroke="white" stroke-width="2.064" stroke-miterlimit="10" stroke-linecap="round"/>
                </svg>
                Спеціальні пропозиції</h3>
              </a>
            </li>
            <li>
              <a href="#contact">
                <h3><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.27421 2.40432C5.19309 2.03879 5.8167 1.95798 6.80647 2.40432C7.79625 2.85067 8.51091 4.11796 8.70567 5.52712C8.77246 6.01043 8.7561 6.29092 8.70566 6.77616C8.56982 8.08277 7.4395 8.64983 7.43953 9.89895C7.43955 11.1481 11.871 14.2709 11.871 14.2709C11.871 14.2709 14.3091 16.142 14.4032 16.1445C14.4973 16.1471 15.8211 15.0521 16.3024 14.8954C16.7838 14.7387 17.0983 14.7693 17.5686 14.8954L17.5872 14.9033C19.7766 15.8299 22 16.7709 22 17.3937C22 18.0182 21.5558 19.4372 20.7339 20.5165C19.8796 21.972 18.7772 22.2851 16.9355 21.7656C12.3758 19.5558 6.1734 13.6463 6.1734 13.6463C6.1734 13.6463 2.88624 10.421 2.37502 8.02528C2.06944 6.59324 1.79765 5.41712 2.37502 4.27794C2.55508 3.92267 3.30614 2.78943 4.27421 2.40432Z" stroke="white" stroke-width="2"/>
                </svg>
                Контакти</h3>
              </a>
            </li>
          </ul>
        </nav>
        <button id="basket">
          <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.3542 16.0937L4.43751 16.0937L5.78126 14.302L18.7708 14.302C19.1569 14.302 19.4983 14.0557 19.6201 13.6893L22.3076 5.62677C22.3999 5.35354 22.3533 5.05344 22.1849 4.81963C22.0165 4.58581 21.7459 4.44786 21.4583 4.44786L5.70422 4.44786L3.2792 2.02283C2.92893 1.67256 2.36276 1.67256 2.01249 2.02283C1.66222 2.37311 1.66222 2.93927 2.01249 3.28954L4.43751 5.71456L4.43751 13.107L1.92918 16.452C1.72493 16.7235 1.69268 17.0863 1.84407 17.39C1.99636 17.6936 2.30632 17.8854 2.64584 17.8854L22.3542 17.8854C22.8496 17.8854 23.25 17.484 23.25 16.9895C23.25 16.495 22.8496 16.0937 22.3542 16.0937Z" fill="white"/>
          <path d="M5.35417 23.2187C6.34368 23.2187 7.14583 22.4166 7.14583 21.427C7.14583 20.4375 6.34368 19.6354 5.35417 19.6354C4.36466 19.6354 3.5625 20.4375 3.5625 21.427C3.5625 22.4166 4.36466 23.2187 5.35417 23.2187Z" fill="white"/>
          <path d="M19.6459 23.2187C20.6354 23.2187 21.4375 22.4166 21.4375 21.427C21.4375 20.4375 20.6354 19.6354 19.6459 19.6354C18.6563 19.6354 17.8542 20.4375 17.8542 21.427C17.8542 22.4166 18.6563 23.2187 19.6459 23.2187Z" fill="white"/>
          </svg>
        </button>
      </header>
        
      <section id="hero">
        <h1>Відьомський ринок</h1>
        <h3>Таємничий світ зілля, артефактів та чаклунських передбачень чекає на вас. Тут сплітаються древні знання і магічні таємниці, доступні лише обраним. Відчуйте енергію зачарованих предметів, які зберігають силу століть. Досліджуйте ринок, де кожен куточок приховує історію, а кожен вибір може змінити вашу долю.</h3>
        <button>
          <Link 
            to="items" 
            smooth={true} 
            duration={500}
          >
            Досліди зараз
          </Link>
        </button>
      </section>

      <section id="items">
        <h2>Магічні предмети</h2>
        <div class="items-grid">

        </div>
      </section>

      <section id="traders">
        <h2>Торговці</h2>
        <div class="traders-grid">

        </div>
      </section>

      <section id="reviews">
        <h2>Відгуки покупців</h2>
        <div class="reviews-list">

        </div>
      </section>

      <section id="offers">
        <h2>Спеціальні пропозиції</h2>
        <div class="offers-list">

        </div>
      </section>

      <section id="contact">
        <h2>Контакти</h2>
        <p>Як знайти та зв’язатися з ринком.</p>
        <div class="map-container">

        </div>
        <div class="fortune-ball">
          <p>Натисніть на чарівну кулю, щоб отримати передбачення!</p>
        </div>
      </section>

      <footer>
        <p>© 2025 Відьомський ринок. Усі права захищено.</p>
      </footer></>
    );
}

export default App;