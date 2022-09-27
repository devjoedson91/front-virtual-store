import React, {useEffect} from 'react';
import { useCart } from "../../hooks/useCart";

export default function Contact() {

    const { cart } = useCart();

    useEffect(() => {

        console.log(cart);

    }, []);

    return (

        <div>

            <h1>Contatos</h1>

        </div>

    );

}