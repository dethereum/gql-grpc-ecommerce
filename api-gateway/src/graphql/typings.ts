
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum ProductStatus {
    PRODUCT_STATUS_UNSPECIFIED = "PRODUCT_STATUS_UNSPECIFIED",
    PRODUCT_STATUS_INSTOCK = "PRODUCT_STATUS_INSTOCK",
    PRODUCT_STATUS_LOW = "PRODUCT_STATUS_LOW",
    PRODUCT_STATUS_NONE = "PRODUCT_STATUS_NONE"
}

export interface GetProductRequestInput {
    productId?: number;
}

export interface AddProductRequestInput {
    product?: ProductModelInput;
}

export interface ProductModelInput {
    productId?: number;
    name?: string;
    description?: string;
    price?: number;
    status?: ProductStatus;
    createdTime?: GoogleProtobufTimestampInput;
}

export interface GoogleProtobufTimestampInput {
    seconds?: BigInt;
    nanos?: number;
}

export interface UpdateProductRequestInput {
    product?: ProductModelInput;
}

export interface DeleteProductRequestInput {
    productId?: number;
}

export interface GoogleProtobufEmptyInput {
    _?: boolean;
}

export interface GetAllProductsRequestInput {
    _?: boolean;
}

export interface IQuery {
    productServiceGetProduct(input?: GetProductRequestInput): GetProductResponse | Promise<GetProductResponse>;
    productServicePing(): ServerStatus | Promise<ServerStatus>;
}

export interface GetProductResponse {
    productNull?: boolean;
    productValue?: ProductModel;
}

export interface ProductModel {
    productId?: number;
    name?: string;
    description?: string;
    price?: number;
    status?: ProductStatus;
    createdTime?: GoogleProtobufTimestamp;
}

export interface GoogleProtobufTimestamp {
    seconds?: BigInt;
    nanos?: number;
}

export interface ServerStatus {
    status?: string;
}

export interface IMutation {
    productServiceAddProduct(input?: AddProductRequestInput): ProductModel | Promise<ProductModel>;
    productServiceUpdateProducts(input?: UpdateProductRequestInput): ProductModel | Promise<ProductModel>;
    productServiceDeleteProduct(input?: DeleteProductRequestInput): DeleteProductResponse | Promise<DeleteProductResponse>;
    productServiceInsertBulkProduct(input?: ProductModelInput): InsertBulkProductResponse | Promise<InsertBulkProductResponse>;
    productServiceTest(input?: GoogleProtobufEmptyInput): GoogleProtobufEmpty | Promise<GoogleProtobufEmpty>;
}

export interface DeleteProductResponse {
    success?: boolean;
}

export interface InsertBulkProductResponse {
    success?: boolean;
    insertCount?: number;
}

export interface GoogleProtobufEmpty {
    _?: boolean;
}

export interface ISubscription {
    productServiceGetAllProducts(input?: GetAllProductsRequestInput): ProductModel | Promise<ProductModel>;
}

export type BigInt = any;
