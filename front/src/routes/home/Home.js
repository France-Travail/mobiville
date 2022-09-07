import React from 'react'
import { Helmet } from 'react-helmet-async'

import { COLOR_BACKGROUND } from '../../constants/colors'

import { MainLayout } from '../../components/'
import Testimonies from './components/Testimonies'
import MobilityGuide from './components/MobilityGuide'
import Advantages from './components/Advantages'
import Welcome from './components/Welcome'

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

    {/* WELCOME SECTION */}
    <Welcome></Welcome>

    {/* ADVANTAGES */}
    <Advantages></Advantages>

    {/* MOBILITY GUIDE */}
    <MobilityGuide></MobilityGuide>

    {/* TESTIMONIES */}
    <Testimonies></Testimonies>
  </MainLayout>
)

export default HomePage
