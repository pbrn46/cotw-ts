import React, { useCallback } from 'react'
import { useAppDispatch } from '../../redux/store'
import { cycleShroudMode } from '../../redux/reducers/config'
import { debugTest1 } from "../../redux/reducers/debug"


export default function Top() {
  const dispatch = useAppDispatch()

  const handleTestClick = useCallback(() => {
    dispatch(debugTest1())
  }, [dispatch])

  return <div>
    <div className="button-group">
      <button>Get</button>
      <button>Free Hand</button>
      <button>Search</button>
      <button>Disarm</button>
      <button>Rest</button>
      <button>Save</button>
    </div>
    <div className="button-group">
      <button>0</button>
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button>4</button>
      <button>5</button>
      <button>6</button>
      <button>7</button>
      <button>8</button>
      <button>9</button>
    </div>
    <button
      onClick={handleTestClick}
    >Test</button>
    <button
      onClick={e => dispatch(cycleShroudMode())}
    >Cycle Shroud</button>
  </div>
}