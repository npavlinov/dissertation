import React from 'react'
import { Skeleton } from 'antd'
import Wrapper from './Wrapper'

function Loading() {
  return (
    <div>
      <Wrapper title="Loading...">
        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
          <Skeleton active />
        </div>
      </Wrapper>
    </div>
  )
}

export default Loading
