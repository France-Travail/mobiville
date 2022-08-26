import { Modale } from "../../components"
import CityForm from "../../components/CityForm"
import HelpFilters from "./components/HelpFilters"

const HelpsSearchPage = () => {
    return (
        <Modale
            title="Recherchez une aide"
            closeLink="/"
        >
            <HelpFilters></HelpFilters>
        </Modale>
    )
}

export default HelpsSearchPage