import { Router } from 'express';

import verifyToken from '../../middlewares/verifyToken';
import verifyAdmin from '../../middlewares/verifyAdmin';
import asyncHandler from '../../middlewares/asyncHandler';
import CountryController from '../../controllers/countryController';

const countryRouter = Router();

const { createCountry, getCountries, deleteCountry } = CountryController;

countryRouter.post('/', [verifyToken, verifyAdmin], asyncHandler(createCountry));
countryRouter.get('/', asyncHandler(getCountries));
countryRouter.delete('/:id', [verifyToken, verifyAdmin], asyncHandler(deleteCountry));

export default countryRouter;
