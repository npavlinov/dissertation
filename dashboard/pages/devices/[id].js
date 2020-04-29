import Head from 'next/head'
import { useRouter } from 'next/router'
import getConfig from 'next/config'

import { Typography } from 'antd'
import 'antd/dist/antd.css'

import Wrapper from '../../components/Wrapper'
import DeviceForm from '../../components/DeviceForm'

import { checkToken } from '../../utils/auth'
const { publicRuntimeConfig } = getConfig()
const { Title } = Typography

const Device = (props) => {
  const router = useRouter()
  const { id } = router.query

  return (
    <div>
      <Head>
        <title>Add Device</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Wrapper>
        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
          <Title level={2}>Edit Device: </Title>
          <DeviceForm
            config={publicRuntimeConfig}
            token={props.token}
            device={props.device}
          />
        </div>
      </Wrapper>
    </div>
  )
}

Device.getInitialProps = async function (ctx) {
  try {
    const token = checkToken(ctx)
    const res = await fetch(
      `${publicRuntimeConfig.API_URL}/api/devices/${ctx.query.id}`,
      {
        method: 'GET',
        credentials: 'include',
        headers: { Authorization: token },
      }
    )
    const device = await res.json()

    if (res.status === 200) {
      return {
        device,
      }
    } else {
      if (process.browser) {
        notification('error', 'Something went wrong loading the device!')
      }
    }
  } catch (err) {
    console.log(err)
  }
}

export default Device
