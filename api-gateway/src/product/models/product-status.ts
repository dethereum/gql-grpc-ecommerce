import { registerEnumType } from '@nestjs/graphql';

export enum ProductStatus {
  PRODUCT_STATUS_UNSPECIFIED,
  PRODUCT_STATUS_INSTOCK,
  PRODUCT_STATUS_LOW,
  PRODUCT_STATUS_NONE,
}

// eslint-disable-next-line functional/no-expression-statement
registerEnumType(ProductStatus, {
  name: 'ProductStatus',
});
