import RecommendedMediaList from "../../recommendations/RecommendedMediaList";
import DetailsAboutShowSection from "../../DetailsAboutShowSection";

const TvExplorerPanel = ({ mediaId }: { mediaId: string }) => {
  return (
    <div className="master-container mx-auto mt-8 p-0 ">
      {/* <RecommendedMediaList mediaId={mediaId} mediaType={"tv"} /> */}
      <DetailsAboutShowSection mediaId={mediaId} mediaType={"tv"} />
    </div>
  );
};

export default TvExplorerPanel;
