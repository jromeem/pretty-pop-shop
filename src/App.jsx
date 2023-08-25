import { useEffect, useState } from "react";
import { fetchProducts } from "./api-mock/products-api";
import { ShoppingCart } from "./ShoppingCart/ShoppingCart";
import { ProductList } from "./ProductList/ProductList";
import styles from "./App.css";

const App = () => {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    fetchProducts().then((products) => {
      console.log("Fetched the products", products);
      setProducts(products);
    });
  }, []);


  return (<div className={styles.parentContainer}>
    <div className={styles.titleContainer}>this is the title</div>
    <div className={styles.scrollContainer}>
      <ProductList />
    </div>
    <div className={styles.fixedContainer}>
      <ShoppingCart />
    </div>
  </div>);
};

export default App;
