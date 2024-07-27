export interface MarketingCampaigns {
  [key: string]: {
    pricingRule: string;
    discountPrice: number | null;
  };
}

export const marketingCampaigns: MarketingCampaigns = {
  ipd: {
    pricingRule: 'BULK-DISCOUNT-4',
    discountPrice: 499.99,
  },
  atv: {
    pricingRule: 'BUY-3-PAY-2',
    discountPrice: null,
  },
};
