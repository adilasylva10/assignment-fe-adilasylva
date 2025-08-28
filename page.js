import ProductList from '../components/ProductList';
import styles from './page.module.css';

// Fungsi untuk mengambil SEMUA data produk & kategori
async function getData() {
  // Mengambil produk
  const productRes = await fetch('https://fakestoreapi.com/products');
  if (!productRes.ok) throw new Error('Gagal mengambil data produk');
  const products = await productRes.json();

  // Mengambil kategori
  const categoryRes = await fetch('https://fakestoreapi.com/products/categories');
  if (!categoryRes.ok) throw new Error('Gagal mengambil data kategori');
  const categories = await categoryRes.json();
  
  return { products, categories };
}

export default async function HomePage() {
  const { products, categories } = await getData();

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Produk Kami</h1>
      
      {/* Melemparkan data awal ke Client Component */}
      <ProductList initialProducts={products} categories={categories} />
    </main>
  );
}