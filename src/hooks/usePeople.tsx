import { useQuery } from "@tanstack/react-query";
import { getPeople } from "../services/getPeople";

export function usePeople(){
    const {data} = useQuery({
        queryKey:["getPeople"],
        queryFn:getPeople
    })
    return data
}