import { Modale } from "../../components"
import CityForm from "../../components/CityForm"

const CitySearchPage = () => {
    return (
        <Modale
            title="Recherchez une ville"
            closeLink="/"
        >
            <CityForm></CityForm>
        </Modale>
    )
}

export default CitySearchPage