import { useFetch } from "../../hooks/useFetch";
import type { AllPeopleI } from "../../interfaces/people";
import { getPeople } from "../../services/getPeople";
import LoadingScreen from "../common/LoadingScreen";
import Actor from "../people/Actor";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

const People = () => {
  const { data: allPeople, isLoading } = useFetch({
    queryKey: ["getPeople"],
    queryFn: getPeople,
  });

  if (isLoading || !allPeople) return <LoadingScreen />;

  return (
    <section className="relative bg-black text-white py-20 overflow-hidden">
    <div className="relative max-w-7xl mx-auto px-4 md:px-6 space-y-10">
        <div className="flex items-end justify-between">
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-bold border-l-4 border-amber-500 pl-4">
              ⭐ Popular Actors
            </h2>

            <p className="text-sm text-gray-400">
              Trending performers this week
            </p>
          </div>

          <span className="hidden md:block text-xs text-gray-500">
            Updated weekly
          </span>
        </div>

        <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md p-4 md:p-6 shadow-lg">
          <Carousel opts={{ align: "start" }} className="w-full">
            <CarouselContent className="-ml-4">
              {allPeople.map((actorData: AllPeopleI) => (
                <CarouselItem
                  key={actorData.id}
                  className="
                    p-4
                    basis-[55%]
                    sm:basis-1/3
                    md:basis-1/5
                    lg:basis-1/6
                  "
                >
                  <div className="group transition-transform duration-300 hover:scale-105">
                    <div className="rounded-full p-1 group-hover:bg-amber-500/20 transition">
                      <Actor actorData={actorData} />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious
              className="
              left-2
              bg-black/60 hover:bg-amber-500
              text-white border-none
              transition
            "
            />

            <CarouselNext
              className="
              right-2
              bg-black/60 hover:bg-amber-500
              text-white border-none
              transition
            "
            />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default People;
