import * as express from 'express';
import { createUrl, getUrls } from '../controllers/url';
const router = express.Router();
// ToDo: Routers
router.route('/urls').get(getUrls);
router.route('/url').post(createUrl);
module.exports = router;