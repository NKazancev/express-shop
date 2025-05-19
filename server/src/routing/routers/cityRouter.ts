import { Router } from 'express';

import verifyToken from '../../middlewares/verifyToken';
import verifyAdmin from '../../middlewares/verifyAdmin';
import asyncHandler from '../../middlewares/asyncHandler';
import CityController from '../../controllers/cityController';

const cityRouter = Router();

const { createCity, getAllCitiesByCountryId, deleteCity } = CityController;

cityRouter.post('/', [verifyToken, verifyAdmin], asyncHandler(createCity));
cityRouter.get('/', asyncHandler(getAllCitiesByCountryId));
cityRouter.delete('/:id', [verifyToken, verifyAdmin], asyncHandler(deleteCity));

export default cityRouter;
