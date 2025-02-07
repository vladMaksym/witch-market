import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const Catalog = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [category, setCategory] = useState("all");
  const [scrollIndex, setScrollIndex] = useState(0);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchItems = async () => {
      const querySnapshot = await getDocs(collection(db, "items"));
      const itemsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setItems(itemsList);
      setFilteredItems(itemsList);
    };
    fetchItems();
  }, []);

  useEffect(() => {
    if (category === "all") {
      setFilteredItems(items);
    } else {
      setFilteredItems(items.filter(item => item.category === category));
    }
  }, [category, items]);

  const handleScroll = (direction) => {
    if (direction === "left" && scrollIndex > 0) {
      setScrollIndex(scrollIndex - 1);
    } else if (direction === "right" && scrollIndex < Math.ceil(filteredItems.length / itemsPerPage) - 1) {
      setScrollIndex(scrollIndex + 1);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Магічні предмети</h2>
      <div className="flex gap-4 mb-4">
        {['all', 'amulets', 'potions', 'books'].map(cat => (
          <button key={cat} className={`px-4 py-2 rounded ${category === cat ? 'bg-blue-500 text-white' : 'bg-gray-200'}`} onClick={() => setCategory(cat)}>
            {cat}
          </button>
        ))}
      </div>
      <div className="relative overflow-hidden">
        <button onClick={() => handleScroll("left")} className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 text-white px-2 py-1 rounded">←</button>
        <motion.div className="flex gap-4 transition-transform" style={{ transform: `translateX(-${scrollIndex * 100}%)` }}>
          {filteredItems.slice(scrollIndex * itemsPerPage, (scrollIndex + 1) * itemsPerPage).map(item => (
            <motion.div key={item.id} className="p-4 border rounded shadow bg-white" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h3 className="font-semibold">{item.name}</h3>
              <p>{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
        <button onClick={() => handleScroll("right")} className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 text-white px-2 py-1 rounded">→</button>
      </div>
    </div>
  );
};

export default Catalog;
