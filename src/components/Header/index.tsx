import NavBar from '../NavBar';
import styles from './styles.module.scss';

export default function Header() {

    return (

        <header className={`${styles.header} ${styles.headerBg}`}>
			
			<NavBar />
					
		</header>

    );

}