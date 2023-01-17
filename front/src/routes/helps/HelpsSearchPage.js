import { useNavigate } from "react-router-dom"
import { HelpForm, Modale } from "../../components"

const HelpsSearchPage = () => {
    const navigate = useNavigate()

    return (
        <Modale show
            title="Recherchez une aide"
            onClose={() => navigate('/')}
        >
            <HelpForm />
        </Modale>
    )
}

export default HelpsSearchPage