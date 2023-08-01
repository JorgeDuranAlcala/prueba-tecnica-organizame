import { CsvConverter } from ".";
import { ICsvConverter } from "./ICsvConverter";

describe("Convert an array of objects into a csv string", () => {
  let csvConverter: ICsvConverter;
  let data: Record<string, any>[];

  beforeEach(() => {
    csvConverter = new CsvConverter();

    data = [
      {
        nombre_producto: "product A",
        descripcion_producto: "desc product A",
        precio: 44.44,
        nombre_categoria: "Categoria A",
        descripcion_categoria: "Desc categoria A",
        nombre_corto_categoria: "FGD",
        sku: "GRAL",
      },
      {
        nombre_producto: "product B",
        descripcion_producto: "desc product B",
        precio: 53.11,
        nombre_categoria: "Categoria A",
        descripcion_categoria: "Desc categoria A",
        nombre_corto_categoria: "FGD",
        sku: "REL2",
      },
      {
        nombre_producto: "product C",
        descripcion_producto: "desc product C",
        precio: 35.22,
        nombre_categoria: "Categoria A",
        descripcion_categoria: "Desc categoria A",
        nombre_corto_categoria: "FGD",
        sku: "CAL4",
      },
    ];
  });

  test("should convert an array of n object to csv", () => {
    const result: string = csvConverter.fromArrToCSV(data);
    expect(result.length).toBeGreaterThan(0);
    data.forEach((d) => {
      expect(result).toContain(d.nombre_producto);
      expect(result).toContain(d.nombre_categoria);
      expect(result).toContain(d.nombre_corto_categoria);
      expect(result).toContain(d.descripcion_producto);
      expect(result).toContain(d.descripcion_categoria);
      expect(result).toContain(String(d.precio));
      expect(result).toContain(d.sku);
    });
  });

  test("should convert an csv string to an array of n objects", () => {
    const csv: string = csvConverter.fromArrToCSV(data);
    const result: any[] = csvConverter.fromCsvToArr(csv);
    expect(result.length).toBeGreaterThan(0);
    data.forEach((d, i) => {
      expect(result[i].nombre_producto).toContain(d.nombre_producto);
      expect(result[i].nombre_categoria).toContain(d.nombre_categoria);
      expect(result[i].nombre_corto_categoria).toContain(
        d.nombre_corto_categoria
      );
      expect(result[i].descripcion_producto).toContain(d.descripcion_producto);
      expect(result[i].descripcion_categoria).toContain(
        d.descripcion_categoria
      );
      expect(result[i].precio).toContain(String(d.precio));
      expect(result[i].sku).toContain(d.sku);
    });
  });
});
