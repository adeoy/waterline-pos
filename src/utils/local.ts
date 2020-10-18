import { pricesRules } from "../data";
import { IPriceRule, ISale } from "../interfaces";

export const sortDates = (a: ISale, b: ISale): number => {
  let comparison = 0;
  if (a.date > b.date) {
    comparison = 1;
  } else if (a.date < b.date) {
    comparison = -1;
  }
  return comparison * -1;
};

export const getGasChargeByUnits = (sale: ISale): number => {
  if (
    sale.product_name === "garrafon" ||
    sale.product_name === "medio_garrafon"
  ) {
    return sale.units * sale.route.gas_charge;
  } else {
    return 0.0;
  }
};

export const calculateComisionCost = (
  isComision: boolean,
  sale: ISale
): number => {
  if (isComision) {
    return (sale.product_price + sale.product_comision) * sale.units;
  } else {
    return sale.product_price * sale.units;
  }
};

export const getSalesComision = (sales: ISale[]): number =>
  sales.reduce((acc, item) => acc + item.product_comision * item.units, 0);

const evaluatePriceBasedInUnits = (
  units: number,
  isComision: boolean
): IPriceRule | null => {
  let rule: IPriceRule | null = null;

  pricesRules.forEach((r) => {
    if (isComision && r.valid(units)) {
      rule = r;
      return;
    }
  });
  return rule;
};

export const getApplyRule = (
  product_price: number,
  product_name: string,
  units: number,
  default_price: number,
  isComision: boolean
) => {
  let rule: IPriceRule | null = null;

  if (product_name === "garrafon") {
    rule = evaluatePriceBasedInUnits(units, isComision);
    product_price = default_price;
  }
  if (rule) {
    product_price = rule.price;
  }
  return { rule, product_price };
};
