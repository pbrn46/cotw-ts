import React, { useCallback } from 'react'
import { Button, ButtonGroup } from '@material-ui/core'
import { useDispatch, useSelector } from '../../redux/store'
import { discoverSurroundings, setCurrentMap } from '../../redux/reducers/currentMap'
import { genMap, Size } from '../../lib/mapUtil'
import { toggleShroud } from '../../redux/reducers/config'


export default function Top() {
  const dispatch = useDispatch()

  const heroPos = useSelector(state => state.hero.pos)
  const handleTestClick = useCallback(() => {
    dispatch(setCurrentMap(genMap(Size(50, 50))))
    dispatch(discoverSurroundings(heroPos))
  }, [dispatch, heroPos])

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