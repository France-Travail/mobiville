import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"

import {
    Breadcrumbs,
    Typography,
} from '@mui/material'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'

import { useWindowSize } from "../../common/hooks/window-size"
import { MainLayout, Modale, Section } from "../../components"
import CityForm from "../../components/CityForm"
import { COLOR_BACKGROUND, COLOR_PRIMARY } from "../../constants/colors"
import { isMobileView } from "../../constants/mobile"

const Container = styled(Section)`
    display: flex;
    flex-direction: column;
`

const CustomBreadcrumbs = styled(Breadcrumbs)`
    padding-top: 20px;
`

const Title = styled.h1`
    margin-top: 24px;

    font-size: 36px;
    font-weight: 900;
    color: ${ COLOR_PRIMARY };
`

const CitiesImage = styled.img`
    width: 370px;
    margin: 50px auto 0 auto;
`

const CitySearchPage = () => {
    const isMobile = isMobileView(useWindowSize())
    const navigate = useNavigate()

    const breadcrumbs = [
        <Link underline="hover" key="1" to="/">
          Accueil
        </Link>,
        <Typography key="2">
          Rechercher un métier
        </Typography>
    ]

    if (isMobile) {
        return (
            <Modale show
                title="Recherchez une ville"
                onClose={() => navigate('/')}
            >
                <CityForm />
            </Modale>
        )
    } else {
        return (
            <MainLayout
                style={{ background: COLOR_BACKGROUND }}
            >
                <Container>
                    <CustomBreadcrumbs
                        separator={<NavigateNextIcon fontSize="small" />}
                        aria-label="breadcrumb"
                    >
                        {breadcrumbs}
                    </CustomBreadcrumbs>
                        
                    <Title>Recherchez le métier et l'endroit qui vous correspond !</Title>

                    <CityForm />

                    <CitiesImage src="/images/cities.png" />
                </Container>
            </MainLayout>
        )
    }

}

export default CitySearchPage