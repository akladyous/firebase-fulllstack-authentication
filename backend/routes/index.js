import { home } from './home/index.js'
import { usersRoute } from './users/usersRoute.js'
import { shortUrlRoute } from './shortUrl/shortUrl.js'
import { csrfRoute } from './csrfRoute/csrfRoute.js'
import { verifySessionCookie } from '../middleware/verifySessionCookie.js'
import { testRoute } from './test/testRoute.js'

const routes = (app) => {
    app.use('/', home)
    app.use('/api', shortUrlRoute)
    app.use('/api', csrfRoute)
    app.use('/api', usersRoute)
    app.use('/api/*', verifySessionCookie)
    app.use('/api', testRoute)
};

export default routes;