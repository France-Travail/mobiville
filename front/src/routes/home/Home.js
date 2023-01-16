import React from 'react'
import { Helmet } from 'react-helmet-async'

import { COLOR_BACKGROUND } from '../../constants/colors'

import { MainLayout } from '../../components/'
import Testimonies from './components/Testimonies'
import MobilityGuideBanner from './components/MobilityGuideBanner'
import Advantages from './components/Advantages'
import Welcome from './components/Welcome'
import HomeHelpsBanner from './components/HomeHelpsBanner'
import HomeRegionsBanner from './components/HomeRegionsBanner'

const HomePage = () => (
  <MainLayout
    topMobileMenu
    style={{ background: COLOR_BACKGROUND }}
    displaySearch={false}
  >
    <Helmet>
      <title>Trouvez l’emploi et la ville qui va avec ! | Mobiville</title>
      <meta
        name="description"
        content="Mobiville permet aux demandeurs d’emploi et aux salariés de choisir la ville adaptée à leur projet ainsi que les aides financières à la mobilité."
      />
    </Helmet>

    <Welcome />

    <HomeHelpsBanner />

    <HomeRegionsBanner />

    <MobilityGuideBanner />

    <Advantages />

    <Testimonies />
  </MainLayout>
)

export default HomePage
