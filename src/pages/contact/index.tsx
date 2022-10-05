import React, { FormEvent, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useCart } from "../../hooks/useCart";
import Header from "../../components/Header";
import {MdLocationOn, MdPhoneEnabled, MdOutlineMailOutline} from 'react-icons/md';
import { api } from "../../services/api";
import { toast } from "react-toastify";

export default function Contact() {
  const { cart } = useCart();

  useEffect(() => {
    console.log(cart);
  }, []);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [textArea, setTextArea] = useState('');

  async function handleDataContact(event: FormEvent) {

      event.preventDefault();

      if (name === '' || email === '' || textArea === '') {

          toast.error('Preencha todos os dados');
          return;

      }
      
      const response = await api.post('/contacts', {
          name: name,
          email: email,
          message: textArea
      });

      toast.success('Contato enviado com sucesso!');

  }

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
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <label className="sr-only" htmlFor="email">
                E-mail
              </label>
              <input
                type="text"
                id="email"
                className="form-control"
                placeholder="Seu endereço de e-mail" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={textArea}
                onChange={(e) => setTextArea(e.target.value)}
              ></textarea>

              <button type="submit" onClick={handleDataContact}>Enviar</button>
            </form>
          </div>
          <div className="col-md-5 col-md-push-1 animate-box">
            <div className={styles.info}>
              <h3>Informações de Contato</h3>
              <ul>
                <li className="address"><MdLocationOn size={30} color="#777"/>
                  <p>Avenida, R. José Versolato, 101 - 12ª andar - Centro, São
                  Bernardo do Campo - SP, 09750-730</p>
                </li>
                <li className="phone">
                  <MdPhoneEnabled size={25} color="#777"/><a href="tel://1121497360">(11) 2149-7360</a>
                </li>
                <li className="email">
                  <MdOutlineMailOutline size={25} color="#777"/><a href="#">casademaria@ccr.com.br</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
