import { Op } from 'sequelize'
import { chunk, omit } from 'lodash'

const PARIS_CODE = 75056
const MARSEILLE_CODE = 13055
const LYON_CODE = 69123

export default (sequelizeInstance, Model) => {
  Model.sync = async ({ equipments }) => {
    await Model.destroy({ truncate: true })

    let nbInserted = 0
    console.log('START SYNC EQUIPMENTS')

    // general case

    const allData = []
    for (let i = 0; i < equipments.length; i++) {
      const data = {}
      for (const [key, value] of Object.entries(equipments[i])) {
        data[key] = value || null
      }

      nbInserted++
      allData.push(data)
    }

    // using chunks to avoid going past memory limits
    for (const dataChunk of chunk(allData, 10000)) {
      await Model.bulkCreate(dataChunk)
    }

    console.log('END SYNC EQUIPMENTS')

    return {
      'nb read': equipments.length,
      'nb inserted': nbInserted,
    }
  }

  Model.syncSpecialCities = async () => {
    // for Paris, Lyon, Marseille
    console.log('START SYNC EQUIPMENTS FOR SPECIAL CITIES')
    const citiesArray = [
      {
        like: 'PARIS%ARRONDISSEMENT',
        code: PARIS_CODE,
      },
      {
        like: 'MARSEILLE%ARRONDISSEMENT',
        code: MARSEILLE_CODE,
      },
      {
        like: 'LYON%ARRONDISSEMENT',
        code: LYON_CODE,
      },
    ]

    for (const cityData of citiesArray) {
      const districts = await Model.models.cities.findAll({
        attributes: ['insee_com'],
        where: {
          nom_comm: {
            [Op.like]: cityData.like,
          },
        },
      })

      const inseeComs = districts.map(({ insee_com }) => insee_com)

      const equipments = await Model.findAll({ where: { depcom: inseeComs } })

      const amenitiesToAdd = equipments.map((equipment) => ({
        ...omit(equipment.dataValues, 'id'),
        depcom: cityData.code,
      }))

      // using chunks to avoid going past memory limits
      for (const dataChunk of chunk(amenitiesToAdd, 10000)) {
        await Model.bulkCreate(dataChunk)
      }

      console.log('END SYNC EQUIPMENTS FOR SPECIAL CITIES')
    }
  }

  Model.getTotal = async (codeCom, type) => {
    /*
      TYPEQU =>
      A101 - Police
      A104 - Gendarmerie
      A105 - Cour d’appel (CA)
      A106 - Tribunal de grande instance (TGI)
      A107 - Tribunal d’instance (TI)
      A108 - Conseil des prud’hommes (CPH)
      A109 - Tribunal de commerce (TCO)
      A115 - Réseau spécialisé Pôle Emploi
      A119 - Direction Générale des Finances Publiques
      (DGFIP)
      A120 - Direction Régionale des Finances Publiques
      (DRFIP)
      A121 - Direction Départementale des Finances Publiques
      (DDFIP)
      A122 - Réseau de proximité Pôle Emploi
      A123 - Réseau partenarial Pôle Emploi
      A124 - Maison de justice et du droit
      A125 - Antenne de justice
      A126 - Conseil départemental d’accès au droit (CDAD)
      A127 – Maison de services au public (MSAP)
      A203 - Banque, Caisse d’Épargne
      A205 - Pompes funèbres
      A206 - Bureau de poste
      A207 - Relais poste
      A208 - Agence postale
      A301 - Réparation auto et de matériel agricole
      A302 - Contrôle technique automobile
      A303 - Location auto-utilitaires légers
      A304 - École de conduite
      A401 - Maçon
      A402 - Plâtrier peintre
      A403 - Menuisier, charpentier, serrurier
      A404 - Plombier, couvreur, chauffagiste
      A405 - Électricien
      A406 - Entreprise générale du bâtiment
      A501 - Coiffure
      A502 - Vétérinaire
      A503 - Agence de travail temporaire
      A504 - Restaurant - Restauration rapide
      A505 - Agence immobilière
      A506 – Pressing - Laverie automatique
      A507 - Institut de beauté - Onglerie
      B101 - Hypermarché
      B102 - Supermarché
      B103 - Grande surface de bricolage
      B201 - Supérette
      B202 - Épicerie
      B203 - Boulangerie
      B204 - Boucherie charcuterie
      B205 - Produits surgelés
      B206 - Poissonnerie
      B301 - Librairie papeterie journaux
      B302 - Magasin de vêtements
      B303 - Magasin d'équipements du foyer
      B304 - Magasin de chaussures
      B305 - Magasin d'électroménager, audio vidéo
      B306 - Magasin de meubles
      B307 - Magasin d'art. de sports et de loisirs
      B308 - Magasin de revêtements murs et sols
      B309 - Droguerie quincaillerie bricolage
      B310 - Parfumerie - Cosmétique
      B311 - Horlogerie Bijouterie
      B312 - Fleuriste - Jardinerie - Animalerie
      B313 - Magasin d’optique
      B315 - Magasin de matériel médical et orthopédique
      B316 - Station service
      C101 - École maternelle
      C102 - École maternelle de RPI dispersé
      C104 - École élémentaire
      C105 - École élémentaire de RPI dispersé
      C201 - Collège
      C301 - Lycée d'enseignement général et/ou techno.
      C302 - Lycée d'enseignement professionnel
      C303 - Lycée technique et/ou professionnel agricole
      C304 - SGT : Section enseignement général et techno.
      C305 - SEP : Section enseignement professionnel
      C401 - STS CPGE
      C402 - Formation santé
      C403 - Formation commerce
      C409 - Autre formation post bac non universitaire
      C501 - UFR
      C502 - Institut universitaire
      C503 - École d'ingénieurs
      C504 - Enseignement général supérieur privé
      C505 - Écoles d’enseignement supérieur agricole
      C509 - Autre enseignement supérieur
      C601 - Centre de formation d'apprentis (hors agriculture)
      C602 - GRETA
      C603 - Centre dispensant de la formation continue
      agricole
      C604 - Formation aux métiers du sport
      C605 - Centre dispensant des formations d’apprentissage
      agricole
      C609 - Autre formation continue
      C701 - Résidence universitaire
      C702 - Restaurant universitaire
      D101 - Établissement santé court séjour
      D102 - Établissement santé moyen séjour
      D103 - Établissement santé long séjour
      D104 - Établissement psychiatrique avec hébergement
      D105 - Centre lutte cancer
      D106 - Urgences
      D107 - Maternité
      D108 - Centre de santé
      D109 - Structure psychiatrique en ambulatoire
      D110 - Centre médecine préventive
      D111 - Dialyse
      D112 - Hospitalisation à domicile
      D113 - Maison de santé pluridisciplinaire
      D201 - Médecin généraliste
      D202 - Spécialiste en cardiologie
      D203 - Spécialiste en dermatologie vénéréologie
      D206 - Spécialiste en gastro-entérologie
      D207 - Spécialiste en psychiatrie
      D208 - Spécialiste en ophtalmologie
      D209 - Spécialiste en oto-rhino-laryngologie
      D210 - Spécialiste en pédiatrie
      D211 - Spécialiste en pneumologie
      D212 - Spéc. en radiodiagnostic et imagerie médicale
      D213 - Spécialiste en stomatologie
      D214 - Spécialiste en gynécologie (médicale et/ou
      obstétrique)
      D221 - Chirurgien dentiste
      D231 - Sage-femme
      D232 - Infirmier
      D233 - Masseur kinésithérapeute
      D235 - Orthophoniste
      D236 - Orthoptiste
      D237 - Pédicure-podologue
      D238 - Audio prothésiste
      D239 - Ergothérapeute
      D240 - Psychomotricien
      D241 - Manipulateur ERM
      D242 - Diététicien
      D243 - Psychologue
      D301 - Pharmacie
      D302 - Laboratoire d'analyses et de biologie médicales
      D303 - Ambulance
      D304 - Transfusion sanguine
      D305 - Établissement thermal
      D401 - Personnes âgées : hébergement
      D402 - Personnes âgées : soins à domicile
      D403 - Personnes âgées : services d'aide
      D404 - Personnes âgées : foyers restaurants
      D502 - Crèche
      D601 - Enfants handicapés : hébergement
      D602 - Enfants handicapés.: soins à domicile
      D603 - Adultes handicapés : accueil/hébergement
      D604 - Adultes handicapés : services d’aide
      D605 - Travail protégé
      D606 - Adultes handicapés : services de soins à domicile
      D701 - Aide sociale à l'enfance : hébergement
      D702 - Aide sociale à l'enfance : action éduc.
      D703 - CHRS Centre d'héberg. et de réadapt. sociale
      D704 - Centre provisoire d'hébergement
      D705 - Centre accueil demandeur d'asile
      D709 - Autres établissements pour adultes et familles en
      difficulté
      E101 - Taxi - VTC
      E102 - Aéroport
      E107 - Gare de voyageurs d’intérêt national
      E108 - Gare de voyageurs d’intérêt régional
      E109 - Gare de voyageurs d’intérêt local
      F101 - Bassin de natation
      F102 - Boulodrome
      F103 - Tennis
      F104 - Équipement de cyclisme
      F105 - Domaine skiable
      F106 - Centre équestre
      F107 - Athlétisme
      F108 - Terrain de golf
      F109 - Parcours sportif/santé
      F110 - Sports de glace
      F111 - Plateaux et terrains de jeux extérieurs
      F112 - Salles spécialisées
      F113 - Terrain de grands jeux
      F114 - Salles de combat
      F116 - Salles non spécialisées
      F117 - Roller-Skate-Vélo bicross ou freestyle
      F118 - Sports nautiques
      F119 - Bowling
      F120 - Salles de remise en forme
      F121 - Salles multisports (gymnase)
      F201 - Baignade aménagée
      F202 - Port de plaisance - Mouillage
      F203 - Boucle de randonnée
      F303 - Cinéma
      F304 - Musée
      F305 - Conservatoire
      F306 - Théâtre - Art de rue - Pôle cirque
      F307 - Bibliothèque
      G101 - Agence de voyages
      G102 - Hôtel
      G103 - Camping
      G104 - Information touristique
    */

    if (typeof type === 'string') {
      type = [type]
    }

    const total = await Model.count({
      where: { depcom: codeCom, typequ: type },
    })

    return total
  }

  return Model
}
