export default function (time) {
  return time >= 3600 ? `${time / 3600} h` : `${time / 60} min`
}
