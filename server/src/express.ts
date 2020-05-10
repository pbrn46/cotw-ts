import express from 'express'

import routes from './routes'

const app = express()

app.use(routes)

const port = 3530
app.listen(port, () => console.log(`Server listening on port ${port}`))

export default app