export function getImagePathFromImagesData(
  path: "backdropPath" | "posterPath",
  images: ImagesData,
  imageIndex: number,
) {
  const imageArray =
    path === "backdropPath" ? images.backdrops : images.posters;
  const lastIndex = imageArray.length - 1;
  const filePath =
    imageArray[Math.max(imageIndex - 1, 0)]?.file_path ||
    imageArray[lastIndex]?.file_path;
  return filePath || ""; // Return an empty string if filePath is undefined or null
}
