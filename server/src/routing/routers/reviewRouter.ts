import { Router } from 'express';

import ReviewController from '../../controllers/reviewController';
import verifyToken from '../../middlewares/verifyToken';
import asyncHandler from '../../middlewares/asyncHandler';

const reviewRouter = Router();

const { createProductReview, getProductReviews } = ReviewController;

reviewRouter.post('/', [verifyToken], asyncHandler(createProductReview));
reviewRouter.get('/', asyncHandler(getProductReviews));

export default reviewRouter;
