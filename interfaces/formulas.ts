interface IFormulas {
    references: string[]

    calculate(values: number[])
    reportError(error: ErrorType)
}