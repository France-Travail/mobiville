import React, { Suspense, lazy } from 'react'
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom'

const Home = lazy(() => import('./home/Home'))
const Cities = lazy(() => import('./cities/Cities'))
const City = lazy(() => import('./city/City'))
const Helps = lazy(() => import('./helps/Helps'))
const HelpDetailsPage = lazy(() => import('./helps/HelpDetails'))
const Search = lazy(() => import('./search/Search'))
const FAQ = lazy(() => import('./faq/Faq'))
const Accessibility = lazy(() => import('./accessibility/Accessibility'))
const Legal = lazy(() => import('./legal/Legal'))
const MobilityGuide = lazy(() => import('./mobility-guide/MobilityGuide'))
const RomeList = lazy(() => import('./rome-list/RomeList'))

export const Routes = () => (
  <Suspense fallback={<p>Chargement...</p>}>
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/rechercher">
          <Redirect to="/rechercher/rome" />
        </Route>
        <Route exact path="/rechercher/:stepName" component={Search} />
        <Route exact path="/cities" component={Cities} />
        <Route exact path="/city/:insee" component={City} />
        <Route exact path="/city/:insee/:section" component={City} />
        <Route exact path="/aides" component={Helps} />
        <Route exact path="/aides/:slug" component={HelpDetailsPage} />
        <Route exact path="/mobility-guide" component={MobilityGuide} />
        <Route exact path="/rome-list" component={RomeList} />
        <Route exact path="/faq" component={FAQ} />
        <Route exact path="/legal" component={Legal} />
        <Route exact path="/accessibility" component={Accessibility} />
      </Switch>
    </Router>
  </Suspense>
)
