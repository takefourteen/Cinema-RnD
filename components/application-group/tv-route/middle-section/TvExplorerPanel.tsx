import RecommendedMediaList from "../../recommendations/RecommendedMediaList";
import DetailsAboutShowSection from "../../DetailsAboutShowSection";
import SeasonsAndEpisodes from "./seasons-and-episodes/SeasonsAndEpisodes";

const TvExplorerPanel = ({ mediaId }: { mediaId: string }) => {
  return (
    <div className="master-container mx-auto mt-8 p-0 ">
      {/* <RecommendedMediaList mediaId={mediaId} mediaType={"tv"} /> */}
      {/* <DetailsAboutShowSection mediaId={mediaId} mediaType={"tv"} /> */}
      <SeasonsAndEpisodes tvSeriesId={mediaId} />
    </div>
  );
};

export default TvExplorerPanel;
