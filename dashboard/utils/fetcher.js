import fetch from 'isomorphic-unfetch'

export default function (url, type, token) {
  return fetch(url, {
    method: type,
    credentials: 'include',
    headers: { Authorization: token },
  }).then((_) => _.json())
}
