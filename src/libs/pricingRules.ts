import { catalogue, Product } from '../business/catalogue.js';
import { marketingCampaigns } from '../business/marketingCampaigns.js';

export interface PricingRule {
  sku: string;
  code: string;
  description: string;
  deduct: (cartItems: Product[]) => number;
}

export const pricingRules: PricingRule[] = [
  {
    sku: 'atv',
    code: 'BUY-3-PAY-2',
    description: 'Buy 3 pay 2',
    deduct: function (cartItems): number {
      const discountItems = cartItems.filter((item) => item.sku === this.sku);
      const discountQuantity = Math.floor(discountItems.length / 3);
      return catalogue[this.sku].price * discountQuantity;
    },
  },
  {
    sku: 'ipd',
    code: 'BULK-DISCOUNT-4',
    description: 'Enjoy discount price when buying more than 4',
    deduct: function (cartItems): number {
      const discountItems = cartItems.filter((item) => item.sku === this.sku);
      const quantity = discountItems.length;
      const isApplyDiscount = quantity > 4;
      return isApplyDiscount
        ? (catalogue[this.sku].price -
            marketingCampaigns[this.sku].discountPrice) *
            quantity
        : 0;
    },
  },
];
