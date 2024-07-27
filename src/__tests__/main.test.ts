import { Checkout } from '../main.js'; // Adjust the import path as needed
import { catalogue, Product } from '../business/catalogue.js';
import { pricingRules } from '../libs/pricingRules.js';
import { marketingCampaigns } from '../business/marketingCampaigns.js';

describe('Checkout', () => {
  const atvProduct: Product = { sku: 'atv', name: 'Apple TV', price: 100 };
  const vgaProduct: Product = { sku: 'vga', name: 'VGA Adapter', price: 30 };
  const ipdProduct: Product = { sku: 'ipd', name: 'iPad', price: 200 };

  beforeAll(() => {
    catalogue['atv'] = atvProduct;
    catalogue['vga'] = vgaProduct;
    catalogue['ipd'] = ipdProduct;

    marketingCampaigns['ipd'] = {
      pricingRule: 'BULK-DISCOUNT-4',
      discountPrice: 180,
    };
    marketingCampaigns['atv'] = {
      pricingRule: 'BUY-3-PAY-2',
      discountPrice: null,
    };
  });

  let co: Checkout;

  beforeEach(() => {
    co = new Checkout(pricingRules);
  });

  it('should apply Buy 3 pay 2 rule for Apple TVs', () => {
    const input1 = ['atv', 'atv', 'atv', 'vga'];
    input1.forEach((sku) => co.scan(sku));
    const total = co.total();
    expect(total).toBe(230); // 100 + 100 + 0 (discount applied) + 30 = 230
  });

  it('should apply bulk discount for iPads', () => {
    const input2 = ['atv', 'ipd', 'ipd', 'atv', 'ipd', 'ipd', 'ipd'];
    input2.forEach((sku) => co.scan(sku));
    const total = co.total();
    expect(total).toBe(1100); // 100 + 180 + 180 + 100 + 180 + 180 + 180 = 1100
  });

  it('should clear the cart correctly', () => {
    const input1 = ['atv', 'atv', 'atv', 'vga'];
    input1.forEach((sku) => co.scan(sku));
    co.clear();
    expect(co.total()).toBe(0);
  });
});
