import React, { useEffect } from "react";
import styles from "./styles.module.scss";
import { useCart } from "../../hooks/useCart";
import Header from "../../components/Header";

export default function Contact() {
  const { cart } = useCart();

  useEffect(() => {
    console.log(cart);
  }, []);

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <div className="col-md-6 animate-box">
            <h3>Entre em Contato</h3>
            <form action="#">
              <label className="sr-only" htmlFor="name">
                Nome
              </label>
              <input
                type="text"
                id="name"
                className="form-control"
                placeholder="Seu nome"
              />

              <label className="sr-only" htmlFor="email">
                E-mail
              </label>
              <input
                type="text"
                id="email"
                className="form-control"
                placeholder="Seu endereço de e-mail"
              />

              <label className="sr-only" htmlFor="message">
                Mensagem
              </label>
              <textarea
                name="message"
                id="message"
                cols={30} rows={10}
                className="form-control"
                placeholder="Escreve alguma coisa"
              ></textarea>

              <button type="submit">Enviar</button>
            </form>
          </div>
          <div className="col-md-5 col-md-push-1 animate-box">
            <div className={styles.info}>
              <h3>Informações de Contato</h3>
              <ul>
                <li className="address">
                  Avenida, R. José Versolato, 101 - 12ª andar - Centro, São
                  Bernardo do Campo - SP, 09750-730
                </li>
                <li className="phone">
                  <a href="tel://1121497360">(11) 2149-7360</a>
                </li>
                <li className="email">
                  <a href="mailto:contato@hcode.com.br">contato@hcode.com.br</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
