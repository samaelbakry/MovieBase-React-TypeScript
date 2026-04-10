import type { AllPeopleI } from "../interfaces/people";

const Actor = ({ actorData }: { actorData: AllPeopleI }) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-zinc-900 shadow-lg cursor-pointer">
      <img
        src={`https://image.tmdb.org/t/p/w500${actorData.profile_path}`}
        alt={actorData.name}
        className="w-full h-64 object-cover transition duration-500 group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="text-white font-semibold text-base truncate">
          {actorData.name}
        </h3>

        <p className="text-zinc-300 text-sm truncate">
          {actorData.known_for_department}
        </p>

        <span className="inline-block mt-2 px-2 py-1 text-xs rounded-full bg-yellow-500/20 text-yellow-300">
          ★ {actorData.popularity.toFixed(1)}
        </span>
      </div>
    </div>
  );
};

export default Actor;