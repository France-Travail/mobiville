import styled from 'styled-components'
import PropTypes from 'prop-types'
import loadable from '@loadable/component'

import { CircularProgress } from '@mui/material'

import { useWindowSize } from '../../../common/hooks/window-size'
import { isMobileView } from '../../../constants/mobile'

import noResultsPic from '../../../assets/images/no_results.svg'
import { useCities } from '../../../common/contexts/citiesContext'
import { useEffect, useState } from 'react'
import {
  COLOR_BUTTON_HOVER,
  COLOR_PRIMARY,
  COLOR_TEXT_SECONDARY,
  COLOR_WHITE,
} from '../../../constants/colors'
import { useProfessions } from '../../../common/contexts/professionsContext'
import { formatCityUrl } from '../../../utils/utils'

// import CityItem from './CityItem'
const CityItem = loadable(() => import('./CityItem'))
const Pagination = loadable(() => import('@mui/material/Pagination'))

const Container = styled.div`
  grid-area: citiesList;

  flex-grow: 1;
  max-width: ${({ isMobile }) => (isMobile ? '100%' : '620px')};
  padding: ${({ isMobile }) => (isMobile ? '16px' : '0 8px')};
`

const NotFoundContainer = styled.div`
  padding-top: 5rem;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  color: ${COLOR_TEXT_SECONDARY};
  text-align: center;
  font-size: 1.5rem;
  line-height: 1.5;
`

const CircularProgressContainer = styled.div`
  display: grid;
  place-items: center;
  min-height: 200px;
`

const PaginationContainer = styled.div`
  margin-top: 40px;

  nav ul {
    padding: 0px;
    max-width: 370px;
    margin: auto;
    justify-content: center;
  }

  nav ul li button {
    min-width: 24px;
    height: 32px;
    padding: 0px;
  }

  nav ul li button.Mui-selected {
    background-color: ${COLOR_PRIMARY};
    border-radius: 32px;
    color: ${COLOR_WHITE};
  }

  nav ul li:first-child button,
  nav ul li:last-child button {
    height: 32px;
    width: 32px;
    min-width: 32px;
    padding: 0px;

    background-color: #fff;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.14), 0px 2px 2px rgba(0, 0, 0, 0.12),
      0px 1px 3px rgba(0, 0, 0, 0.2);
  }

  nav ul li:first-child button:hover,
  nav ul li:last-child button:hover {
    background-color: ${COLOR_BUTTON_HOVER};
    color: ${COLOR_WHITE};
  }
`

const CitiesList = ({
  cities,
  codeRome,
  selectedCityId = null,
  setHoveredCityId = null,
  page = 1,
  onPageChange = () => {},
}) => {
  const isMobile = isMobileView(useWindowSize())
  const { totalCities, sortCriterions, isLoading } = useCities()
  const { isLoading: isLoadingProfessions, professionsCountList } =
    useProfessions()

  const [formattedCities, setFormattedCities] = useState([])

  const itemsPerPage = 10
  const [noOfPages, setNoOfPages] = useState(0)

  useEffect(() => {
    setNoOfPages(Math.ceil(totalCities / itemsPerPage))
  }, [totalCities])

  useEffect(() => {
    setFormattedCities(cities)
  }, [cities])

  useEffect(() => {
    if (!professionsCountList) return
    let newFormattedCities = formattedCities
    professionsCountList.forEach((professionsCount) => {
      newFormattedCities = newFormattedCities.map((city) => {
        if (city.insee_com === professionsCount.insee[0].toString()) {
          return {
            ...city,
            totalOffres: professionsCount.total,
          }
        }
        return city
      })
    })

    setFormattedCities(newFormattedCities)
  }, [professionsCountList])

  return (
    <Container isMobile={isMobile} data-automation-id="cities-list">
      {formattedCities.map((city) => (
        <CityItem
          city={city}
          selected={selectedCityId === city.id}
          sortCriterions={sortCriterions}
          key={city.id}
          to={formatCityUrl(city, codeRome)}
          onClickTag={() =>
            window.smartTag({
              name: 'acces_detail_ville',
              type: 'navigation',
              chapters: ['cities'],
            })
          }
          onMouseOver={() => setHoveredCityId(city.id)}
          onMouseLeave={() => setHoveredCityId(null)}
          isLoadingProfessions={isLoadingProfessions}
        />
      ))}
      {!isLoading && cities.length === 0 && (
        <NotFoundContainer>
          <img alt="" src={noResultsPic} style={{ marginBottom: '2rem' }} />
          Aucune ville correspondante
          <br />
          Modifiez vos critères
        </NotFoundContainer>
      )}
      {isLoading && (
        <CircularProgressContainer>
          <CircularProgress style={{ color: COLOR_PRIMARY }} size={40} />
        </CircularProgressContainer>
      )}
      <PaginationContainer>
        <Pagination
          count={noOfPages}
          defaultPage={0}
          page={page}
          siblingCount={2}
          boundaryCount={0}
          onChange={(_, value) => {
            onPageChange(value)
            window.smartTag({
              name: 'pagination',
              type: 'navigation',
              chapters: ['cities'],
            })
          }}
        />
      </PaginationContainer>
    </Container>
  )
}

CitiesList.propTypes = {
  codeRome: PropTypes.string,
  cities: PropTypes.array.isRequired,
  selectedCityId: PropTypes.func,
  setHoveredCityId: PropTypes.func,
  onPageChange: PropTypes.func,
}

export default CitiesList
