import type { ParseConfig, UnparseConfig  } from 'papaparse'

export interface ICsvConverter {
	fromArrToCSV<T>(data: T[], config?: UnparseConfig ): string 
	fromCsvToArr<T>(data: string, config?: ParseConfig ): T[]
}

