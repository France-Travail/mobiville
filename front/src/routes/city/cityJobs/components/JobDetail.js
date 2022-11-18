import styled from 'styled-components'
import PropTypes from 'prop-types'

import DescriptionIcon from '@mui/icons-material/Description'
import EuroIcon from '@mui/icons-material/Euro'
import ScheduleIcon from '@mui/icons-material/Schedule'

import { COLOR_PRIMARY, COLOR_PURPLE, COLOR_WHITE } from '../../../../constants/colors'
import { capitalize, thereAre } from '../../../../utils/utils'
import { ActionButton } from '../../../../components'
import { useEffect, useState } from 'react'

const Container = styled.div`
  position: sticky;
  top: 8px;
  grid-area: jobDetail;
  height: fit-content;
  padding: 16px;
  border-radius: 8px;

  background-color: ${COLOR_WHITE};

  color: ${COLOR_PRIMARY};
`

const Title = styled.h2`
  margin: 0;
  font-size: 24px;
`

const KeyInfo = styled.p`
  margin: 5px 0;
  
  display: flex;
  align-items: center;
  gap: 4px;
`

const Company = styled(KeyInfo)`
  font-weight: 700;
`

const Location = styled(KeyInfo)`
  display: inline;
  font-weight: 700;
`

const Salary = styled(KeyInfo)``

const Type = styled(KeyInfo)``

const Time = styled(KeyInfo)``

const Description = styled.p``

const HR = styled.hr`
  margin: 20px;
  border: none;
  border-bottom: 1px solid ${COLOR_PURPLE};
  border-radius: 1px;

  background: ${COLOR_PURPLE};
`

const JobDetail = ({ job }) => {
  const [displayedDescription, setDisplayedDescription] = useState('')

  const LocateWithMappy = ({ job }) => (
    <a
      href={`https://fr.mappy.com/plan#/${job?.lieuTravail.libelle}`}
      target="_blank"
      referer="noreferrer noopener"
    >
      Localiser avec Mappy
    </a>
  )

  useEffect(() => {
    if (!job?.description) return

    const MAX_DESCRIPTION_LENGTH = 1300
    const shortDescription =
      job.description?.length > MAX_DESCRIPTION_LENGTH
        ? job.description
            .slice(0, MAX_DESCRIPTION_LENGTH)
            .concat(job.description.slice(MAX_DESCRIPTION_LENGTH).split(' ')[0])
            .concat('…')
        : job.description

    setDisplayedDescription(shortDescription)
  }, [job?.description])

  return (
    <>
      {!job ? null : (
        <Container>
          <Title>{job?.appellationlibelle}</Title>

          {!!job?.entreprise?.nom
            ? (<Company>{capitalize(job?.entreprise?.nom)}</Company>)
            : null}
          
          {!!job?.lieuTravail?.libelle
            ? (<><Location>{job?.lieuTravail?.libelle} • </Location><LocateWithMappy job={job} /></>)
            : null}
          
          {!!job?.salaire?.libelle
            ? (<Salary>
              <EuroIcon />
              Salaire : {job?.salaire?.libelle}
            </Salary>)
            : null}

          {!!job?.typeContrat
            ? (<Type>
              <DescriptionIcon />
              {job?.typeContrat === 'CDI' || job?.typeContrat === 'CDD'
                ? job?.typeContrat
                : job?.typeContratLibelle}
            </Type>)
            : null}

          {!!job?.dateCreation
            ? (<Time>
              <ScheduleIcon />
              Publié {thereAre(job?.dateCreation)}
            </Time>)
            : null}

          <div style={{ width: 'fit-content', margin: 'auto' }}>
            <ActionButton
              libelle="Postuler sur Pôle emploi.fr"
              path={job?.origineOffre?.urlOrigine}
            />
          </div>

          <HR />

          <Description>{displayedDescription}</Description>
        </Container>
      )}
    </>
  )
}

JobDetail.propTypes = {
  job: PropTypes.object
}

export default JobDetail
