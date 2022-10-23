import dynamic from 'next/dynamic'
import React from 'react'

const noSsr = (props: any) => (
  <React.Fragment>{props.children}</React.Fragment>
)

export default dynamic(() => Promise.resolve(noSsr), {
  ssr: false
})