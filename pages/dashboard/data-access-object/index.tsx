import DataAccessObject from '../../../core/api-data-access-object/DataAccessObject'
import { ModuleLayout } from "../../../layouts"

const index = () => {

    return (
        <>
            <ModuleLayout title='Api - Test' />
            <DataAccessObject />

        </>
    )
}

export default index;