import { usePeople } from "../../hooks/usePeople";
import type { AllPeopleI } from "../../interfaces/people";
import Actor from "../people/Actor";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

const People = () => {
  const allPeople = usePeople();

  if (!allPeople) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center text-gray-400">
        Loading actors...
      </div>
    );
  }

  return (
    <section className="bg-zinc-950 text-white py-14">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold border-l-4 border-amber-500 pl-3">
              Popular Actors
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              Most trending actors this week
            </p>
          </div>
        </div>
        <div className="relative">
          <Carousel opts={{ align: "start" }} className="w-full">

            <CarouselContent className="-ml-4">
              {allPeople.map((actorData: AllPeopleI) => (
                <CarouselItem
                  key={actorData.id}
                  className="pl-4 basis-[60%] sm:basis-1/3 md:basis-1/4 lg:basis-1/6"
                >
                  <Actor actorData={actorData} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2.5 bg-black/60 hover:bg-amber-500 text-white border-none" />
            <CarouselNext className="right-2.5 bg-black/60 hover:bg-amber-500 text-white border-none" />
          </Carousel>
        </div>

      </div>
    </section>
  );
};

export default People;
