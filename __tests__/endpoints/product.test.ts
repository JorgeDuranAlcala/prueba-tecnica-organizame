import supertest from "supertest";
import { ErrorHandler } from "../../src/api/http/middlewares/error-handler";
import { router } from "../../src/api/http/router";
import { ExpressApp } from "../../src/api/http/server";
import { HTTP_STATUS_CODE } from "../../src/constants/http";

describe("Product endpoints", () => {
  let request: supertest.SuperTest<supertest.Test>;
  let base_url: string;
  let categoriaId: string;
  let categoria: any;

  beforeAll(async () => {
    const app = ExpressApp.create(router, new ErrorHandler()).app;
    request = supertest(app);
    const api_version = app.get("api-version");
    base_url = `/api/v${api_version}`;

    const body = {
      nombre_corto: "A",
      descripcion: "desc product A",
      nombre_categoria: "A",
    };
    const res = await request.post(`${base_url}/categoria`).send(body);
    categoriaId = res.body.id;
    categoria = res.body.categoria;
  });

  describe("/POST /product", () => {
    test("should create a new product", async () => {
      const body = {
        nombre_producto: "product A",
        descripcion: "desc product A",
        precio: 44.44,
        categoria: categoriaId,
        sku: "TOM1",
      };
      const res = await request.post(`${base_url}/product`).send(body);
      expect(res.statusCode).toEqual(HTTP_STATUS_CODE.OK);
      expect(res.body.product).toBeDefined();
      expect(res.body.product.nombre_producto).toEqual(body.nombre_producto);
    });
    test("should not create a new product if the sku is already taken", async () => {
      const body = {
        nombre_producto: "product B",
        descripcion: "desc product B",
        precio: 44.2,
        categoria: categoriaId,
        sku: "TOM1",
      };
      const res = await request.post(`${base_url}/product`).send(body);
      expect(res.statusCode).toEqual(HTTP_STATUS_CODE.ALREADY_EXISTS);
      expect(res.text).toMatch(/already exists/i);
    });
    test("should not create a new product when bad json format", async () => {
      const body = {
        nombre_producto: "product B",
        descripcion: "desc product B",
        precio: "44.20",
        categoria: categoriaId,
        sku: "TON&",
      };
      const res = await request.post(`${base_url}/product`).send(body);
      expect(res.statusCode).toEqual(HTTP_STATUS_CODE.MALFORMED_DATA);
      expect(res.body.product).not.toBeDefined();
      expect(res.text).toMatch(/malformed/i);
    });
  });

  describe("/GET /product", () => {
    const ids: string[] = [];
    beforeEach(async () => {
      const bodies = [
        {
          nombre_producto: "product A",
          descripcion: "desc product A",
          precio: 44.44,
          sku: "TOM2",
          categoria: categoriaId,
        },
        {
          nombre_producto: "product B",
          descripcion: "desc product B",
          precio: 44.44,
          sku: "TOM3",
          categoria: categoriaId,
        },
        {
          nombre_producto: "product C",
          descripcion: "desc product C",
          precio: 44.44,
          sku: "TOM4",
          categoria: categoriaId,
        },
      ];
      Promise.all(
        bodies.map(async (body) => {
          const res = await request.post(`${base_url}/product`).send(body);
          return res.body.id;
        })
      )
        .then((products: string[]) => {
          ids.push(...products);
        })
        .catch(console.error);
    });

    afterEach(async () => {
      Promise.all(
        ids.map(async (id) => {
          return await request.delete(`${base_url}/product/${id}`);
        })
      );
    });

    test("should return a list of productos", async () => {
      const res = await request.get(`${base_url}/product`);
      expect(res.statusCode).toEqual(HTTP_STATUS_CODE.OK);
      expect(res.body.products).toBeDefined();
      expect(res.body.products.length).toBeGreaterThan(0);
    });
  });

  describe("GET, PUT, DELETE", () => {
    let productId: string;
    let product: any;

    beforeEach(async () => {
      const body = {
        nombre_producto: "product A",
        descripcion: "desc product A",
        precio: 44.44,
        sku: "LEC1",
        categoria: categoriaId,
      };
      const res = await request.post(`${base_url}/product`).send(body);
      productId = res.body.id;
      product = res.body.product;
    });

    afterEach(async () => {
      await request.delete(`${base_url}/product/${productId}`);
    });

    describe("/GET /product/:id", () => {
      test("should return a product by its id", async () => {
        const res = await request.get(`${base_url}/product/${productId}`);
        expect(res.statusCode).toEqual(HTTP_STATUS_CODE.OK);
        expect(res.body.id).toBeDefined();
      });
      test("should return Error if a product does not exist", async () => {
        const wrongId = "43";
        const res = await request.get(`${base_url}/product/${wrongId}`);
        expect(res.statusCode).toEqual(HTTP_STATUS_CODE.NOT_FOUND);
        expect(res.body.id).not.toBeDefined();
        expect(res.text).toMatch(/could not be found/i);
      });
    });

    describe("/GET /productSearch?q='pro' ", () => {
      test("should return a product by its id", async () => {
        const query = "a";
        const res = await request
          .get(`${base_url}/productSearch`)
          .query({ q: query });
        expect(res.statusCode).toEqual(HTTP_STATUS_CODE.OK);
        expect(res.body.products).toBeDefined();
        expect(res.body.products.length).toBeGreaterThan(0);
      });
      test("should return an empty array where there is no matches", async () => {
        const query = "jk";
        const res = await request
          .get(`${base_url}/productSearch`)
          .query({ q: query });
        expect(res.statusCode).toEqual(HTTP_STATUS_CODE.OK);
        expect(res.body.products).toBeDefined();
        expect(res.body.products.length).toEqual(0);
      });
    });

    describe("/PUT /product/:id", () => {
      test("should update a product", async () => {
        const body = {
          nombre_producto: "product B",
        };
        const res = await request
          .put(`${base_url}/product/${productId}`)
          .send(body);
        expect(res.statusCode).toEqual(HTTP_STATUS_CODE.OK);
        expect(res.body.id).toBeDefined();
      });
      test("should return an error if a product does not exist", async () => {
        const body = {
          nombre_producto: "product B",
        };
        const wrongId = "43";
        const res = await request
          .put(`${base_url}/product/${wrongId}`)
          .send(body);
        expect(res.statusCode).toEqual(HTTP_STATUS_CODE.NOT_FOUND);
        expect(res.text).toMatch(/could not be found/i);
      });
    });

    describe("/DELETE /product/:id", () => {
      test("should delete a product by its id", async () => {
        const res = await request.delete(`${base_url}/product/${productId}`);
        expect(res.statusCode).toEqual(HTTP_STATUS_CODE.OK);
        expect(res.body.id).toBeDefined();
      });

      test("should return Error if a product does not exist", async () => {
        const wrongId = "43";
        const res = await request.delete(`${base_url}/product/${wrongId}`);
        expect(res.statusCode).toEqual(HTTP_STATUS_CODE.NOT_FOUND);
        expect(res.body.id).not.toBeDefined();
      });
    });

    describe("/GET /productExport", () => {
      test("should return a .csv file with the products data", async () => {
        const res = await request.get(`${base_url}/productExport`);
        expect(res.text).toContain("nombre_producto");
        expect(res.text).toContain("sku");
        expect(res.text).toContain("descripcion_producto");
        expect(res.text).toContain("precio");
        expect(res.text).toContain("nombre_corto_categoria");
        expect(res.text).toContain("descripcion_categoria");
        expect(res.text).toContain("nombre_categoria");
        expect(res.statusCode).toEqual(HTTP_STATUS_CODE.OK);
      });
    });
  });
});
