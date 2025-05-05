import { Router } from 'express';

import ReviewController from '../../controllers/reviewController';
import verifyToken from '../../middlewares/verifyToken';
import asyncHandler from '../../middlewares/asyncHandler';

const reviewRouter = Router();

const { createProductReview, getProductReview } = ReviewController;

reviewRouter.post('/', [verifyToken], asyncHandler(createProductReview));
reviewRouter.get('/:id', [verifyToken], asyncHandler(getProductReview));

export default reviewRouter;
