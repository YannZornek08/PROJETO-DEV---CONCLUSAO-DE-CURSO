import { Router } from 'express'
import multer from 'multer';

import { CreateUserController } from './controllers/user/CreateUserController'
import { AuthUserController } from './controllers/user/AuthUserController'
import { DetailUserController } from './controllers/user/DetailUserController'

import { CreateCategoryController } from './controllers/category/CreateCategoryController'
import { ListCategoryController } from './controllers/category/ListCategoryController'

import { CreateProductController } from './controllers/product/CreateProductController'
import { ListByCategoryController } from './controllers/product/ListByCategoryController';


import { CreateOrderController } from './controllers/order/CreateOrderController';
import { RemoveOrderController } from './controllers/order/RemoveOrderController';

import { AddItemController } from './controllers/order/AddItemController';
import { RemoveItemController } from './controllers/order/RemoveItemController';
import { SendOrderController } from './controllers/order/SendOrderController';

import { ListOrdersController } from './controllers/order/ListOrdersController';
import { DetailOrderController } from './controllers/order/DetailOrderController';
import { FinishOrderController } from './controllers/order/FinishOrderController';

import { CreateRoleController } from './controllers/role/CreateRoleController';
import { ListRoleController } from './controllers/role/ListCategoryController';

import { CreateCostumerController } from './controllers/costumer/CreateCostumerController';
import { AuthCostumerController } from './controllers/costumer/AuthCostumerController';
import { DetailCostumerController } from './controllers/costumer/DetailCostumerController';

import { CreateIngredientController } from './controllers/additional/CreateIngredientController';
import { AddAdditionalController } from './controllers/additional/AddAdditionalController';
import { RemoveIngredientController } from './controllers/additional/RemoveIngredientController';
import { AddIngredientController } from './controllers/additional/AddIngredientController';
import { ListIngredientByProductController } from './controllers/additional/ListIngredientByProductController';

import { isAuthenticated } from './middlewares/isAuthenticated'
import { isAuthenticatedClient } from './middlewares/isAuthenticatedClient'

import uploadConfig from './config/multer'

const router = Router()

const upload = multer(uploadConfig.upload("./tmp"))

// -- ROTAS USER --
router.post('/users', new CreateUserController().handle)

router.post('/session', new AuthUserController().handle)

router.get('/me', isAuthenticated, new DetailUserController().handle)

// -- ROTAS CATEGORY --
router.post('/category', isAuthenticated, new CreateCategoryController().handle)

router.get('/category', isAuthenticated, new ListCategoryController().handle)

// -- ROTAS PRODUCT --
// router.post('/product', isAuthenticated, upload.single('file'), new CreateProductController().handle)
router.post('/product', isAuthenticated, new CreateProductController().handle)
router.get('/category/product', isAuthenticated, new ListByCategoryController().handle)

// -- ROTAS ORDER --
router.post('/order', isAuthenticated, new CreateOrderController().handle)
router.delete('/order', isAuthenticated, new RemoveOrderController().handle)

router.post('/order/add', isAuthenticated, new AddItemController().handle)
router.delete('/order/remove', isAuthenticated, new RemoveItemController().handle)
router.put('/order/send', isAuthenticated, new SendOrderController().handle)

router.get('/orders', isAuthenticated, new ListOrdersController().handle)
router.get('/order/detail', isAuthenticated, new DetailOrderController().handle)

router.put('/order/finish', isAuthenticated, new FinishOrderController().handle)

// -- ROTAS ROLE --
router.post('/role', new CreateRoleController().handle)

router.get('/role', new ListRoleController().handle)

// -- ROTAS COSTUMERS --
router.post('/costumers', new CreateCostumerController().handle)

router.post('/session/costumers', new AuthCostumerController().handle)

router.get('/me/costumers', isAuthenticatedClient, new DetailCostumerController().handle)

// -- ROTAS ADDITIONAL --
router.post('/ingredients', isAuthenticated, new CreateIngredientController().handle)
router.post('/additional', isAuthenticated, new AddAdditionalController().handle)
router.delete('/ingredients/remove', isAuthenticated, new RemoveIngredientController().handle)
router.delete('/ingredients/add', isAuthenticated, new AddIngredientController().handle)
router.get('/product/ingredients', isAuthenticated, new ListIngredientByProductController().handle)

export { router }