import { useEffect, useState } from "react";
import { fetchProducts } from "../api-mock/products-api";
import styles from "./ProductList.css";

export const ProductList = () => {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    fetchProducts().then((products) => {
      console.log("Fetched the products", products);
      setProducts(products);
    });
  }, []);

  return (
      <div className={styles.productsContainer}>
        {products.map((product) => (
          <div className={styles.productItem} key={product.id}>
            <div>
              <img className={styles.productImage} src={`images/${product.image}`}/>
              <p>
                <span className={styles.productTitle}>{product.name}</span> <span className={styles.productPrice}>${product.price}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    );
};
