import React, { useState, useEffect } from 'react';

const Basket = () => {
  const [basketItems, setBasketItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const fetchBasketItems = async () => {
    try {
      const response = await fetch(process.env.PUBLIC_URL + '/catalog.json');
      const data = await response.json();
      const inBasketItems = data.filter(item => item.inBasket);
      setBasketItems(inBasketItems);
    } catch (error) {
      console.error('Помилка при отриманні корзини:', error);
    }
  };

  const handleBasketClick = () => {
    fetchBasketItems();
    setIsOpen(!isOpen);
  };

  return (
    <button id="basket" onClick={handleBasketClick}>
      <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.3542 16.0937L4.43751 16.0937L5.78126 14.302L18.7708 14.302C19.1569 14.302 19.4983 14.0557 19.6201 13.6893L22.3076 5.62677C22.3999 5.35354 22.3533 5.05344 22.1849 4.81963C22.0165 4.58581 21.7459 4.44786 21.4583 4.44786L5.70422 4.44786L3.2792 2.02283C2.92893 1.67256 2.36276 1.67256 2.01249 2.02283C1.66222 2.37311 1.66222 2.93927 2.01249 3.28954L4.43751 5.71456L4.43751 13.107L1.92918 16.452C1.72493 16.7235 1.69268 17.0863 1.84407 17.39C1.99636 17.6936 2.30632 17.8854 2.64584 17.8854L22.3542 17.8854C22.8496 17.8854 23.25 17.484 23.25 16.9895C23.25 16.495 22.8496 16.0937 22.3542 16.0937Z" fill="white"/>
        <path d="M5.35417 23.2187C6.34368 23.2187 7.14583 22.4166 7.14583 21.427C7.14583 20.4375 6.34368 19.6354 5.35417 19.6354C4.36466 19.6354 3.5625 20.4375 3.5625 21.427C3.5625 22.4166 4.36466 23.2187 5.35417 23.2187Z" fill="white"/>
        <path d="M19.6459 23.2187C20.6354 23.2187 21.4375 22.4166 21.4375 21.427C21.4375 20.4375 20.6354 19.6354 19.6459 19.6354C18.6563 19.6354 17.8542 20.4375 17.8542 21.427C17.8542 22.4166 18.6563 23.2187 19.6459 23.2187Z" fill="white"/>
      </svg>

    {isOpen && (
      <div id="basket-items">
        {basketItems.length === 0 ? (
          <p>Корзина порожня</p>
        ) : (
          basketItems.map(item => (
            <div key={item.id} className="basket-item">
              <h3>{item.name}</h3>
              <h3>{item.price}</h3>
            </div>
          ))
        )}
      </div>
      )}
    </button>
  );
};

export default Basket;