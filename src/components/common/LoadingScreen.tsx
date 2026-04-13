import { Spinner } from "../ui/spinner"

const LoadingScreen = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center  text-white">
      <div className="flex flex-col items-center gap-4 animate-fade-in">
        <Spinner className="size-10 md:size-14 text-red-500" />
        <p className="text-sm md:text-base text-zinc-300 tracking-wide animate-pulse">
          Loading, please wait...
        </p>
      </div>
    </div>
  )
}

export default LoadingScreen