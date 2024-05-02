export function formatCurrency(priceCents) {
  //Helps round the number before giving 2 decimal places
 return (Math.round(priceCents) / 100).toFixed(2)
}