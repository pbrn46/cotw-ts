import React from 'react'
import Terrain from '../Canvases/Terrain'
import Structures from '../Canvases/Structures'
import Sprites from '../Canvases/Sprites'
import './WorldView.css'
import { useKeyHandler } from '../../lib/keyHandler'

export default function WorldView() {
  useKeyHandler()
  return <div className="WorldView">
    <div className="WorldView-Inner">
      <Terrain />
      <Structures />
      <Sprites />
    </div>
  </div>
}