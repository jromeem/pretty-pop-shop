import { useEffect, useState } from "react";
import { fetchProducts } from "./api-mock/products-api";
import { ShoppingCart } from "./ShoppingCart/ShoppingCart";
import { ProductList } from "./ProductList/ProductList";
import { useMediaQuery } from 'react-responsive';
import styles from "./App.css";

const App = () => {
  const [products, setProducts] = useState([]);
  const [basketItems, setBasketItems] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isDesktop = useMediaQuery({ query: '(min-width: 1000px)' });

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

  return (<div>{
    isDesktop ? 
        (<div className={styles.parentContainer}>
            <div className={styles.titleContainer}><h1>★★★ pretty pop (p.p.) shop ★★★</h1></div>
            <div className={styles.scrollContainer}>
            <ProductList products={products} addToBasket={addToBasket}/>
            </div>
            <div className={styles.fixedContainer}>
            <ShoppingCart basketItems={basketItems} clearBasket={clearBasket} hundoOfEverything={hundoOfEverything} />
            </div>
        </div>)
    :
        (<div id="grid" className={styles.parentContainerMobile} style={{gridTemplateRows: `${mobileMenuOpen ? '70vh' : '7vh'} 1fr`}}>
            <div id="title" className={styles.titleContainerMobile} onClick={() => setMobileMenuOpen(prev => !prev)}>
                <h2>★★★ p.p. shop ★★★</h2>
            </div>
            <div className={styles.scrollContainerMobile}>
                <ProductList products={products} addToBasket={addToBasket}/>
            </div>
            <div>
                <ShoppingCart basketItems={basketItems} clearBasket={clearBasket} hundoOfEverything={hundoOfEverything} />
            </div>


        </div>) 
    }</div>);
};

export default App;
