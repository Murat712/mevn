import express from 'express';
import * as bookController from '../controllers/bookController.js';
const router = express.Router();

router.get('/', bookController.getAllBooks);
router.post('/', bookController.createBook);
router.get('/:id', bookController.getOneBook);
router.put('/:id', bookController.updateBook);
router.delete('/:id', bookController.deleteBook);

export default router;