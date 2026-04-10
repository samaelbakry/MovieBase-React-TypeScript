import { useQuery } from "@tanstack/react-query";
import { getSeries, getSeriesDetails, getSeriesSimilar, getSeriesTrailer } from "../services/getSeries";

export function useSeries(){
    const {data} = useQuery({
        queryKey:["getSeries"],
        queryFn:getSeries
    })
    return data
}
export function useSeriesDetails(id:string){
    const {data} = useQuery({
        queryKey:["getSeriesDetails" , id],
        queryFn:()=>getSeriesDetails(id)
    })
    return data
}
export function useSeriesTrailer(id:string){
    const {data} = useQuery({
        queryKey:["getSeriesTrailer" , id],
        queryFn:()=>getSeriesTrailer(id)
    })
    return data
}
export function useSimilarSeries(id:string){
    const {data} = useQuery({
        queryKey:["getSeriesSimilar" , id],
        queryFn:()=>getSeriesSimilar(id)
    })
    return data
}