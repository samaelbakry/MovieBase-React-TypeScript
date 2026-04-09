import { usePeople } from "../../hooks/usePeople";
import type { AllPeopleI } from "../../interfaces/people";
import Actor from "../Actor";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

const People = () => {
  const allPeople = usePeople();
  console.log(allPeople);

  return (
    <>
      <section className="max-w-7xl mx-auto my-8 px-4">
        <h2 className="text-xl font-bold capitalize mb-5 mx-2 underline underline-offset-8 decoration-amber-500">
          popular actors
        </h2>
        <Carousel opts={{ align: "start" }}>
          <CarouselContent>
            {allPeople?.map((actorData: AllPeopleI) => (
              <CarouselItem
                key={actorData.id}
                className="basis-1/2 md:basis-1/4 lg:basis-1/6"
              >
                <Actor actorData={actorData} />
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>
    </>
  );
};

export default People;
