import { Dictionary } from "vue-router/types/router";
import Router, { RouterPath } from "../router";

export type BaseRouteType = Dictionary<string>;

export interface IndexParams extends BaseRouteType {
    name: string
}
export interface AboutParams extends BaseRouteType {
    testName: string
}
export interface UserParams extends BaseRouteType {
    userId: string
}


export interface ParamMap {
    [RouterPath.Index]: IndexParams,
    [RouterPath.About]: AboutParams,
    [RouterPath.User]: UserParams,
}

export class RouterHelper {
    public static replace<T extends RouterPath>(routePath:T,params:ParamMap[T]){
        Router.replace({
            path:routePath,
            query:params
        })
    }
    public static push<T extends RouterPath>(routePath:T,params:ParamMap[T]){
        Router.push({
            path:routePath,
            query:params
        })
    }
}