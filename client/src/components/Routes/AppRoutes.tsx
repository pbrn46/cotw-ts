import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Home from './Home'
import Inventory from './Inventory'


export default function AppRoutes() {
  return <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/inventory" element={<Inventory />} />
  </Routes>
}