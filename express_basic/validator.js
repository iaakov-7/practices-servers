export function validateProduct(name, price) {
  const errors = [];
  if (!name || typeof name !== "string" || name.length < 2) {
    errors.push(
      "name is required and must be string and at least 2 chracters ",
    );
  }
  if (!price || typeof price !== "number" || price < 0) {
    errors.push("price is required and must be a positive nameber");
  }
  return {
    isValid: errors.length === 0,
    errors,
  };
}
