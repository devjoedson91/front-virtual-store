import {createContext, ReactNode, useContext, useEffect, useRef, useState} from 'react';
import { api } from '../services/api';
import { Product, Stock } from '../types';
import { toast } from 'react-toastify';

interface CartProviderProps {
    children: ReactNode;
}

interface UpdateProductAmount {
    productId: number;
    amount: number;
}

interface CartContextData {
    cart: Product[];
    addProduct: (productId: number) => Promise<void>;
    removeProduct: (productId: number) => void;
    updateProductAmount: ({productId, amount}: UpdateProductAmount) => void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({children}: CartProviderProps): JSX.Element {

    const [cart, setCart] = useState<Product[]>([]);

    useEffect(() => {

        const storagedCart = localStorage.getItem('virtual@store');

        if (storagedCart) {
            setCart(JSON.parse(storagedCart));
        }

    }, []);
  
    const prevCartRef = useRef<Product[]>();

    useEffect(() => {

        prevCartRef.current = cart;

    });

    const cartPreviousValue = prevCartRef.current ?? cart;

    useEffect(() => {
    
        if (cartPreviousValue !== cart) {
          localStorage.setItem('virtual@store', JSON.stringify(cart));
        }

    }, [cart, cartPreviousValue]);

    async function addProduct(productId: number) {

        try {

            const updateCart = [...cart];
            const productExists = updateCart.find(product => product.id === productId);

            const stock = await api.get(`/stock/${productId}`);

            const stockAmount = stock.data.amount;

            const currentAmount = productExists ? productExists.amount : 0;
            const amount = currentAmount + 1;

            if (amount > stockAmount) {

                toast.error('Quantidade solicitada fora de estoque');
                return;

            }

            if (productExists) {

                productExists.amount = amount;

            } else {

                const product = await api.get(`/products/${productId}`);

                const newProduct = {
                    ...product.data,
                    amount: 1
                }

                updateCart.push(newProduct);

            }

            setCart(updateCart);

        } catch(err) {
            console.log('Erro: ', err);
            toast.error('Erro na adi????o do produto');
        }
        

    }

    function removeProduct(productId: number) {

        try {

            const updateCart = [...cart];
            const indexItem = updateCart.findIndex(product => product.id === productId);

            if (indexItem >= 0) {

                updateCart.splice(indexItem, 1);
                setCart(updateCart);

            } else {

                throw Error();

            }

        } catch(err) {
            console.log('Erro: ', err);
            toast.error('Erro na remo????o do produto');
        }

    }

    async function updateProductAmount({productId, amount}: UpdateProductAmount) {

        try {

            if (amount <= 0) return;

            const stock = await api.get(`/stock/${productId}`);
            const stockAmount = stock.data.amount;

            if (amount > stockAmount) {
                toast.error('Quantidade solicitada fora de estoque');
                return;
            }

            const updateCart = [...cart];
            const productExists = updateCart.find(product => product.id === productId);

            if (productExists) {
                productExists.amount = amount;
                setCart(updateCart);
            } else {
                throw Error();
            }

        } catch(err) {
            console.log('Erro: ', err);
            toast.error('Erro na altera????o de quantidade do produto');
        }

    }

    return (

        <CartContext.Provider value={{cart, addProduct, removeProduct, updateProductAmount}}>
            {children}
        </CartContext.Provider>

    );


}

export function useCart(): CartContextData {

    const context = useContext(CartContext);

    return context;

}