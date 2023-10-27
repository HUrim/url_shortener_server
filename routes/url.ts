import * as express from 'express';
import { createUrl, deleteUrl, getUrls } from '../controllers/url';
const router = express.Router();
// ToDo: Routers
router.route('/urls').get(getUrls);
router.route('/url').post(createUrl);
router.route('/').delete(deleteUrl);
module.exports = router;