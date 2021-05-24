import React, { useEffect } from 'react'
import Home from './components/Home'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import TripsSerction from './components/TripSection'
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/trips" exact component={TripsSerction} />
          <Route path="/" render={() => <div>404</div>} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
