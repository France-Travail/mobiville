import React, { Suspense, lazy } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'

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

export const Routes = () => (
    <Suspense fallback={<p>Chargement...</p>}>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />

          <Route exact path="/cities" component={Cities} />
          <Route exact path="/city/:insee" component={City} />
          <Route exact path="/city/:insee/:section" component={City} />
          <Route exact path="/city-search" component={CitySearchPage} />

          <Route exact path="/aides" component={Helps} />
          <Route exact path="/aides/:slug" component={HelpDetailsPage} />
          <Route exact path="/aides-filters" component={HelpFilterMobilePage} />
          <Route exact path="/aides-search" component={HelpsSearchPage} />

          <Route exact path="/mobility-guide" component={MobilityGuide} />
          <Route exact path="/faq" component={FAQ} />
          <Route exact path="/legal" component={Legal} />
          <Route exact path="/accessibility" component={Accessibility} />

          {/* Redirection sur la home page si le path ne match aucune route */}
          <Route component={() => <Redirect to="/"/>} />
        </Switch>
      </Router>
    </Suspense>
)
