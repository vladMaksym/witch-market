import React, { useState, useEffect } from 'react';

function Catalog({ updateBasket }) {
  const [items, setItems] = useState([]);
  const [visibleIndex, setVisibleIndex] = useState(0);
  const pageSize = 8;

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + '/catalog.json')
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) => console.error('Помилка завантаження каталогу:', error));
  }, []);

  const handleNext = () => {
    if (visibleIndex + pageSize < items.length) {
      setVisibleIndex(visibleIndex + pageSize);
    }
  };

  const handlePrev = () => {
    if (visibleIndex - pageSize >= 0) {
      setVisibleIndex(visibleIndex - pageSize);
    }
  };

  // Додаємо товар у кошик
  const handleBuy = (itemId) => {
    fetch('http://localhost:5000/buy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: itemId }),
    })
      .then(response => response.json())
      .then(updatedItem => {
        setItems(prevItems =>
          prevItems.map(item =>
            item.id === updatedItem.id ? { ...item, inBasket: true } : item
          )
        );
        updateBasket(updatedItem);
      })
      .catch(error => console.error('Помилка оновлення каталогу:', error));
  };

  // Видаляємо товар з кошика
  const handleRemoveFromBasket = (itemId) => {
    fetch('http://localhost:5000/remove', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: itemId }),
    })
      .then(response => response.json())
      .then(updatedItem => {
        setItems(prevItems =>
          prevItems.map(item =>
            item.id === updatedItem.id ? { ...item, inBasket: false } : item
          )
        );
        updateBasket(updatedItem);
      })
      .catch(error => console.error('Помилка видалення з кошика:', error));
  };

  return (
    <section id="items">
      <h2>Магічні предмети</h2>
      <div className="catalog-container">
        <button onClick={handlePrev} disabled={visibleIndex === 0}><img src={`${process.env.PUBLIC_URL}/Button7.svg`} /></button>
        <div className="catalog">
          {items.slice(visibleIndex, visibleIndex + pageSize).map((item) => (
            <div key={item.id} className="item">
              <img src={process.env.PUBLIC_URL + "/" + item.image} alt={item.name} />
              <div className='text-container'>
                <h3>{item.name}</h3>
                <p className='description'>{item.description}</p>
                <p className='price'>Ціна: {item.price}{item.inBasket ? (
                <button onClick={() => handleRemoveFromBasket(item.id)}><img src={`${process.env.PUBLIC_URL}/deletecart.svg`} /></button>
                ) : (
                  <button onClick={() => handleBuy(item.id)}><img src={`${process.env.PUBLIC_URL}/smallcart.svg`} /></button>
                )}</p>
              </div>
            </div>
          ))}
        </div>
        <button onClick={handleNext} disabled={visibleIndex + pageSize >= items.length}><img src={`${process.env.PUBLIC_URL}/Button6.svg`} /></button>
      </div>
    </section>
  );
}

export default Catalog;
