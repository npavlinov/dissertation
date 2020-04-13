import nextCookie from 'next-cookies'
import redirect from './redirect'
import cookie from 'js-cookie'
import Router from 'next/router'

export const checkToken = ctx => {
  const { token } = nextCookie(ctx)
  if (!token) {
    redirect(ctx, '/login')
  }

  return token
}

export const login = token => {
  cookie.set('token', token, { expires: 86400 })
  Router.push('/')
}

export const logout = () => {
  cookie.remove('token')
  window.localStorage.setItem('logout', Date.now())
  Router.push('/login')
}
