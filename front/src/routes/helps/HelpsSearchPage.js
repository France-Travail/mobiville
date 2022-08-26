import { HelpForm, Modale } from "../../components"

const HelpsSearchPage = () => {
    return (
        <Modale
            title="Recherchez une aide"
            closeLink="/"
        >
            <HelpForm />
        </Modale>
    )
}

export default HelpsSearchPage