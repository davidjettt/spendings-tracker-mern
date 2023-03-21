import { ISingleCategoryTotal } from "./ISingleCategoryTotal"

export interface ICategoryTotalsByMonth {
    categories: ISingleCategoryTotal[]
    month: string
    monthNum: number
    year: string
}
