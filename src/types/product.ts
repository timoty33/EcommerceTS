export type ProductResponse = {
  id: number;
  name: string;
  description: string | null;
  starsAverage: number;
  variants?: ProductVariantResponse[];
};

export type ProductRequest = {
  name: string;
  description: string | null;
  starsAverage: number;
};

export type ProductVariantResponse = {
  id: number;
  productId: number;
  price: string;
  isOnSale: boolean;
  salePrice: string | null;
  color: string;
  sizes: string[];
  tags: any | null;
  sku: string | null;
  storage?: ProductStorageResponse;
};

export type ProductVariantRequest = {
  productId: number;
  price: string;
  isOnSale: boolean;
  salePrice: string | null;
  color: string;
  sizes: string[];
  tags: any | null;
  sku: string | null;
};

export type ProductStorageResponse = {
  id: number;
  variantId: number;
  storage: number;
  sizesInStorage: string[] | null;
};

export type ProductStorageRequest = {
  variantId: number;
  storage: number;
  sizesInStorage: string[] | null;
};
