import RecommendedMediaList from "../../recommendations/RecommendedMediaList";

const MediaExplorerPanel = ({ mediaId }: { mediaId: string }) => {
  return (
    <div className="master-container mx-auto mt-8 p-0 ">
      <RecommendedMediaList mediaId={mediaId} mediaType={"tv"} />
    </div>
  );
};

export default MediaExplorerPanel;
