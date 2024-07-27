import { catalogue, Product } from './business/catalogue.js';
import { PricingRule, pricingRules } from './libs/pricingRules.js';

export class Checkout {
  private cart: Product[] = [];
  private pricingRules: PricingRule[];

  constructor(pricingRules: PricingRule[]) {
    this.pricingRules = pricingRules;
  }

  scan(sku: string): void {
    this.cart.push(catalogue[sku]);
  }

  total(): number {
    let sum = this.cart.reduce((acc, item) => acc + item.price, 0);

    this.pricingRules.forEach((rule) => {
      sum -= rule.deduct(this.cart);
    });

    return sum;
  }

  clear(): void {
    this.cart = [];
  }
}

const co = new Checkout(pricingRules);

const input1 = ['atv', 'atv', 'atv', 'vga'];
// const input2 = ['atv', 'ipd', 'ipd', 'atv', 'ipd', 'ipd', 'ipd'];

const output = (inputs) => {
  inputs.map((item) => {
    co.scan(item);
  });
  console.log(`Input: ${inputs} | Total: $${co.total()}`);
  co.clear();
};

output(input1);
