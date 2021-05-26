import React, { useEffect } from 'react'
import Home from './components/Home'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import TripsSerction from './components/TripSection'
import AdminSection from './components/admin/AdminSection'
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/trips" exact component={TripsSerction} />
          <Route path="/admin" exact component={AdminSection} />
          <Route path="/admin/:section" exact component={AdminSection} />
          <Route
            path="/admin/:section/:action"
            exact
            component={AdminSection}
          />
          <Route
            path="/admin/:section/:action/:id"
            exact
            component={AdminSection}
          />
          <Route path="/" render={() => <div>404</div>} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
