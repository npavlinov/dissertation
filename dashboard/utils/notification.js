import { notification } from 'antd'

export default function (type, message) {
  notification[type]({
    message: message,
  })
}
