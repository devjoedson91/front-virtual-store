import React from 'react';
import { MdDelete, MdAddCircleOutline, MdRemoveCircleOutline } from 'react-icons/md';
import NavBar from '../../components/NavBar';
import { useCart } from '../../hooks/useCart';
import { formatPrice } from '../../util/format';
import styles from './styles.module.scss';

interface Product {
    id: number;
    title: string;
    price: number;
    image: string;
    amount: number;
}

export default function Cart() {

    const { cart, removeProduct, updateProductAmount } = useCart();

    const cartFormatted = cart.map(product => ({

        ...product,
        priceFormatted: formatPrice(product.price),
        subTotal: formatPrice(product.amount * product.price)

    }));

    const total = formatPrice(
        cart.reduce((sumTotal, product) => {
            return sumTotal += product.amount * product.price;
        }, 0)
    );

    function handleProductIncrement(product: Product) {
        updateProductAmount({ productId: product.id, amount: product.amount + 1 });
    }

    function handleProductDecrement(product: Product) {
        updateProductAmount({ productId: product.id, amount: product.amount - 1 });
    }

    function handleRemoveProduct(productId: number) {
        removeProduct(productId);
    }

    return (
        <div className={styles.cartContainer}>
            <NavBar />
            <div className={styles.container}>
                <table className={styles.productTable}>
                    <thead>
                        <tr>
                            <th aria-label="product image" />
                            <th>PRODUTO</th>
                            <th>QTD</th>
                            <th>SUBTOTAL</th>
                            <th aria-label="delete icon" />
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cartFormatted.map(product => {

                                return (
                                    <tr key={product.id} data-testid="product">
                                        <td>
                                            <img src={product.image} alt={product.title} />
                                        </td>
                                        <td>
                                            <strong>{product.title}</strong>
                                            <span>{product.priceFormatted}</span>
                                        </td>
                                        <td>
                                            <div>
                                                <button
                                                    type="button"
                                                    data-testid="decrement-product"
                                                    disabled={product.amount <= 1}
                                                    onClick={() => handleProductDecrement(product)}
                                                >
                                                    <MdRemoveCircleOutline size={20} />
                                                </button>
                                                <input
                                                    type="text"
                                                    data-testid="product-amount"
                                                    readOnly
                                                    value={product.amount}
                                                />
                                                <button
                                                    type="button"
                                                    data-testid="increment-product"
                                                    onClick={() => handleProductIncrement(product)}
                                                >
                                                    <MdAddCircleOutline size={20} />
                                                </button>
                                            </div>
                                        </td>
                                        <td>
                                            <strong>{product.subTotal}</strong>
                                        </td>
                                        <td>
                                            <button
                                                type="button"
                                                data-testid="remove-product"
                                                onClick={() => handleRemoveProduct(product.id)}
                                            >
                                                <MdDelete size={20} />
                                            </button>
                                        </td>
                                    </tr>
                                );

                            })

                        }
                    </tbody>
                </table>
                <footer>
                    <button type="button">Finalizar pedido</button>

                    <div className={styles.total}>
                        <span>TOTAL</span>
                        <strong>{total}</strong>
                    </div>
                </footer>
            </div>
        </div>

    );


}