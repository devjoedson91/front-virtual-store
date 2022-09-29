import React, { useState, useEffect, useRef } from 'react';
import logo from '../../../public/logo.png';
import Link from 'next/link';
import styles from './styles.module.scss';
import { MdShoppingBasket, MdMenu, MdClose } from 'react-icons/md';
import Slide from 'react-reveal/Slide';
import Zoom from 'react-reveal/Zoom';
import { useCart } from '../../hooks/useCart';

export default function NavBar() {

    const { cart } = useCart();
    const cartSize = cart.length;
    const menuRef = useRef<HTMLDivElement>();
    const [activeMenu, setActiveMenu] = useState(false);

    useEffect(() => {

        setTimeout(() => {

            const tabAnimation = document.querySelector('.tabAnimation');

            tabAnimation.classList.add(`${styles.animation}`);
            tabAnimation.classList.add(`${styles.startHome}`);

        }, 2000);


    }, []);

    function toggleMenu(e) {

        const menu = menuRef.current;
        
        menu.classList.toggle(`${styles.active}`);

        const hasActive = menu.classList.contains(`${styles.active}`);

        setActiveMenu(hasActive);

    }

    return (
        <nav className={styles.nav}>

            <button className={styles.navButton} onClick={(e) => toggleMenu(e)}>
                {
                    activeMenu ? <MdClose size={36} color="#FFF" /> : 
                    <MdMenu size={36} color="#FFF" />
                }
            </button>

            <div className={styles.menu} ref={menuRef}>
                <a href="/">Home</a>
                <a href="/about">Sobre</a>
                <a href="/contact">Contato</a>
                <div className="tabAnimation"></div>
            </div>

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