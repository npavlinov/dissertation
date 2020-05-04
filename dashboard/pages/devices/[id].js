import Head from 'next/head'
import { useRouter } from 'next/router'
import getConfig from 'next/config'
import fetch from 'isomorphic-unfetch'
import useSWR from 'swr'

import { Typography } from 'antd'
import 'antd/dist/antd.css'

import Wrapper from '../../components/Wrapper'
import DeviceForm from '../../components/DeviceForm'
import notification from '../../utils/notification'
import fetcher from '../../utils/fetcher'
import WithAuth from '../../components/WithAuth'
import Loading from '../../components/Loading'

const { publicRuntimeConfig } = getConfig()
const { Title } = Typography

const Device = (props) => {
  const router = useRouter()
  const { id } = router.query

  const { data } = useSWR(
    [`${publicRuntimeConfig.API_URL}/api/devices/${id}`, 'GET', props.token],
    fetcher
  )

  if (!data) {
    return <Loading />
  }

  const handleSubmit = async (values) => {
    try {
      const res = await fetch(
        `${publicRuntimeConfig.API_URL}/api/devices/${id}`,
        {
          method: 'PATCH',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            Authorization: props.token,
          },
          body: JSON.stringify(values),
        }
      )
      const { message } = await res.json()
      if (res.status === 200) {
        notification('success', message)
      } else {
        notification('error', message)
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <Head>
        <title>Edit Device</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Wrapper>
        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
          <Title level={2}>Edit Device: {data.name}</Title>
          <DeviceForm handleSubmit={handleSubmit} device={data} />
        </div>
      </Wrapper>
    </div>
  )
}

export default WithAuth(Device)
