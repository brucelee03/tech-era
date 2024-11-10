import {Route, Switch, Redirect} from 'react-router-dom'

import Header from './components/Header'
import Courses from './components/Courses'
import CourseItemDetails from './components/CourseItemDetails'
import NotFound from './components/NotFound'

import './App.css'

const App = () => (
  <>
    <Header />
    <Switch>
      <Route exact path="/" component={Courses} />
      <Route exact path="/courses/:id" component={CourseItemDetails} />
      <Route path="/not-found" component={NotFound} />
      <Redirect to="not-found" />
    </Switch>
  </>
)

export default App
