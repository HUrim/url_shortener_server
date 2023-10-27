import * as express from 'express';
import { createUrl, deleteUrl, getShortUrl, getUrls } from '../controllers/url';
const router = express.Router();
// ToDo: Routers
router.route('/urls').get(getUrls);
router.route('/url').post(createUrl);
router.route('/').delete(deleteUrl);
router.route('/:shortUrlId').get(getShortUrl);
module.exports = router;