import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import{NavBar} from '../components'
import {qasList,qasInsert,qasUpdate} from '../pages'

import 'bootstrap/dist/css/bootstrap.min.css'

function App(){
	return (
		<Router>
			<NavBar />
			<Switch>
				<Route path="/qas/list" exact component={qasList} />
				<Route path="/qas/create" exact component={qasInsert} />
				<Route path="/qas/update/:id" exact component={qasUpdate} />
			</Switch>
		</Router>
	)
}

export default App