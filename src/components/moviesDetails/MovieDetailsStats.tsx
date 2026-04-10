const MovieDetailsStats = ({ movie }: { movie: any }) => {
  const stats = [
    ["Release Date", movie?.release_date],
    ["Runtime", `${movie?.runtime} min`],
    ["Budget", `$${movie?.budget?.toLocaleString()}`],
    ["Revenue", `$${movie?.revenue?.toLocaleString()}`],
    ["Rating", `${movie?.vote_average?.toFixed(1)}/10`],
  ];
  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-5">
        {stats.map(([label, value]) => (
          <div
            key={label}
            className="bg-zinc-900/70 backdrop-blur-md border border-zinc-800 rounded-2xl p-6 hover:border-red-500/50 transition-all duration-300 shadow-lg"
          >
            <p className="text-zinc-400 text-sm mb-2">{label}</p>
            <h3 className="text-lg font-bold">{value}</h3>
          </div>
        ))}
      </div>
    </>
  );
};

export default MovieDetailsStats;
