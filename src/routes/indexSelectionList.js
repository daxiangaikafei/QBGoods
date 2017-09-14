import React from 'react'
import { Route, IndexRoute, Router } from 'dva/router'
import CoreLayout from '../containers/layout'
import SelectionList from "views/Special/SelectionList/page"

export default function (ref) {
  return (
    <Router history={ref.history}>
      <Route path='/' component={CoreLayout} name="有好货">
        <IndexRoute component={SelectionList} name="好物精选"/>
        <Route path='/SelectionList' component={SelectionList} name="好物精选" />        
      </Route>
    </Router>
  )
}
