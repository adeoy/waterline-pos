import { pricesRules } from "../data";
import {
  IOffer,
  IPriceRule,
  ISale,
  IOfferAxB,
  IOfferXFree,
} from "../interfaces";

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
  const offer = sale.offer;
  if (isComision) {
    if (offer) {
      if (offer.type === "axb") {
        return (
          (sale.product_price + sale.product_comision) * sale.units -
          (sale.offerDiscount / sale.product_price) * sale.product_comision
        );
      } else if (offer.type === "xfree" && sale.units > 0) {
        const data = offer.data as IOfferXFree;
        return (
          (sale.product_price + sale.product_comision) * sale.units -
          sale.product_comision * data.units
        );
      } else {
        return (sale.product_price + sale.product_comision) * sale.units;
      }
    } else {
      return (sale.product_price + sale.product_comision) * sale.units;
    }
  } else {
    return sale.product_price * sale.units;
  }
};

export const calculateBusinessDiscount = (
  businessDiscount: number,
  sale: ISale
): number => {
  const offer = sale.offer;
  if (businessDiscount > 0) {
    if (offer) {
      if (offer.type === "axb") {
        return (
          businessDiscount * sale.units -
          (sale.offerDiscount / sale.product_price) * businessDiscount
        );
      } else if (offer.type === "xfree" && sale.units > 0) {
        const data = offer.data as IOfferXFree;
        return (
          businessDiscount * sale.units -
          businessDiscount * data.units
        );
      } else {
        return businessDiscount * sale.units;
      }
    } else {
      return businessDiscount * sale.units;
    }
  } else {
    return 0.0;
  }
};

export const getSalesComision = (sales: ISale[]): number =>
  sales.reduce(
    (acc, item) =>
      acc +
      item.product_comision * item.units -
      (item.offerDiscount / item.product_price) * item.product_comision,
    0
  );

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
    product_price = default_price - rule.price;
  }
  return { rule, product_price };
};

export const getOfferText = (offer: IOffer): string => {
  let text = "";
  if (offer.type === "axb") {
    const data = offer.data as IOfferAxB;
    text = `${data.get} x ${data.pay} ${offer.name}`;
  } else {
    const data = offer.data as IOfferXFree;
    text = `${data.units} gratis cada ${offer.name}`;
  }
  return text;
};

export const applyOffer = (
  units: number,
  offer: IOffer | null,
  product_price: number
): number => {
  if (offer) {
    if (offer.type === "axb") {
      const data = offer.data as IOfferAxB;
      const { get, pay } = data;
      const gift = get - pay;
      const discount = Math.floor(units / get) * gift * product_price;
      return discount >= 0.0 ? discount : 0.0;
    } else if (offer.type === "xfree" && units > 0) {
      const data = offer.data as IOfferXFree;
      const discount = data.units * product_price;
      return discount >= 0.0 ? discount : 0.0;
    } else {
      return 0.0;
    }
  } else {
    return 0.0;
  }
};
