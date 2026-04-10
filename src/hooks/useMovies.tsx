import { useQuery } from "@tanstack/react-query";
import { getAllMovies, getMovieDetails,  getMovieTrailer,  getSimilarMovie,  getTopRatedMovies, getTrendingMovies } from "../services/getMovies";

export function useAllMovies(){
    const {data} = useQuery({
        queryKey:["getAllMovies"],
        queryFn:getAllMovies
    })
    return data
}
export function useTrendingMovies(){
    const {data} = useQuery({
        queryKey:["getTrendingMovies"],
        queryFn:getTrendingMovies
    })
    return data
}
export function useTopRatedMovies(){
    const {data} = useQuery({
        queryKey:["getTopRated"],
        queryFn:getTopRatedMovies
    })
    return data
}

export function useMovieDetails(id:string){
    const {data} = useQuery({
        queryKey:["getMovieDetails" , id],
        queryFn:()=>getMovieDetails(id)
    })
    return data
}
export function useMovieTrailer(id:string){
    const {data} = useQuery({
        queryKey:["getMovieTrailer" , id],
        queryFn:()=>getMovieTrailer(id)
    })
    return data
}
export function useSimilarMovie(id:string){
    const {data} = useQuery({
        queryKey:["getSimilarMovie" , id],
        queryFn:()=>getSimilarMovie(id)
    })
    return data
}
