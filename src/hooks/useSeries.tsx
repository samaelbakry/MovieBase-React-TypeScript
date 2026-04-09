import { useQuery } from "@tanstack/react-query";
import { getSeries } from "../services/getSeries";

export function useSeries(){
    const {data} = useQuery({
        queryKey:["getSeries"],
        queryFn:getSeries
    })
    return data
}