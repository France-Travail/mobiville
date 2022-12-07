import React, { lazy, useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { useNomPage } from '../common/contexts/NomPageContext'

const Home = lazy(() => import('./home/Home'))

const Cities = lazy(() => import('./cities/Cities'))
const City = lazy(() => import('./city/City'))
const CitySearchPage = lazy(() => import('./city/CitySearchPage'))

const Helps = lazy(() => import('./helps/Helps'))
const HelpDetailsPage = lazy(() => import('./helps/HelpDetailsPage'))
const HelpFilterMobilePage = lazy(() => import('./helps/HelpsFilterMobilePage'))
const HelpsSearchPage = lazy(() => import('./helps/HelpsSearchPage'))

const MobilityGuide = lazy(() => import('./mobility-guide/MobilityGuide'))
const FAQ = lazy(() => import('./faq/Faq'))
const Legal = lazy(() => import('./legal/Legal'))
const Accessibility = lazy(() => import('./accessibility/Accessibility'))

export const MobivilleRoutes = () => {
  const { setNomPage } = useNomPage()
  let location = useLocation()
  useEffect(() => {
    setNomPage(location.pathname.replace('/', ''))
  }, [location])

  return (
    <Routes>
      <Route end path="/" element={<Home />} />

      <Route end path="/villes" element={<Cities />} />
      <Route end path="/ville/:insee" element={<City />} />
      <Route end path="/ville/:insee/:section" element={<City />} />
      <Route end path="/rechercher" element={<CitySearchPage />} />

      <Route end path="/aides" element={<Helps />} />
      <Route end path="/aides/:slug" element={<HelpDetailsPage />} />
      <Route end path="/aides-filtres" element={<HelpFilterMobilePage />} />
      <Route end path="/aides-recherche" element={<HelpsSearchPage />} />

      <Route end path="/conseils-et-astuces" element={<MobilityGuide />} />
      <Route end path="/faq" element={<FAQ />} />
      <Route end path="/mentions-legales" element={<Legal />} />
      <Route end path="/accessibilite" element={<Accessibility />} />

      {/* Redirection sur la home page si le path ne match aucune route */}
      <Route
        path="*"
        element={
          <>
            <Navigate to="/" replace />
          </>
        }
      />
    </Routes>
  )
}
