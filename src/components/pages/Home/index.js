import styles from './index.module.css'

import Container from "../../layout/Container"
import HomeCard from '../../project/HomeCard'
import Logo from '../../../img/itamoto_logo.png'
import LogoPecas from '../../../img/pecas_icon.png'
import LogoClientes from '../../../img/clientes_icon.png'
import LogoFinanceiro from '../../../img/financeiro_icon.png'

function Home() {
    return (
        <div className={styles.home_container}>
            <h1>
                <img src={Logo} alt="Mechanic Tools Logo" />
            </h1>
            <Container customClass="center">
                <HomeCard
                    to="/pecas"
                    name={'Peças'}
                    logo={LogoPecas}
                    alt={'Icone de Prateleira de Estoque'}
                />
                <HomeCard
                    to="/clientes"
                    name={'Clientes'}
                    logo={LogoClientes}
                    alt={'Icone de Prateleira de Estoque'}
                />
                <HomeCard
                    to="/vendas"
                    name={'Vendas'}
                    logo={LogoFinanceiro}
                    alt={'Icone de Fluxo de Finanças'}
                />
            </Container>
        </div>
    )
}

export default Home