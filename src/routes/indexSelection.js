import React from 'react'
import { Route, IndexRoute, Router } from 'dva/router'
import CoreLayout from '../containers/layout'
import Selection from 'views/Special/Selection/page'
export default function (ref) {
  return (
    <Router history={ref.history}>
      <Route path='/' component={CoreLayout} name="有好货">
        <IndexRoute component={Selection} name="好物精选"/>
        <Route path='/Selection' component={Selection} name="好物精选" />
      </Route>
    </Router>
  )
}