import { BASE_URI } from "./constatnts";
import wretch from "wretch"

export const fetchBackend = wretch(BASE_URI).errorType("json").options({
    credentials:"include"
})

