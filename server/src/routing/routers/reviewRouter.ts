import { Router } from 'express';

import ReviewController from '../../controllers/reviewController';
import verifyToken from '../../middlewares/verifyToken';
import asyncHandler from '../../middlewares/asyncHandler';

const reviewRouter = Router();

const { createProductReview, getAllUserReviews, getUserReview, deleteReview } =
  ReviewController;

reviewRouter.post('/', [verifyToken], asyncHandler(createProductReview));
reviewRouter.get('/', [verifyToken], asyncHandler(getAllUserReviews));
reviewRouter.get('/:id', [verifyToken], asyncHandler(getUserReview));
reviewRouter.delete('/:id', [verifyToken], asyncHandler(deleteReview));

export default reviewRouter;
