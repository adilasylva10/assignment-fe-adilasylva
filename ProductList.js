// Tandai sebagai Client Component agar bisa menggunakan Hooks
"use client"; 

import { useState, useMemo } from 'react';
import ProductCard from './ProductCard';
import styles from './ProductList.module.css';

export default function ProductList({ initialProducts, categories }) {
  // State untuk menyimpan input dari pengguna
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortOrder, setSortOrder] = useState('default');

  // Gunakan useMemo untuk mengoptimalkan proses filter & sort
  // Logika ini hanya akan berjalan kembali jika salah satu dependensinya berubah
  const filteredProducts = useMemo(() => {
    let products = [...initialProducts];

    // 1. Proses Filter Kategori
    if (selectedCategory !== 'all') {
      products = products.filter(product => product.category === selectedCategory);
    }

    // 2. Proses Filter Pencarian (berdasarkan judul)
    if (searchTerm) {
      products = products.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 3. Proses Sorting Harga
    if (sortOrder === 'cheapest') {
      products.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'most-expensive') {
      products.sort((a, b) => b.price - a.price);
    }
    
    return products;
  }, [searchTerm, selectedCategory, sortOrder, initialProducts]);

  return (
    <div>
      {/* Bar untuk kontrol filter, search, dan sort */}
      <div className={styles.controls}>
        <input
          type="text"
          placeholder="Cari produk..."
          className={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <select 
          className={styles.select}
          value={selectedCategory} 
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">Semua Kategori</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>

        <select 
          className={styles.select}
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="default">Urutkan</option>
          <option value="cheapest">Harga Termurah</option>
          <option value="most-expensive">Harga Termahal</option>
        </select>
      </div>

      {/* Grid untuk menampilkan produk */}
      {filteredProducts.length > 0 ? (
        <div className={styles.productGrid}>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className={styles.noResults}>Produk tidak ditemukan.</p>
      )}
    </div>
  );
}