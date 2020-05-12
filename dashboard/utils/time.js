export default function (time) {
  return time >= 3600 ? `${time / 3600} hour` : `${time / 60} min`
}
