export interface Catalogue {
  [key: string]: Product;
}

export interface Product {
  sku: string;
  name: string;
  price: number;
}

export const catalogue: Catalogue = {
  ipd: {
    sku: 'ipd',
    name: 'Super iPad',
    price: 549.99,
  },
  mbp: {
    sku: 'mbp',
    name: 'MacBook Pro',
    price: 1399.99,
  },
  atv: {
    sku: 'atv',
    name: 'Apple TV',
    price: 109.5,
  },
  vga: {
    sku: 'vga',
    name: 'VGA adapter',
    price: 30.0,
  },
};
