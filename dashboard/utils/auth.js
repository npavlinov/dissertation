import nextCookie from 'next-cookies'
import redirect from './redirect'
import cookie from 'js-cookie'
import jwt_decode from 'jwt-decode'
import Router from 'next/router'

export const checkToken = (ctx) => {
  const { token } = nextCookie(ctx)
  if (!token) {
    redirect(ctx, '/login')
  }

  const decodedToken = jwt_decode(token)

  return { ...decodedToken, token }
}

export const login = (token) => {
  cookie.set('token', token, { expires: 1 })
  Router.push('/')
}

export const logout = () => {
  cookie.remove('token')
  window.localStorage.setItem('logout', Date.now())
  Router.push('/login')
}
