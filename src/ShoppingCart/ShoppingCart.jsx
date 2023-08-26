import { useEffect, useState } from "react";
import styles from "./ShoppingCart.css";

export const ShoppingCart = ({basketItems, clearBasket, hundoOfEverything}) => {
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const calculated = basketItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setTotalPrice(calculated);
    }, [basketItems]);

    return (<div className={styles.basketContainer}>
        <div className={styles.weirdMenu}>
            <span onClick={() => clearBasket()}>start over</span>
            <span onClick={() => hundoOfEverything()}>100 more</span>
        </div>
        <br />
        <div className={styles.basketList}>
            {
                basketItems.length < 1 ?
                    <div>you have nothing; you are nothing</div>
                :
                    basketItems.map((item, index) => {
                        return <div key={index}>{item.name} x {item.quantity}</div>;
                })
            }
        </div>
        <br />
        <div className={styles.totalPrice}>
            total: ${totalPrice.toFixed(2)}
        </div>
    </div>
    );
};