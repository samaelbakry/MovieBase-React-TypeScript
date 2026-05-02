import { Star } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { SessionContext } from "../../context/SessionTokenContext";
import { rateMovie } from "../../services/ratingServices";
import { toast } from "sonner";

type Props = {
  id: string;
  mediaType: "movie" | "tv";
};

const Rating = ({ id, mediaType }: Props) => {
  const [hover, setHover] = useState(0);
  const [rating, setRating] = useState(0);

  const session = useContext(SessionContext);
  const sessionId = session?.sessionId;

  const storageKey = `rating_${mediaType}_${id}`

  useEffect(() => {
    const saved = localStorage.getItem(storageKey)
    if(saved){
        setRating(Number(saved))
    }
  }, [storageKey])
  

  const handleClick = async (value: number) => {
    if (!sessionId) return;
    setRating(value);
    localStorage.setItem(storageKey,value.toString())
    try {
       await rateMovie({
        content: mediaType,
        contentId: id,
        sessionId,
        ratingData: { value },
      });
      toast.success("Rating saved");
    } catch (error) {
      console.log(error);
      toast.dismiss("Failed");
    }
  };
  return (
    <div className="flex items-center justify-between gap-2 my-2">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => {
        const active = star <= (hover || rating);
        return (
          <span
            key={star}
            onClick={() => handleClick(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            className={`cursor-pointer transition ${
              active ? "text-yellow-500 scale-110" : "text-gray-500"
            }`}
          >
            <Star fill={active ? "currentColor" : "none"} />
          </span>
        );
      })}
      <span className="font-bold">{rating}/10</span>
    </div>
  );
};

export default Rating;
