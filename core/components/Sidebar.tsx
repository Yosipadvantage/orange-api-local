import { useState, useEffect } from "react";
import Link from 'next/link';
import Image from 'next/image';
import { Avatar } from '@nextui-org/react';
import { Tooltip } from "@nextui-org/react";
import { FiLogIn } from "react-icons/fi";
import { BiCodeAlt, BiData, BiHive, BiNote, BiNetworkChart } from "react-icons/bi";
import logo from '../../public/logo.png'
import { useRouter } from "next/router";
import { eliminarCookies } from "../../utils";
import Footer from "./footer";



const menuItemColor = '#DFDFDE';

export const Sidebar = ({ children }: any) => {

    const router = useRouter()
    const [position, setPosition] = useState("40px");
    const [title, setTitle] = useState<string>('API - AMC');

    var tema;
    const path = useRouter();


    //EJECUTA LA FUNCION DEL TITULO
    useEffect(() => {
        setTitle(switchTitle() || '');
    }, [path])




    //RETORNA EL TITULO DEPENDIENDO DE LA RUTA
    function switchTitle() {
        switch (path.pathname) {
            case '/dashboard/data-base':
                return 'Data Base'

            case '/dashboard/web-service':
                return 'Web Services'

            case '/dashboard/software-project':
                return 'Software Project'
            case '/dashboard/data-access-object':
                return 'Data Access'

            case '/dashboard/data-bean-object':
                return 'Data Bean'

            default:
                '';
        }
    }




    // AJUSTA EL SIDERBAR DEACUERDO A LA RUTA
    useEffect(() => {

        if (router.pathname === "/dashboard/data-base") {
            setPosition("40px");
        } else if (router.pathname === "/dashboard/web-service") {
            setPosition("93px");
        } else if (router.pathname === "/dashboard/software-project") {
            setPosition("148px");
        } else if (router.pathname === "/dashboard/data-access-object") {
            setPosition("200px");
        } else if (router.pathname === "/dashboard/data-bean-object") {
            setPosition("250px");
        }

    }, [])



    //CERRAR SESION
    const closeSession = () => {
        sessionStorage.removeItem("user");
        eliminarCookies();
        router.push("/");
    }




    return (
        <>
            <div className="container-sidebar">
                <div className="caja-glass" style={{ cursor: "pointer" }}>
                    <Avatar
                        className="avatar"
                        squared
                        src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
                    <div className="logo-siderbar">
                        <Image src={logo} width={50}
                            height={40} alt='img'
                        />
                    </div>
                    <ul className="lista-iconos">
                        <span className="select" style={{ top: position }}></span>
                        <Tooltip content="Data Base" color="warning" placement="right">
                            <li className="item-list">
                                <Link href="/dashboard/data-base">
                                    <a><BiData size={35} color={(position === '40px') ? 'white' : menuItemColor} onClick={() => { setPosition("40px") }} /></a>
                                </Link>
                            </li>
                        </Tooltip>
                        <Tooltip content="Web Service" color="warning" placement="right">
                            <li className="item-list">
                                <Link href="/dashboard/web-service">
                                    <a><BiHive size={35} color={(position === '93px') ? 'white' : menuItemColor} onClick={() => { setPosition("93px") }} /></a>
                                </Link>
                            </li>
                        </Tooltip>
                        <Tooltip content="Software Project" color="warning" placement="right">
                            <li className="item-list">
                                <Link href="/dashboard/software-project">
                                    <a><BiCodeAlt size={35} color={(position === '148px') ? 'white' : menuItemColor} onClick={() => { setPosition("145px") }} /></a>
                                </Link>
                            </li>
                        </Tooltip>
                        <Tooltip content="DataAccessObject" color="warning" placement="right">
                            <li className="item-list">
                                <Link href="/dashboard/data-access-object">
                                    <a><BiNote size={35} color={(position === '200px') ? 'white' : menuItemColor} onClick={() => { setPosition("200px") }} /></a>
                                </Link>
                            </li>
                        </Tooltip>

                        <Tooltip content="DataBeanObject" color="warning" placement="right">
                            <li className="item-list">
                                <Link href="/dashboard/data-bean-object">
                                    <a><BiNetworkChart size={35} color={(position === '250px') ? 'white' : menuItemColor} onClick={() => { setPosition("250px") }} /></a>
                                </Link>
                            </li>
                        </Tooltip>

                        <Tooltip content="Salir" color="warning" placement="right">
                            <li className="item-list">
                                <FiLogIn size={35} color={menuItemColor} onClick={() => {
                                    closeSession();
                                }} />
                            </li>
                        </Tooltip>
                    </ul>
                </div>
                <div className={path.pathname === "/login" ? "container-login" : "moduleLayout__container"} >
                    <h1 style={{ position: "relative", color: "white", margin: "auto" }} className={`animate__animated animate__fadeInUp`}>{title}</h1>
                    {children}
                </div>
                <div className="footer">
                    <Footer />
                </div>
            </div>
        </>
    )
}

