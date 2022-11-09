import logo from "../../public/logo.png"
import Image from "next/image"

const Footer = () => {

    return (

        <section className="footer">

            <div className="column1">
                <ul>

                    <li>
                        <span className="circulo-blanco">
                            <Image src={logo} width={20} height={20} alt="logo" />
                        </span>
                    </li>
                    <li className="nombre-empresa" style={{ color: "white" }}>
                        Advantage Microsystem SAS
                    </li>
                </ul>
            </div>



            <div className="column2">
                <ul>
                    <li><a href="https://advantage.com.co/about-us" target="_blank">QUIENES SOMOS</a> </li>
                    <li><a href="https://advantage.com.co/cards-product" target="_blank">SERVICIOS</a></li>
                    <li><a href="https://advantage.com.co/home-2" target="_blank">PRODUCTOS</a></li>
                </ul>
            </div>


            <div className="column2">
                <ul>
                    <li><a href="https://advantage.com.co/contact-us" target="_blank">CONTACTO</a></li>
                    <li><a href="https://advantage.com.co/" target="_blank">SITIO WEB</a></li>
                </ul>
            </div>



        </section>
    )
}


export default Footer