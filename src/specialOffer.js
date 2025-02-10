import React, { useState, useEffect } from 'react';

function Offer({ itemId, updateBasket }) {
    const [item, setItem] = useState(null);
    const [timeLeft, setTimeLeft] = useState(0);
    
    const targetDate = new Date('2025-02-17T00:00:00').getTime();

    useEffect(() => {
        fetch(process.env.PUBLIC_URL + '/catalog.json')
        .then((response) => response.json())
        .then((data) => {
            const foundItem = data.find((item) => item.id === itemId);
            setItem(foundItem);
        })
        .catch((error) => console.error('Помилка завантаження каталогу:', error));
    }, [itemId]);

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const remainingTime = Math.max(targetDate - now, 0) / 1000;
            setTimeLeft(remainingTime);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);
        return `${hours} год ${minutes} хв ${secs} сек`;
    };

    const handleBuy = () => {
        fetch('http://localhost:5000/buy', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: itemId }),
        })
        .then(response => response.json())
        .then(updatedItem => {
            setItem(prevItem => ({ ...prevItem, inBasket: true }));
            updateBasket(updatedItem);
        })
        .catch(error => console.error('Помилка додавання в кошик:', error));
    };

    const handleRemoveFromBasket = () => {
        fetch('http://localhost:5000/remove', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: itemId }),
        })
        .then(response => response.json())
        .then(updatedItem => {
            setItem(prevItem => ({ ...prevItem, inBasket: false }));
            updateBasket(updatedItem);
        })
        .catch(error => console.error('Помилка видалення з кошика:', error));
    };

    if (!item) return <p>Завантаження...</p>;

    return (
        <section id="offers">
            <h2>Спеціальні пропозиції</h2>
            <div className="offer-content">
                
                <div className="offer-details">
                    <h2 className="offer-name">{item.name}</h2>
                    <p className="old-price">{item.oldPrice}</p>
                    <p className="new-price">{item.price}</p>
                </div>
                
                <img src={process.env.PUBLIC_URL + "/" + item.image} alt={item.name} />

                <div className="offer-details-2">
                    <p>До кінця акції:</p>
                    <div className="countdown">До кінця акції: {formatTime(timeLeft)}</div>
                    {item.inBasket ? (
                        <button className="basket-btn remove" onClick={handleRemoveFromBasket}>Видалити з кошика</button>
                    ) : (
                        <button className="basket-btn add" onClick={handleBuy}>Додати до кошика</button>
                    )}
                </div>

            </div>
        </section>
    );
}

export default Offer;
