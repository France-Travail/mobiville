import styled from 'styled-components'
import PropTypes from 'prop-types'

import EuroIcon from '@mui/icons-material/Euro'
import DescriptionIcon from '@mui/icons-material/Description'
import ScheduleIcon from '@mui/icons-material/Schedule'

import {
  COLOR_GRAY,
  COLOR_PRIMARY,
  COLOR_WHITE,
} from '../../../../constants/colors'
import { thereAre, wordsCapitalize } from '../../../../utils/utils'
import { Tag } from '../../../../components'
import { useProfessions } from '../../../../common/contexts/professionsContext'

const Container = styled.div`
  width: 100%;
  padding: 16px;
  border: 1px solid
    ${({ $isSelected }) => ($isSelected ? COLOR_PRIMARY : COLOR_GRAY)};
  border-radius: 8px;

  background: ${COLOR_WHITE};

  display: flex;
  flex-direction: column;

  cursor: pointer;
  color: ${COLOR_PRIMARY};

  &:hover {
    border: 1px solid ${COLOR_PRIMARY};
  }
`

const Title = styled.h2`
  margin: 0;

  font-size: 18px;
  font-weight: 700;
`

const KeyInfo = styled.p`
  margin: 4px 0;

  display: flex;
  align-items: center;
  gap: 8px;

  font-size: 12px;
  font-weight: 700;
`

const Company = styled(KeyInfo)`
  font-size: 16px;
`

const Location = styled(KeyInfo)`
  font-size: 14px;
`

const JobCard = ({ job, onClick = () => {}, isSelected, ...props }) => {
  const { isMissingApplicants, formatTypeContrat } = useProfessions()

  return (
    <Container onClick={() => onClick(job)} $isSelected={isSelected} {...props}>
      <Title>{job.appellationlibelle}</Title>

      {!!job?.entreprise?.nom && (
        <Company>{wordsCapitalize(job.entreprise.nom)}</Company>
      )}

      {!!job?.lieuTravail?.libelle && (
        <Location>{job.lieuTravail.libelle}</Location>
      )}

      {isMissingApplicants(job)
        ? (<Tag green bold>
            Offre avec plus d'opportunités
          </Tag>)
        : null}

      {job.salaire?.libelle && (
        <KeyInfo>
          <EuroIcon />
          Salaire : {job.salaire?.libelle}
        </KeyInfo>
      )}

      <KeyInfo>
        <DescriptionIcon />
        {formatTypeContrat(job)}{' '}
        {job.dureeTravailLibelleConverti &&
          ` - ${job.dureeTravailLibelleConverti}`}
      </KeyInfo>

      <KeyInfo>
        <ScheduleIcon />
        Publié {thereAre(job.dateCreation)}
      </KeyInfo>
    </Container>
  )
}

JobCard.propTypes = {
  job: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  isSelected: PropTypes.bool,
}

export default JobCard
