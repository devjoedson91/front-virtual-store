import React, { useEffect } from 'react';
import logo from '../../../public/logo.png';
import Link from 'next/link';
import styles from './styles.module.scss';
import { MdShoppingBasket } from 'react-icons/md';
import Slide from 'react-reveal/Slide';
import Zoom from 'react-reveal/Zoom';
import { useCart } from '../../hooks/useCart';

export default function NavBar() {

    const { cart } = useCart();
    const cartSize = cart.length;

    useEffect(() => {

        setTimeout(() => {

            const tabAnimation = document.querySelector('.tabAnimation');

            tabAnimation.classList.add(`${styles.animation}`);
            tabAnimation.classList.add(`${styles.startHome}`);

        }, 2000);

    }, []);

    return (
        <nav className={styles.nav}>

            <div>

                <a href="/">Home</a>
                <a href="/about">Sobre</a>
                <a href="/contact">Contato</a>
                <div className="tabAnimation"></div>

            </div>

            {/* <Link href="#">
                <img src="/icon.png" alt="logo" className={styles.logo} />
            </Link> */}

            <Link href="/cart">

                <div className={styles.cart}>
                    <div>
                        <strong>Meu carrinho</strong>
                        <span data-testid="cart-size">
                            {cartSize === 1 ? `${cartSize} item` : `${cartSize} itens`}
                        </span>
                    </div>
                    <MdShoppingBasket size={36} color="#FFF" />
                </div>

            </Link>

        </nav>

    );

}