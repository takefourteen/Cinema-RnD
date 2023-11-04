import { AspectRatio } from '../ui/aspect-ratio'
import CardSkeleton from './CardSkeleton'

const DataFetchingMediaCardSkeleton = () => {
  return (
    <div
    className="relative h-auto min-w-[150px] sm:min-w-[170px] md:min-w-[180px] lg:min-w-[215px] xl:min-w-[250px] 2xl:min-w-[300px]"
  >
    <AspectRatio ratio={2 / 3}>
      <CardSkeleton rows={0} showOverlay={false} />
    </AspectRatio>
  </div>
  )
}

export default DataFetchingMediaCardSkeleton