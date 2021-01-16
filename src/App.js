import './App.css';
import React from 'react';
import {withRouter} from 'react-router';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Activity from './Components/ActivityDetailComponent';
import Layout from './Components/Layout'
import EditDictionary from './Components/EditDictionaryComponent';
import EditEntry from './Components/EditEntryComponent';
import TimeTable from './Components/TimeTableComponent'

function App(props) {
  console.log(props.location)
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          {props.children}
          <Route exact path='/' component={withRouter(TimeTable)} />
          <Route path='/activityDetail' component={withRouter(Activity)} />
          <Route path='/editDictionary' component={EditDictionary} />
          <Route path='/editEntry' component={EditEntry} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App
