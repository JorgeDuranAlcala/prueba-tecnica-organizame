import supertest from "supertest";
import { ErrorHandler } from "../../src/api/http/middlewares/error-handler";
import { router } from "../../src/api/http/router";
import { ExpressApp } from "../../src/api/http/server";
import { HTTP_STATUS_CODE } from "../../src/constants/http";

describe("Categoria endpoints", () => {
  let request: supertest.SuperTest<supertest.Test>;
  let base_url: string;
  let categoriaId: any;

  beforeEach(async () => {
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
  });

  afterEach(async () => {
    await request.delete(`${base_url}/categoria/${categoriaId}`);
  });

  describe("/POST /categoria", () => {
    test("should not allowed to store a categoria if nombre_corto is already taken", async () => {
      const body = {
        nombre_corto: "A",
        descripcion: "desc product A",
        nombre_categoria: "A",
      };
      const res = await request.post(`${base_url}/categoria`).send(body);
      expect(res.statusCode).toEqual(HTTP_STATUS_CODE.ALREADY_EXISTS);
      expect(res.body.id).not.toBeDefined();
    });
    test("should create a new categoria", async () => {
      const body = {
        nombre_corto: "CC",
        descripcion: "desc product CC",
        nombre_categoria: "CCC",
      };
      const res = await request.post(`${base_url}/categoria`).send(body);
      expect(res.statusCode).toEqual(HTTP_STATUS_CODE.OK);
      expect(res.body.id).toBeDefined();
    });
  });

  describe("/GET /categoria", () => {
    test("should return all categorias", async () => {
      const res = await request.get(`${base_url}/categoria`);
      expect(res.statusCode).toEqual(HTTP_STATUS_CODE.OK);
      expect(res.body).toBeDefined();
    });
  });

  describe("/GET /searchCategoria", () => {
    test("should search a product by name based on query", async () => {
      const query = "c";
      const res = await request
        .get(`${base_url}/searchCategoria`)
        .query({ q: query });
      expect(res.statusCode).toEqual(HTTP_STATUS_CODE.OK);
      expect(res.body.categorias.length).toBeGreaterThan(0);
    });
    test("should return an empty array if there are no matches", async () => {
      const query = "%";
      const res = await request
        .get(`${base_url}/searchCategoria`)
        .query({ q: query });
      expect(res.statusCode).toEqual(HTTP_STATUS_CODE.OK);
      expect(res.body.categorias.length).toEqual(0);
    });
  });

  describe("/PUT /categoria/:id", () => {
    test("should update a categoria", async () => {
      const body = {
        nombre_categoria: "B",
      };
      const res = await request
        .put(`${base_url}/categoria/${categoriaId}`)
        .send(body);
      expect(res.statusCode).toEqual(HTTP_STATUS_CODE.OK);
      expect(res.body.id).toBeDefined();
    });

    test("should return an error when bad json format", async () => {
      const body = {
        nombre_cate: "Categoria Z",
      };
      const res = await request
        .put(`${base_url}/categoria/${categoriaId}`)
        .send(body);
      expect(res.statusCode).toEqual(HTTP_STATUS_CODE.MALFORMED_DATA);
      expect(res.text).toMatch(/malformed/i);
    });

    test("should return an error if a product does not exist", async () => {
      const body = {
        nombre_categoria: "B",
      };
      const wrongId = "43";
      const res = await request
        .put(`${base_url}/categoria/${wrongId}`)
        .send(body);
      expect(res.statusCode).toEqual(HTTP_STATUS_CODE.NOT_FOUND);
      expect(res.text).toMatch(/could not be found/i);
    });
  });

  describe("/DELETE /product/:id", () => {
    test("should delete a product by its id", async () => {
      const res = await request.delete(`${base_url}/categoria/${categoriaId}`);
      expect(res.statusCode).toEqual(HTTP_STATUS_CODE.OK);
      expect(res.body.id).toBeDefined();
    });

    test("should return Error if a product does not exist", async () => {
      const wrongId = "43";
      const res = await request.delete(`${base_url}/categoria/${wrongId}`);
      expect(res.statusCode).toEqual(HTTP_STATUS_CODE.NOT_FOUND);
      expect(res.body.id).not.toBeDefined();
    });
  });
});
