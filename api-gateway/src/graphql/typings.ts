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

export interface IQuery {
    productServiceGetProduct(productId?: number): GetProductResponse | Promise<GetProductResponse>;
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
    status: ProductStatus;
    createdTime?: GoogleProtobufTimestamp;
}

export interface GoogleProtobufTimestamp {
    seconds?: BigInt;
    nanos?: number;
}

export type BigInt = any;
