import Image from "next/image";
import logo2 from "../../public/logo-amc.png";
import { useContext } from "react";
import { context } from "../context/providerSpinner";


const Spinner = () => {


    const { state }: any = useContext(context);

    return (

        state &&
        <div className="spinner">
            <div className="circulo-1">
                <Image src={logo2} alt="logo" width={120} height={100} />
            </div>
        </div>


    )


}


export default Spinner;