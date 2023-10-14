export const slugify = (text: string): string => {
  const cleanedText = text
    .toLowerCase() // Convert to lowercase
    .replace(/[^\w\s-]/g, "") // Remove non-word characters except spaces and hyphens
    .replace(/[\s_-]+/g, "-") // Replace spaces and underscores/hyphens with a single hyphen
    .replace(/^\s+|\s+$/g, ""); // Remove leading/trailing spaces

  return encodeURIComponent(cleanedText); // URL encode the final slug
};
