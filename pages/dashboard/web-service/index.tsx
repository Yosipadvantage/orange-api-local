import { ModuleLayout } from "../../../layouts"
import WebService from '../../../core/api-web-services/WebService';

export const index = () => {
    return (

        <>
            <ModuleLayout title='Api - Objetos' />
            <WebService />
        </>



    )
}

export default index
