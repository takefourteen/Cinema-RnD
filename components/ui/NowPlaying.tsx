import Equalizer from './equalizer/Equalizer'

const NowPlaying = () => {
  return (
    <div className="absolute inset-0 z-10 flex w-full items-center justify-center bg-black/80">
    <p className="font-small-text text-center uppercase  text-white">
      Now Playing
    </p>

    <Equalizer />
  </div>
  )
}

export default NowPlaying