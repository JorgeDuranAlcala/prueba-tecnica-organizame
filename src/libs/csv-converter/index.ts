import { ICsvConverter  } from "./ICsvConverter"
import Papa from 'papaparse'

export class CsvConverter implements ICsvConverter {

	static create() {
		return new CsvConverter()
	}

	fromArrToCSV<T>(arr: T[], config?: Papa.UnparseConfig) {
		return Papa.unparse(arr, config)
	}

	fromCsvToArr<T>(data: string, config?: Papa.ParseConfig) {
     return Papa.parse(data, {header: true, ...config}).data as T[]
	}

}
