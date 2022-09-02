import { Helmet } from 'react-helmet-async'

import { HelpForm, Modale } from '../../components'

const HelpsFilterMobilePage = () => (
  <>
    <Helmet>
      <title>Identifiez les aides à la mobilité | Mobiville</title>
      <meta
        name="description"
        content="Découvrez des conseils et des aides financières, administratives ou humaines que vous pouvez mobiliser dans votre projet de mobilité professionnelle et résidentielle."
      />
    </Helmet>

    <Modale
      title="Filtrer selon votre situation"
      closeLink="/aides"
    >

      <HelpForm />

    </Modale>

  </>
)

export default HelpsFilterMobilePage
