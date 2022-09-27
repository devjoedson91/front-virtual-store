import styles from './styles.module.scss';

export default function Header() {

    return (

        <header className={`${styles.header} ${styles.headerBg}`}>
			<div className="gtco-container">
				<div className="row">
					<div className="col-md-12 col-md-offset-0 text-left">

						{/* <div className="row row-mt-15em">
							<div className="col-md-7 mt-text animate-box" data-animate-effect="fadeInUp">
								<span className="intro-text-small">Feito por
									<a href="https://www.hcode.com.br" target="_blank">Hcode.com.br</a>
								</span>
								<h1 className="cursive-font">Restaurante Saboroso!</h1>
							</div>
							
						</div> */}


					</div>
				</div>
			</div>
		</header>

    );

}