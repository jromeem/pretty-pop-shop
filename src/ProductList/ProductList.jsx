import { useEffect, useState } from "react";
import { fetchProducts } from "../api-mock/products-api";
import { useMediaQuery } from 'react-responsive';
import styles from "./ProductList.css";

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandomPastelColor() {
  const redV = getRandomArbitrary(150, 250);
  const greenV = getRandomArbitrary(150, 250);
  const blueV = getRandomArbitrary(150, 250);
  return `rgba(${redV},${greenV},${blueV},1)`;
}

export const ProductList = ({products, addToBasket}) => {
  const isDesktop = useMediaQuery({ query: '(min-width: 1000px)' });


  return (
    <>
    { 
        isDesktop ?
        <div className={styles.productsContainer}>
            {products.map((product) => (
              <div className={styles.productItem} key={product.id} onClick={() => addToBasket(product)}>
                <div>
                  <img className={styles.productImage} style={{backgroundColor: `${getRandomPastelColor()}`}} src={`images/${product.image}`}/>
                  <div>
                    <div className={styles.productTitle}>{product.name}</div>
                    <div className={styles.productPriceBurst}></div>
                    <div className={styles.productPrice}>${product.price}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        :
        <div className={styles.productsContainerMobile}>
            {products.map((product) => (
              <div className={styles.productItemMobile} key={product.id} onClick={() => addToBasket(product)}>
                <div>
                  <img className={styles.productImage} style={{backgroundColor: `${getRandomPastelColor()}`}} src={`images/${product.image}`}/>
                  <div>
                    <div className={styles.productTitle}>{product.name}</div>
                    <div className={styles.productPriceBurst}></div>
                    <div className={styles.productPrice}>${product.price}</div>
                  </div>
                </div>
              </div>
            ))}
        
        </div>
    }
    </>
    );
};
