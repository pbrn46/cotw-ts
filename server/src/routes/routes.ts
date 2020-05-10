import path from 'path'
import express, { Router } from 'express'

const router = Router()

export const REACT_BUILD_PATH = path.normalize(path.join(__dirname, '..', '..', '..', 'client', 'build'))
router.use(express.static(REACT_BUILD_PATH));
router.get("/*", (req, res) => {
  res.sendFile(path.join(REACT_BUILD_PATH, 'index.html'))
})

export default router