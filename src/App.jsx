import { useEffect, useState } from "react";
import { fetchProducts } from "./api-mock/products-api";

const App = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetchProducts().then((products) => {
      console.log("Fetched the products", products);
      setProducts(products);
    });
  });
  return (
    <div>
      <h1>Hello! Here are the available products:</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <div>
              <p>
                {product.name} ( price: ${product.price})
              </p>
              <img src={`images/${product.image}`} width="200px" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
