import { useEffect, useState } from "react";
import { fetchProducts } from "./api-mock/products-api";
import { ShoppingCart } from "./ShoppingCart/ShoppingCart";
import { ProductList } from "./ProductList/ProductList";
import styles from "./App.css";

const App = () => {
  const [products, setProducts] = useState([]);
  const [basketItems, setBasketItems] = useState([]);

  const addToBasket = (product) => {
    const existingProduct = basketItems.find((item) => item.name === product.name);
    if (existingProduct) {
      setBasketItems(prevBasketItems => {
        return prevBasketItems.map((item) => {
          return item.name === product.name ? { ...item, quantity: item.quantity + 1 } : item;
      })});
    } else {
      setBasketItems(prevBasketItems => [...prevBasketItems, {name: product.name, quantity: 1, price: product.price}]);
    }
  }

  const addByAmount = (product, amount) => {
    const existingProduct = basketItems.find((item) => item.name === product.name);
    if (existingProduct) {
      setBasketItems(prevBasketItems => {
        return prevBasketItems.map((item) => {
          return item.name === product.name ? { ...item, quantity: item.quantity + amount } : item;
      })});
    } else {
      setBasketItems(prevBasketItems => [...prevBasketItems, {name: product.name, quantity: amount, price: product.price}]);
    }
  }

  const hundoOfEverything = () => {
    products.forEach((product) => {
      addByAmount(product, 100);
    });
  }

  const clearBasket = () => {
    setBasketItems([]);
  }
  
  useEffect(() => {
    fetchProducts().then((products) => {
      console.log("Fetched the products", products);
      setProducts(products);
    });
  }, []);

  return (<div className={styles.parentContainer}>
    <div className={styles.titleContainer}><h1>★★★ pretty pop (p.p.) shop ★★★</h1></div>
    <div className={styles.scrollContainer}>
      <ProductList products={products} addToBasket={addToBasket}/>
    </div>
    <div className={styles.fixedContainer}>
      <ShoppingCart basketItems={basketItems} clearBasket={clearBasket} hundoOfEverything={hundoOfEverything} />
    </div>
  </div>);
};

export default App;
