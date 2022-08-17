import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import CloseIcon from '@mui/icons-material/Close'

import HelpsFilter from "./components/HelpFilters"
import { COLOR_OTHER_GREEN, COLOR_PRIMARY, COLOR_WHITE } from '../../constants/colors'


const Container = styled.div`
  height: 100vh;
  padding: 20px;

  background: ${ COLOR_WHITE };

  display: flex;
  flex-direction: column;
`

const HeaderLink = styled(Link)`
  position: absolute;
  top: 20px;
  right: 20px;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 36px;
  height: 36px;
  border-radius: 50%;

  background: ${COLOR_OTHER_GREEN};
`

const Title = styled.h1`
  margin: 45px 0;

  font-size: 36px;
  font-style: normal;
  font-weight: 900;
  font-family: 'Roboto';

  color: ${COLOR_PRIMARY};
`

const HelpsFilterMobilePage = () => {

    return (
        <Container>

            <Helmet>
                <title>Identifiez les aides à la mobilité | Mobiville</title>
                <meta
                    name="description"
                    content="Découvrez des conseils et des aides financières, administratives ou humaines que vous pouvez mobiliser dans votre projet de mobilité professionnelle et résidentielle."
                />
            </Helmet>

            <HeaderLink to={`/aides` + window.location.search} title="Fermer" >
                <CloseIcon color="primary" fontSize="large" />
            </HeaderLink>

            <Title>Filtrer selon votre situation</Title>
            
            <HelpsFilter />

        </Container>
    )
}

export default HelpsFilterMobilePage
