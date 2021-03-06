import React, { FunctionComponent, useEffect } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LOGIN_PAGE } from '../util/types'
import loginActions from '../../login/actions'
import { GoGovReduxState } from '../reducers/types'

type PrivateRouteProps = {
  component: React.ComponentType<any>
  path: string
}

const PrivateRoute: FunctionComponent<PrivateRouteProps> = (
  props: PrivateRouteProps,
) => {
  const { component: ChildComponent } = props
  const { path } = props
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(
    (state: GoGovReduxState) => state.login.isLoggedIn,
  )
  useEffect(() => {
    dispatch(loginActions.isLoggedIn())
  }, [dispatch])

  return (
    <Route
      path={path}
      render={(routeProps) =>
        isLoggedIn ? (
          /* eslint-disable react/jsx-props-no-spreading */
          <ChildComponent {...routeProps} />
        ) : (
          <Redirect
            to={{
              pathname: LOGIN_PAGE,
              state: { previous: path },
            }}
          />
        )
      }
    />
  )
}

export default PrivateRoute
