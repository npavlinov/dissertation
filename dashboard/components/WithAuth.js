// Based on zeit's model for Next.JS's cookie authentication
// Ref:

import { useEffect } from 'react'
import { checkToken } from '../utils/auth'

const WithAuth = (Component) => {
  const WrappedAuthComponent = (props) => {
    const eventLogout = (event) => {
      if (event.key === 'logout') {
        Router.push('/login')
      }
    }

    useEffect(() => {
      window.addEventListener('storage', eventLogout)

      return () => {
        window.removeEventListener('storage', eventLogout)
        window.localStorage.removeItem('logout')
      }
    }, [])

    return <Component {...props} />
  }

  WrappedAuthComponent.getInitialProps = async (ctx) => {
    const token = checkToken(ctx)

    const componentProps =
      Component.getInitialProps && (await Component.getInitialProps(ctx))

    return { ...componentProps, token }
  }

  return WrappedAuthComponent
}

export default WithAuth
