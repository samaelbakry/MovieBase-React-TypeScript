import { useQuery } from "@tanstack/react-query";
import { getAllMovies, getMovieDetails,  getMovieTrailer,  getSimilarMovie,  getTopRatedMovies, getTrendingMovies, getUpComingMovies } from "../services/getMovies";
import { getAllTrending } from "../services/getAllTrending";

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
export function useAllTrending(){
    const {data} = useQuery({
        queryKey:["getAllTrending"],
        queryFn:getAllTrending
    })
    return data
}
export function useUpComingMovies(){
    const {data} = useQuery({
        queryKey:["getUpComing"],
        queryFn:getUpComingMovies
    })
    return data
}
