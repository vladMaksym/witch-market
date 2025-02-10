import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDqLVg9St-UnLkjebvbHfHIr_5MsNgIlNg",
  authDomain: "catalog-d1c1f.firebaseapp.com",
  databaseURL: "https://catalog-d1c1f-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "catalog-d1c1f",
  storageBucket: "catalog-d1c1f.firebasestorage.app",
  messagingSenderId: "911614976955",
  appId: "1:911614976955:web:afe36fd674db06ebcb9a9e",
  measurementId: "G-G87L02MM7S"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const Vendors = () => {
  const [vendors, setVendors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [detailedIndex, setDetailedIndex] = useState(null);

  useEffect(() => {
    const vendorsRef = ref(database, 'vendors');

    get(vendorsRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          setVendors(Object.values(snapshot.val()));
        } else {
          setVendors([]);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  const handleToggle = (index) => {
    setDetailedIndex(detailedIndex === index ? null : index);
  };

  if (isLoading) {
    return <p>Завантаження...</p>;
  }

  if (error) {
    return <p>Помилка: {error}</p>;
  }

  return (
    <section id="vendors">
      <h2>Торговці</h2>
      <div className="vendors-grid">
        {vendors && vendors.length > 0 ? (
          vendors.map((vendor, index) => {
            const isDetailed = detailedIndex === index;

            return (
              <div key={index} className={`vendor-card ${isDetailed ? "expanded" : ""}`}>
                <div className='text'>
                  <h3>{vendor.name}</h3>
                  <p>{isDetailed ? vendor.longDescription : vendor.shortDescription}</p>

                  <button onClick={() => handleToggle(index)}>
                    {isDetailed ? 'Згорнути' : 'Дивитись'}
                  </button>
                </div>

                <div className='img'>
                  <img src={process.env.PUBLIC_URL + "/" + vendor.image} alt={vendor.name} />

                  {isDetailed && vendor.socialLinks && (
                    <div className="social-links">
                      {vendor.socialLinks.instagram && (
                        <a href={vendor.socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                          <img src={process.env.PUBLIC_URL + "/" + "logo-instagram.svg"} alt="Instagram" />
                        </a>
                      )}
                      {vendor.socialLinks.telegram && (
                        <a href={vendor.socialLinks.telegram} target="_blank" rel="noopener noreferrer">
                          <img src={process.env.PUBLIC_URL + "/" + "logo-telegram.svg"} alt="Telegram" />
                        </a>
                      )}
                    </div>
                  )}
                </div>

              </div>
            );
          })
        ) : (
          <p>Немає торговців для відображення.</p>
        )}
      </div>

    </section>
  );
};

export default Vendors;
