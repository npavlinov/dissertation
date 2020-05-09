export const camelToNormal = (text) => {
  if (text === 'pH') return 'pH'
  return text.charAt(0).toUpperCase() + text.slice(1).replace(/([A-Z])/g, ' $1')
}

export const addSuffix = (param) => {
  switch (param) {
    case 'airTemperature':
      return '°C'
    case 'waterTemperature':
      return '°C'
    case 'waterLevels':
      return 'cm'
    default:
      return ''
  }
}
