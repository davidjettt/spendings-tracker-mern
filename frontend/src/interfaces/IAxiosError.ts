export interface IAxiosError {
    response: {
        data: {
            errors: string[]
        },
        status: number
    }
}
