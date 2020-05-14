import React, { useCallback } from 'react'
import { Button, ButtonGroup } from '@material-ui/core'
import { useDispatch } from '../../redux/store'
import { toggleShroud } from '../../redux/reducers/config'
import { debugTest1 } from "../../redux/reducers/debug"


export default function Top() {
  const dispatch = useDispatch()

  const handleTestClick = useCallback(() => {
    dispatch(debugTest1())
  }, [dispatch])

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
    <Button
      onClick={handleTestClick}
    >Test</Button>
    <Button
      onClick={e => dispatch(toggleShroud())}
    >Toggle Shroud</Button>
  </div>
}