import React, { useState, useEffect } from "react";
import Head from "next/head"
import Header from "../components/Header"
import styles from '../../styles/Home.module.scss';
import { MdAddShoppingCart } from 'react-icons/md';
import Fade from 'react-reveal/Fade';
import { useCart } from "../hooks/useCart";
import { formatPrice } from '../util/format';
import { api } from "../services/api";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface ProductFormatted extends Product {
  priceFormatted: string;
}

interface CartItemsAmount {
  [key: number]: number;
}

export default function Home() {

  const [products, setProducts] = useState<ProductFormatted[]>([]);

  const { addProduct, cart } = useCart();

  const cartItemsAmount = cart.reduce((sumAmount, product) => {

    const newSumAmount = { ...sumAmount };
    newSumAmount[product.id] = product.amount;
    return newSumAmount;

  }, {} as CartItemsAmount);

  useEffect(() => {

    console.log(cart);

    async function loadProducts() {

      const response = await api.get<Product[]>('/products');
      const data = response.data.map(product => ({

        ...product,
        priceFormatted: formatPrice(product.price)

      }));

      setProducts(data);

    }

    loadProducts();

  }, []);

  function handleAddProduct(id: number) {

    addProduct(id);

  }

  return (
    <>
      <Head>
        <title>Casa de Maria</title>
      </Head> 

      <Header />

      <div className={styles.page}>

        <section className={styles.products}>

          <ul className={styles.productList}>
            
              {
                products.map(product => {

                  return (
                    <Fade left>
                      <li key={product.id}>
                        <img src={product.image} alt={product.title} />
                        <strong>{product.title}</strong>
                        <span>{product.priceFormatted}</span>
                        <button
                          type="button"
                          data-testid="add-product-button"
                          onClick={() => handleAddProduct(product.id)}
                        >
                          <div data-testid="cart-product-quantity">
                            <MdAddShoppingCart size={16} color="#FFF" />
                            {cartItemsAmount[product.id] || 0}
                          </div>

                          <span>ADICIONAR AO CARRINHO</span>
                        </button>
                      </li>
                    </Fade>

                  )

                })
              }
            
          </ul>

        </section>

      </div>

    </>
  )
}
