import { Billboard } from "./billboard";
import { Dates } from "./dates";

export interface MovieObject {
    dates: Dates;
    page: number;
    results: Billboard[];
    total_pages: number;
    total_results: number;
}
