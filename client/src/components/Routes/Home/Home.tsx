import React from 'react'
import { Container } from '@material-ui/core'
import WorldView from '../../WorldView'
import Bottom from '../../Bottom'
import Top from '../../Top'

export default function Home() {
  return <Container style={{ height: "100%" }}>
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div>
        <Top />
      </div>
      <div style={{ flexGrow: 1 }}>
        <WorldView />
      </div>
      <div>
        <Bottom />
      </div>
    </div>
  </Container>
}