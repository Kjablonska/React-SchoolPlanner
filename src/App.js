import './App.css';
import React from 'react';
import {withRouter} from 'react-router';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Activity from './Components/ActivityDetailComponent';
import TimeTable from './Components/TimeTableComponent'


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={withRouter(TimeTable)} />
        <Route path='/activityDetail' component={withRouter(Activity)} />
      </Switch>
    </BrowserRouter>
  );
}

export default App
