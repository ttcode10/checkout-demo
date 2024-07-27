import { pricingRules, PricingRule } from '../pricingRules.js'; // adjust the path as needed
import { catalogue, Product } from '../../business/catalogue.js';
import { marketingCampaigns } from '../../business/marketingCampaigns.js';

describe('Pricing Rules', () => {
  const atvProduct: Product = { sku: 'atv', name: 'Apple TV', price: 100 };
  const ipdProduct: Product = { sku: 'ipd', name: 'iPad', price: 200 };

  beforeAll(() => {
    catalogue['atv'] = atvProduct;
    catalogue['ipd'] = ipdProduct;
    marketingCampaigns['ipd'] = {
      pricingRule: 'RANDOM-RULE-NAME',
      discountPrice: 180,
    };
  });

  describe('Buy 3 pay 2 (atv)', () => {
    const rule: PricingRule = pricingRules.find((rule) => rule.sku === 'atv');

    it('should apply buy 3 pay 2 discount', () => {
      const cartItems: Product[] = [
        { sku: 'atv', name: 'Apple TV', price: 100 },
        { sku: 'atv', name: 'Apple TV', price: 100 },
        { sku: 'atv', name: 'Apple TV', price: 100 },
      ];
      const discount = rule.deduct(cartItems);
      expect(discount).toBe(100);
    });

    it('should not apply discount for less than 3 items', () => {
      const cartItems: Product[] = [
        { sku: 'atv', name: 'Apple TV', price: 100 },
        { sku: 'atv', name: 'Apple TV', price: 100 },
      ];
      const discount = rule.deduct(cartItems);
      expect(discount).toBe(0);
    });

    it('should apply correct discount for more than 3 items', () => {
      const cartItems: Product[] = [
        { sku: 'atv', name: 'Apple TV', price: 100 },
        { sku: 'atv', name: 'Apple TV', price: 100 },
        { sku: 'atv', name: 'Apple TV', price: 100 },
        { sku: 'atv', name: 'Apple TV', price: 100 },
      ];
      const discount = rule.deduct(cartItems);
      expect(discount).toBe(100);
    });
  });

  describe('Bulk discount (ipd)', () => {
    const rule: PricingRule = pricingRules.find((rule) => rule.sku === 'ipd');

    it('should apply bulk discount for more than 4 items', () => {
      const cartItems: Product[] = [
        { sku: 'ipd', name: 'iPad', price: 200 },
        { sku: 'ipd', name: 'iPad', price: 200 },
        { sku: 'ipd', name: 'iPad', price: 200 },
        { sku: 'ipd', name: 'iPad', price: 200 },
        { sku: 'ipd', name: 'iPad', price: 200 },
      ];
      const discount = rule.deduct(cartItems);
      expect(discount).toBe(100); // 200 - 180 = 20 discount per item, 5 items = 100 total discount
    });

    it('should not apply discount for 4 or less items', () => {
      const cartItems: Product[] = [
        { sku: 'ipd', name: 'iPad', price: 200 },
        { sku: 'ipd', name: 'iPad', price: 200 },
        { sku: 'ipd', name: 'iPad', price: 200 },
        { sku: 'ipd', name: 'iPad', price: 200 },
      ];
      const discount = rule.deduct(cartItems);
      expect(discount).toBe(0);
    });
  });
});
