import React from 'react'
import { Button, ButtonGroup } from '@material-ui/core'


export default function Top() {
  return <div>
    <ButtonGroup>
      <Button variant="outlined">Get</Button>
      <Button variant="outlined">Free Hand</Button>
      <Button variant="outlined">Search</Button>
      <Button variant="outlined">Disarm</Button>
      <Button variant="outlined">Rest</Button>
      <Button variant="outlined">Save</Button>
    </ButtonGroup>
    <ButtonGroup>
      <Button>0</Button>
      <Button>1</Button>
      <Button>2</Button>
      <Button>3</Button>
      <Button>4</Button>
      <Button>5</Button>
      <Button>6</Button>
      <Button>7</Button>
      <Button>8</Button>
      <Button>9</Button>
    </ButtonGroup>
  </div>
}