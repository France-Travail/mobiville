import { Helmet } from 'react-helmet-async'
import { useNavigate } from "react-router-dom"

import { HelpForm, Modale } from '../../components'

const HelpsFilterMobilePage = () => {
  const navigate = useNavigate()

  return (<>
    <Helmet>
      <title>Identifiez les aides à la mobilité | Mobiville</title>
      <meta
        name="description"
        content="Découvrez des conseils et des aides financières, administratives ou humaines que vous pouvez mobiliser dans votre projet de mobilité professionnelle et résidentielle."
      />
    </Helmet>

    <Modale show
      title="Filtrer selon votre situation"
      onClose={() => navigate('/aides')}
    >
      <HelpForm />
    </Modale>

  </>)
}

export default HelpsFilterMobilePage
