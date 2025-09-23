import { Router } from 'express'
import multer from 'multer';

import { CreateUserController } from './controllers/user/CreateUserController'
import { AuthUserController } from './controllers/user/AuthUserController'
import { DetailUserController } from './controllers/user/DetailUserController'

import { CreateCategoryController } from './controllers/category/CreateCategoryController'
import { ListCategoryController } from './controllers/category/ListCategoryController'

import { CreateProductController } from './controllers/product/CreateProductController'
import { ListByCategoryController } from './controllers/product/ListByCategoryController';
import { ListProductController } from './controllers/product/ListProductController';
import { DetailProductController } from './controllers/product/DetailProductController';
import { SearchProductController } from './controllers/product/SearchProductController';


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
import { ListIngredientByProductController } from './controllers/additional/ListIngredientByProductController';

import { RemovingAdditionalController } from './controllers/additional/RemovingAdditionalController';
import { AddingAdditionalController } from './controllers/additional/AddingAdditionalController';

import { CreateTableController } from './controllers/table/CreateTableController';
import { ListTablesController } from './controllers/table/ListTablesController';

import { CreateMtdoPagtoController } from './controllers/mtdo_pagto/CreateMethodPaymentController';
import { ListMtdoPagtoController } from './controllers/mtdo_pagto/ListMethodPaymentController';

import { CreatePaymentController } from './controllers/payment/CreatePaymentController';
import { ListPaymentsController } from './controllers/payment/ListPaymentsController';
import { InputCPFController } from './controllers/payment/InputCPFController';

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

router.get('/product/all', new ListProductController().handle)

router.get('/product/especify', new DetailProductController().handle)

router.get('/product/search', new SearchProductController().handle)

// -- ROTAS ORDER --
router.post('/order', isAuthenticated, new CreateOrderController().handle)
router.delete('/order', isAuthenticated, new RemoveOrderController().handle)

router.post('/order/add', isAuthenticated, new AddItemController().handle)
router.delete('/order/remove', isAuthenticated, new RemoveItemController().handle)
router.put('/order/send', isAuthenticated, new SendOrderController().handle)

router.get('/orders', isAuthenticated, new ListOrdersController().handle)
router.get('/order/detail', new DetailOrderController().handle)

router.put('/order/finish', new FinishOrderController().handle)

// -- ROTAS ROLE --
router.post('/role', new CreateRoleController().handle)

router.get('/role', new ListRoleController().handle)

// -- ROTAS COSTUMERS --
router.post('/costumers', new CreateCostumerController().handle)

router.post('/session/costumers', new AuthCostumerController().handle)

router.get('/me/costumers', isAuthenticatedClient, new DetailCostumerController().handle)

// -- ROTAS ADDITIONAL --
//Põe para true ou false
router.put('/additional/removing', new RemovingAdditionalController().handle)
router.put('/additional/adding', new AddingAdditionalController().handle)

// Cria um novo
router.post('/ingredients', isAuthenticated, new CreateIngredientController().handle)

//Relaciona o adicional no produto
router.post('/additional', isAuthenticated, new AddAdditionalController().handle)

//Puxa os ingredientes de um produto
router.get('/product/ingredients', new ListIngredientByProductController().handle)

// -- ROTAS TABLE --
router.post('/table', isAuthenticated, new CreateTableController().handle)
router.get('/tables', isAuthenticated, new ListTablesController().handle)

// -- ROTAS METODO DE PAGAMENTO --
router.post('/mtdo_pagto', new CreateMtdoPagtoController().handle)
router.get('/mtdo_pagtos', new ListMtdoPagtoController().handle)

// -- ROTAS PAGAMENTO --
router.post('/payment',  new CreatePaymentController().handle)
router.get('/payments', new ListPaymentsController().handle)
router.put('/payment/cpf', new InputCPFController().handle)

export { router }