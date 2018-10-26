import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { Redirect } from 'react-router'

import GuestNavbar from './containers/GuestNavbar'
import AdminNavbar from './containers/AdminNavbar'
import PageIndex from './components/PageIndex'
import PageSearch from './containers/PageSearch'
import ManualSearch from './containers/ManualSearch'
import PageStatisticLocus from './containers/PageStatisticLocus'
import PageStatisticGeographic from './containers/PageStatisticGeographic'
import PageAdminData from './containers/PageAdminData'
import PageAdminSequence from './containers/PageAdminSequence'
import PageAdminSample from './containers/PageAdminSample'
import PageAdminSnp from './containers/PageAdminSnp'

import PageSearchAll from './containers/PageSearchAll'

import './App.css'

class App extends Component {
  render() {
    const user = localStorage.getItem('user')
    return (
      <div style={{ backgroundColor: '#e0ebeb' }}>
        <div className="navbar is-dark" />
        <div>
          {user ? (
            <nav>
              <AdminNavbar />
            </nav>
          ) : (
            <div>
              <GuestNavbar />
            </div>
          )}
        </div>
        <Switch>
          <Route exact path="/" component={PageIndex} />{' '}
          <Route exact path="/search" component={PageSearchAll} />
          <Route exact path="/searchall" component={PageSearch} />
          <Route exact path="/search/manual/" component={ManualSearch} />
          <Route exact path="/statistic/locus" component={PageStatisticLocus} />
          <Route
            exact
            path="/statistic/geographic"
            component={PageStatisticGeographic}
          />{' '}
          <Route
            exact
            path="/admindata"
            render={() => {
              if (!user) {
                return <Redirect to="/" />
              } else {
                return <PageAdminData />
              }
            }}
          />
          <Route
            exact
            path="/adminisnp"
            render={() => {
              if (!user) {
                return <Redirect to="/" />
              } else {
                return <PageAdminSnp />
              }
            }}
          />
          <Route
            exact
            path="/adminsequence"
            render={() => {
              if (!user) {
                return <Redirect to="/" />
              } else {
                return <PageAdminSequence />
              }
            }}
          />
          <Route
            exact
            path="/adminsample"
            render={() => {
              if (!user) {
                return <Redirect to="/" />
              } else {
                return <PageAdminSample />
              }
            }}
          />
        </Switch>
        <div>
          <footer className="footer">
            <div className="container has-text-centered">
              <p>
                <strong>FGxBIO</strong> Senior Project 2018 by Wasin
                Panitansirikul
              </p>
            </div>
          </footer>
        </div>
      </div>
    )
  }
}

export default App
