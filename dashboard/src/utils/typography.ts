const TypographyUtils = {
  capitalize: (str: string) => {
    if (!str || str.length === 0) return null;
    return str
      .split(" ") // Split the string into an array of words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize first letter of each word
      .join(" "); // Join the words back into a single string;
  },
  formatRupiah: (value: number, fractionDigit?: number) => {
    return `Rp ${value.toLocaleString("id-ID", {
      minimumFractionDigits: fractionDigit ?? 0,
      maximumFractionDigits: fractionDigit ?? 2,
    })}`;
  },
} as const;

export default TypographyUtils;
