/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { Timestamp } from './google/protobuf/timestamp';
import { Empty } from './google/protobuf/empty';

export const protobufPackage = 'product';

export enum ProductStatus {
  PRODUCT_STATUS_UNSPECIFIED = 0,
  PRODUCT_STATUS_INSTOCK = 1,
  PRODUCT_STATUS_LOW = 2,
  PRODUCT_STATUS_NONE = 3,
}

export interface GetProductRequest {
  productId: number;
}

export interface GetProductResponse {
  product?:
    | { $case: 'product_null'; product_null: boolean }
    | { $case: 'product_value'; product_value: ProductModel };
}

export interface GetAllProductsRequest {}

export interface AddProductRequest {
  product: ProductModel | undefined;
}

export interface UpdateProductRequest {
  product: ProductModel | undefined;
}

export interface DeleteProductRequest {
  productId: number;
}

export interface DeleteProductResponse {
  success: boolean;
}

export interface InsertBulkProductResponse {
  success: boolean;
  insertCount: number;
}

export interface ProductModel {
  productId: number;
  name: string;
  description: string;
  price: number;
  status: ProductStatus;
  createdTime: Timestamp | undefined;
}

export const PRODUCT_PACKAGE_NAME = 'product';

export interface ProductServiceClient {
  getProduct(request: GetProductRequest): Observable<GetProductResponse>;

  getAllProducts(request: GetAllProductsRequest): Observable<ProductModel>;

  addProduct(request: AddProductRequest): Observable<ProductModel>;

  updateProducts(request: UpdateProductRequest): Observable<ProductModel>;

  deleteProduct(
    request: DeleteProductRequest,
  ): Observable<DeleteProductResponse>;

  insertBulkProduct(
    request: Observable<ProductModel>,
  ): Observable<InsertBulkProductResponse>;

  test(request: Empty): Observable<Empty>;
}

export interface ProductServiceController {
  getProduct(request: GetProductRequest): Observable<GetProductResponse>;

  getAllProducts(request: GetAllProductsRequest): Observable<ProductModel>;

  addProduct(request: AddProductRequest): Observable<ProductModel>;

  updateProducts(request: UpdateProductRequest): Observable<ProductModel>;

  deleteProduct(
    request: DeleteProductRequest,
  ): Observable<DeleteProductResponse>;

  insertBulkProduct(
    request: Observable<ProductModel>,
  ): Observable<InsertBulkProductResponse>;

  test(request: Empty): void;
}

export function ProductServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods = [
      'getProduct',
      'getAllProducts',
      'addProduct',
      'updateProducts',
      'deleteProduct',
      'test',
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('ProductService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
    const grpcStreamMethods = ['insertBulkProduct'];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcStreamMethod('ProductService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const PRODUCT_SERVICE_NAME = 'ProductService';
