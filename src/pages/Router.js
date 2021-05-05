import React, {Suspense, lazy} from "react"
import {Route, Switch, Redirect} from "react-router-dom"
import PrivateRoute from "../containers/PrivateRoute"
import FullSpinner from "../components/spinners/FullSpinner"
import VacanciesContent from "src/components/vacancies/VacanciesContent"
import { unstable_renderSubtreeIntoContainer } from "react-dom"

const LoginPage = lazy(() => import('./LoginPage'))
const RegisterPage = lazy(() => import('./RegisterPage'))
const MainPage = lazy(() => import('./MainPage'))
const Page404 = lazy(() => import('./Page404'))
const Vacancies = lazy(() => import('./Vacancies'))
const Countries = lazy(() => import('./Countries'))
const Users = lazy(() => import('./Users'))
const Cities = lazy(() => import('./Cities'))
const CatalogPage = lazy(() => import('./CatalogPage'))



export default function Router(){
  return (
    <Suspense fallback={<FullSpinner/>}>
      <Switch>
        <Route exact path="/login">
          <LoginPage/>
        </Route>
        <Route exact path="/register">
          <RegisterPage/>
        </Route>
        <PrivateRoute exact path="/main">
          <MainPage/>
        </PrivateRoute>
        <PrivateRoute exact path="/vacancies">
          <Vacancies/>
        </PrivateRoute>
        <PrivateRoute exact path="/">
          <Redirect to="/main"/>
        </PrivateRoute>
        <PrivateRoute exact path="/countries">
          <Countries/>
        </PrivateRoute>
        <PrivateRoute exact path="/users">
          <Users/>
        </PrivateRoute>
        <PrivateRoute exact path="/cities">
          <Cities/>
        </PrivateRoute>
        <PrivateRoute exact path="/catalog">
          <CatalogPage/>
        </PrivateRoute>
        <Route>
          <Page404/>
        </Route>
      </Switch>
    </Suspense>
  )
}
