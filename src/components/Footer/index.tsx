import { MdEmail, MdPhoneEnabled, MdChat } from "react-icons/md";
import { FaInstagram, FaFacebookSquare } from "react-icons/fa";
import styles from "./styles.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.section}>
          <h3>Entrar em Contato</h3>
          <ul>
            <li>
              <a href="#">
                <MdPhoneEnabled size={25} color="#fff" /> (88) 99635-2291
              </a>
            </li>
            <li>
              <a href="#">
                <MdEmail size={25} color="#fff" /> casademaria@rcc.com.br
              </a>
            </li>
            <li>
              <a href="#">
                <MdChat size={25} color="#fff" /> Chat
              </a>
            </li>
          </ul>
        </div>
        <div className={styles.section}>
          <h3>Redes Sociais</h3>
          <ul>
            <li>
              <a href="https://twitter.com/hcodebr">
                <FaInstagram size={25} color="#fff" />
              </a>
            </li>
            <li>
              <a href="https://www.facebook.com/hcodebr">
                <FaFacebookSquare size={25} color="#fff" />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <hr />
      <div className={styles.copyright}>
        <small>
          &copy; 2022. Todos os Direitos Reservados.
        </small>
        <small>
          Desenvolvido por
          <a href="https://www.hcode.com.br" target="_blank">
             Joedson Ferreira Developer
          </a>
        </small>
      </div>
    </footer>
  );
}
