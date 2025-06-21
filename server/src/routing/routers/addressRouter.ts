import { Router } from 'express';

import AddressController from '../../controllers/addressController';
import verifyToken from '../../middlewares/verifyToken';
import asyncHandler from '../../middlewares/asyncHandler';

const addressRouter = Router();

const { createAddress, getAddress, updateAddress } = AddressController;

addressRouter.post('/', [verifyToken], asyncHandler(createAddress));
addressRouter.get('/', [verifyToken], asyncHandler(getAddress));
addressRouter.put('/:id', [verifyToken], asyncHandler(updateAddress));

export default addressRouter;
