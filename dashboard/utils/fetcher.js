import fetch from 'isomorphic-unfetch'

export default async function (url, type, token) {
  return await fetch(url, {
    method: type,
    credentials: 'include',
    headers: { Authorization: token },
  }).then((_) => _.json())
}
