export function getImagesPathFromImagesData(
                                      path: "backdropPath" | "posterPath", 
                                      images: ImagesData,
                                      imageIndex: number
                                    ) {
if (path === "backdropPath") {
  return imagesData.backdrops[2]?.file_path ||
    imagesData.backdrops[imagesData.backdrops.length - 1]?.file_path;
}

  return  imagesData.posters[2]?.file_path ||
    imagesData.posters[imagesData.posters.length - 1]?.file_path;
}
