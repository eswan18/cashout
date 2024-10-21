export function asCurrency(amount: number, showPlus: boolean = false): string {
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
  if (!showPlus) return formatted;
  return formatted.startsWith("-") ? formatted : `+${formatted}`;
}