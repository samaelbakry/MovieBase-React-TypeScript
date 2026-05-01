import { useState } from "react";

const Biography = ({ text }: { text: string }) => {
  const [expanded, setExpanded] = useState(false);
  const shortText = text?.slice(0, 300);

  return (
    <>
      <div className="max-w-2xl">
        <h2 className="text-xl font-semibold mb-3 text-white/90">Biography</h2>
        <p className="text-gray-300 leading-7 text-sm md:text-base bg-white/5 border border-white/10 rounded-xl p-5 backdrop-blur-sm">
          {expanded || text.length <= 300 ? text : `${shortText}...`}

          {text.length > 300 && (
          <>
            <button
              onClick={() => setExpanded((prev) => !prev)}
              className="mt-2 ml-2 text-amber-400 opacity-50 duration-500 transition-all text-sm hover:underline cursor-pointer hover:opacity-100 "
            >
              {expanded ? "Show less" : "Read more"}
            </button>
          </>
        )}
        </p>

        
      </div>
    </>
  );
};

export default Biography;
