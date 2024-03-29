import React from 'react'
import fetch from 'isomorphic-unfetch'
import getConfig from 'next/config'
import useSWR, { mutate } from 'swr'
import { Table, Button, Typography, Badge, Tooltip, Space, Modal } from 'antd'
import {
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons'
import Wrapper from '../../components/Wrapper'
import WithAuth from '../../components/WithAuth'
import Loading from '../../components/Loading'
import notification from '../../utils/notification'
import fetcher from '../../utils/fetcher'
import time from '../../utils/time'

const { Title } = Typography
const { Column } = Table
const { confirm } = Modal

const { publicRuntimeConfig } = getConfig()

const Devices = (props) => {
  const { data } = useSWR(
    [`${publicRuntimeConfig.API_URL}/api/devices`, 'GET', props.token],
    fetcher
  )

  if (!data) {
    return <Loading />
  }

  const showDeleteModal = (e, id) => {
    confirm({
      title: 'Are you sure you want to delete this device?',
      icon: <ExclamationCircleOutlined />,
      content: 'Some descriptions',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      async onOk() {
        try {
          const res = await fetch(
            `${publicRuntimeConfig.API_URL}/api/devices/${id}`,
            {
              method: 'DELETE',
              credentials: 'include',
              headers: { Authorization: props.token },
            }
          )
          const resJson = await res.json()

          const { message } = resJson
          if (res.status === 200) {
            mutate([
              `${publicRuntimeConfig.API_URL}/api/devices`,
              'GET',
              props.token,
            ])
            notification('success', message)
          } else {
            notification('error', message)
          }
        } catch (err) {
          console.log(err)
        }
      },
      onCancel() {
        console.log('Cancel')
      },
    })
  }

  return (
    <div>
      <Wrapper title="Devices">
        <Title level={2}>Devices</Title>
        <div style={{ marginBottom: 16 }}>
          <Button
            data-cy="add-device"
            type="primary"
            icon={<PlusOutlined />}
            href="/devices/create"
          >
            Add
          </Button>
        </div>
        <Table
          dataSource={data.map((device, index) => {
            return {
              ...device,
              key: index + 1,
            }
          })}
        >
          <Column title="ID" dataIndex="key" key="id" />
          <Column title="Name" dataIndex="name" key="name" />
          <Column
            title="Fetch Time"
            dataIndex="fetchTime"
            key="fetchTime"
            render={(fetchTime) => <div>{time(fetchTime)}</div>}
          />
          <Column
            title="Connected"
            dataIndex="connected"
            key="connected"
            render={(text, record) =>
              record.connected ? (
                <div>
                  <Badge status="success" />
                  Active
                </div>
              ) : (
                <div>
                  <Badge status="error" />
                  Inactive
                </div>
              )
            }
          />
          <Column title="IP" dataIndex="ip" key="ip" />
          <Column
            title="Actions"
            key="action"
            render={(text, record) => (
              <Space>
                <Tooltip title="edit">
                  <Button
                    data-cy={`edit-device-${record.key}`}
                    type="primary"
                    shape="circle"
                    icon={<EditOutlined />}
                    href={`/devices/${record.id}`}
                  />
                </Tooltip>
                <Tooltip title="delete">
                  <Button
                    data-cy={`delete-device-${record.key}`}
                    danger
                    type="primary"
                    shape="circle"
                    icon={<DeleteOutlined />}
                    onClick={(e) => showDeleteModal(e, record.id)}
                  />
                </Tooltip>
              </Space>
            )}
          />
        </Table>
      </Wrapper>
    </div>
  )
}

export default WithAuth(Devices)
