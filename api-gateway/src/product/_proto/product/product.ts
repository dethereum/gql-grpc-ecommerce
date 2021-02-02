/* eslint-disable */
import { GrpcMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { Timestamp } from '../google/protobuf/timestamp';

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
  /** always set this to "true" when null */
  productNull: boolean | undefined;
  productValue: ProductModel | undefined;
}

export interface GetAllProductsRequest {}

export interface GetAllProductsResponse {
  product: ProductModel | undefined;
}

export interface AddProductRequest {
  product: ProductModel | undefined;
}

export interface AddProductResponse {
  product: ProductModel | undefined;
}

export interface UpdateProductsRequest {
  product: ProductModel | undefined;
}

export interface UpdateProductsResponse {
  product: ProductModel | undefined;
}

export interface DeleteProductRequest {
  productId: number;
}

export interface DeleteProductResponse {
  success: boolean;
}

export interface InsertBulkProductRequest {
  product: ProductModel | undefined;
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

  getAllProducts(
    request: GetAllProductsRequest,
  ): Observable<GetAllProductsResponse>;

  addProduct(request: AddProductRequest): Observable<AddProductResponse>;

  updateProducts(
    request: UpdateProductsRequest,
  ): Observable<UpdateProductsResponse>;

  deleteProduct(
    request: DeleteProductRequest,
  ): Observable<DeleteProductResponse>;

  insertBulkProduct(
    request: InsertBulkProductRequest,
  ): Observable<InsertBulkProductResponse>;
}

export interface ProductServiceController {
  getProduct(request: GetProductRequest): Observable<GetProductResponse>;

  getAllProducts(
    request: GetAllProductsRequest,
  ): Observable<GetAllProductsResponse>;

  addProduct(request: AddProductRequest): Observable<AddProductResponse>;

  updateProducts(
    request: UpdateProductsRequest,
  ): Observable<UpdateProductsResponse>;

  deleteProduct(
    request: DeleteProductRequest,
  ): Observable<DeleteProductResponse>;

  insertBulkProduct(
    request: InsertBulkProductRequest,
  ): Observable<InsertBulkProductResponse>;
}

export function ProductServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods = [
      'getProduct',
      'getAllProducts',
      'addProduct',
      'updateProducts',
      'deleteProduct',
      'insertBulkProduct',
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
  };
}

export const PRODUCT_SERVICE_NAME = 'ProductService';
