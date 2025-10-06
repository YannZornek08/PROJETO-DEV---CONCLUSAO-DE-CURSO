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

// ==============
// INGREDIENTES
// ==============
import { CreateIngredientController } from './controllers/ingredients/CreateIngredientController';
import { AddIngredientController } from './controllers/ingredients/AddIngredientController';
import { ListAllItemIngredientByProductController } from './controllers/ingredients/ListAllItemIngredientByProductController';
import { ListIngredientByProductController } from './controllers/ingredients/ListIngredientByProduct';
import { AllItemIngredientController } from './controllers/ingredients/AllItemIngredientController';
import { UpdateIngredientController } from './controllers/ingredients/UpdateIngredientController';
import { ItemIngredientController } from './controllers/ingredients/ItemIngredientController';
import { RemoveItemIngredientController } from './controllers/ingredients/RemoveItemIngredientController';

import { AddAdditionalController } from './controllers/additional/RelationAdditionalController';
import { ListAdditionalByCategoryController } from './controllers/additional/ListAdditionalByCategoryController';
import { UpdateAdditionalController } from './controllers/additional/UpdateAdditionalController';
import { AllItemAdditionalController } from './controllers/additional/AllItemAdditionalController';

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
import { DetailTableController } from './controllers/table/DetailTableController';
import { CreateAdditionalController } from './controllers/additional/CreateAdditionalController';

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
router.post('/order', new CreateOrderController().handle)
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

router.get('/me/costumers', new DetailCostumerController().handle)

// -- ROTAS INGREDIENTS --
router.post('/ingredients', new CreateIngredientController().handle)
//Relaciona o adicional no produto
router.post('/ingredient/relation', new AddIngredientController().handle)

//Puxa os ingredientes do item de um produto
router.get('/product/all/ingredients', new ListAllItemIngredientByProductController().handle)
router.get('/product/ingredients', new ListIngredientByProductController().handle)


// Lista todos os ingredientes de um item
router.post('/item/all/ingredients', new AllItemIngredientController().handle)

//Cria e remove um igrediente do item
router.post('/item/ingredient/create', new ItemIngredientController().handle)
router.post('/item/ingredient/delete', new RemoveItemController().handle)

//Atualiza o item ingrediente (adicionado: true ou false)
router.put('/item/ingredient', new UpdateIngredientController().handle)

// -- ROTAS ADDITIONAL --
// Cria um adicional
router.post('/additional', new CreateAdditionalController().handle)
//Cria todos os adicionais de uma categoria para um item
router.post('/item/all/additionals', new AllItemAdditionalController().handle)
//Relaciona o adicional na categoria
router.post('/additional/relation', new AddAdditionalController().handle)
//Puxa os adicionais de uma categoria
router.get('/category/additionals', new ListAdditionalByCategoryController().handle)
//Atualiza o item adicional (adicionado: true ou false)
router.put('/item/additional', new UpdateAdditionalController().handle)

// -- ROTAS TABLE --
router.post('/table', isAuthenticated, new CreateTableController().handle)
router.get('/tables', isAuthenticated, new ListTablesController().handle)
router.get('/table/detail', new DetailTableController().handle)

// -- ROTAS METODO DE PAGAMENTO --
router.post('/mtdo_pagto', new CreateMtdoPagtoController().handle)
router.get('/mtdo_pagtos', new ListMtdoPagtoController().handle)

// -- ROTAS PAGAMENTO --
router.post('/payment',  new CreatePaymentController().handle)
router.get('/payments', new ListPaymentsController().handle)
router.put('/payment/cpf', new InputCPFController().handle)

export { router }