import React from "react"
import { Route, Redirect } from "react-router-dom"
import { useSelector } from "react-redux"
import TheSidebar from "./TheSidebar"
import TheHeader from "./TheHeader"

const PrivateRoute = ({ children, ...remainingProps }) => {

  const isAuth = useSelector(state => state.auth.isAuth)

  return (
    <Route
      {...remainingProps}
      render={({ location }) =>
        isAuth ? (
            <div className="c-app c-default-layout">
              <TheSidebar/>
              <div className="c-wrapper">
                <TheHeader/>
                <div className="c-body">
                  { children }
                </div>
              </div>
            </div>
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  )
}

export default PrivateRoute
