import { useEffect, useState } from "react";
import { fetchProducts } from "./api-mock/products-api";
import { ShoppingCart } from "./ShoppingCart";
import { ProductList } from "./ProductList";
import styles from "./App.css";

const App = () => {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    fetchProducts().then((products) => {
      console.log("Fetched the products", products);
      setProducts(products);
    });
  }, []);


  return (<div id="wow" className={styles.App}>
    <ProductList />
    <ShoppingCart />
  </div>);
};

export default App;
