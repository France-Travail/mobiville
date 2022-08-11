import React, {useEffect} from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import {Helmet} from 'react-helmet-async'
import {COLOR_OTHER_GREEN, COLOR_PRIMARY,} from '../../constants/colors'
import CloseIcon from '@mui/icons-material/Close'
import HelpsFilter from "./components/HelpFilters"


const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 8px;
`

const TitleContainer = styled.div`
  display: block;
  padding: 5px 0px 0px 10px;
  margin: 25px 0px;
`

const HeaderLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${COLOR_OTHER_GREEN};
  margin: '10px 10px 0px auto';
  float: right;
`

const Title = styled.h1`
  margin: 20px auto;
  height: 42px;

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 900;
  font-size: 36px;
  line-height: 42px;
  display: contents;
  align-items: center;

  color: ${COLOR_PRIMARY};
`

const CATEGORIES = [
    {
        key: 'emploi',
        icon: '/icons/emploi.svg',
        text: 'Je recherche un emploi',
        name: 'Je recherche un emploi',
    },
    {
        key: 'logement',
        icon: '/icons/logement.svg',
        text: 'Je recherche un logement',
        name: 'Je recherche un logement',
    },
    {
        key: 'déménage',
        icon: '/icons/demenagement.svg',
        text: 'Je déménage prochainement',
        name: 'Je déménage prochainement',
    },
]

const SITUATIONS = [
    {
        key: "demandeur d'emploi",
        text: "Demandeur d'emploi",
        name: "Je suis demandeur d'emploi",
    },
    {
        key: 'salarié',
        text: 'Salarié',
        name: 'Je suis salarié',
    },
    {
        key: 'alternance',
        text: 'Alternant',
        name: 'Je suis alternant',
    },
    {
        key: 'moins de 26 ans',
        text: '- 26 ans',
        name: "J'ai moins de 26 ans",
    },
    {
        key: 'plus de 26 ans',
        text: '+ 26 ans',
        name: "J'ai plus de 26 ans",
    },
]

const HelpsFilterMobilePage = () => {

    useEffect(() => {
        document.body.className = "white"
    }, [])

    const removeBodyClass = () => {
        document.body.className = ""
    }

    return (
        <Container>

            <Helmet>
                <title>Identifiez les aides à la mobilité | Mobiville</title>
                <meta
                    name="description"
                    content="Découvrez des conseils et des aides financières, administratives ou humaines que vous pouvez mobiliser dans votre projet de mobilité professionnelle et résidentielle."
                />
            </Helmet>

            <div>
                <HeaderLink to={`/aides` + window.location.search} onClick={() => removeBodyClass()} title="Fermer" >
                    <CloseIcon color="primary" fontSize="large" />
                </HeaderLink>
            </div>
            <TitleContainer>
                <Title>
                    Filtrer selon votre situation
                </Title>
            </TitleContainer>
            
            <HelpsFilter CATEGORIES={CATEGORIES} SITUATIONS={SITUATIONS} removeBodyClassFunction={removeBodyClass} />

        </Container>
    )
}

export default HelpsFilterMobilePage
