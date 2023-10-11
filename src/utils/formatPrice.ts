const formatPrice = (price: string|number, currency?: string): string => {
  const formatter = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: currency || "GBR",
    currencyDisplay: "narrowSymbol",
    minimumFractionDigits: 2,
  });

  return formatter.format(Number(price));
};

export { formatPrice };
