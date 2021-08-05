import React, { useState } from 'react'
import noop from 'lodash/noop'
import { Button } from 'antd'

import './index.less'

export default function LoadButton({
  onClick = noop,
  children = '',
  ...rest
}) {
  const [loading, setLoading] = useState(false)

  async function handleClick() {
    setLoading(true)
    try {
      const result = await onClick()

      setLoading(false)

      return result
    } catch (e) {
      setLoading(false)
    }
  }


  return (
    <Button onClick={handleClick} className="load-button" loading={loading} {...rest}>{children}</Button>
  )
}