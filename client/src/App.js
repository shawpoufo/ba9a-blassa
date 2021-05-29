import React, { useEffect } from 'react'
import Home from './components/Home'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import TripsSerction from './components/TripSection'
import AdminSection from './components/admin/AdminSection'
import Header from './components/Header'
import SignUpSection from './components/signUp/signUpSection'
import useAuthStore from './stores/authStore'
import LoginSection from './components/signUp/loginSection'
import EmailValidationSection from './components/signUp/emailValidationSection'
function App() {
  const getToken = useAuthStore((state) => state.getToken)
  useEffect(() => {
    getToken()
    console.log(useAuthStore.getState().token)
  }, [])
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/" component={Header} />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/signup" exact component={SignUpSection} />
          <Route path="/login" exact component={LoginSection} />
          <Route
            path="/validateemail"
            exact
            component={EmailValidationSection}
          />
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
