import express from 'express';
import * as bookController from '../controllers/bookController.js';
const router = express.Router();
import authMiddleware from '../middlewares/authMiddleware.js';


router
    .route('/')
    .get(bookController.getAllBooks)
    .post(bookController.createBook);

router
    .route('/:id')
    .get(bookController.getOneBook)
    .put(bookController.updateBook)
    .delete(authMiddleware.authenticateUser, bookController.deleteBook);

export default router;