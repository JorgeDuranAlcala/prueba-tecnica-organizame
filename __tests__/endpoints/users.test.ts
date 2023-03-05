import supertest from "supertest";
import { ErrorHandler } from "../../src/api/http/middlewares/error-handler";
import { router } from "../../src/api/http/router";
import { ExpressApp } from "../../src/api/http/server";
import { HTTP_STATUS_CODE } from "../../src/constants/http";

describe("users endpoints", () => {
  let request: supertest.SuperTest<supertest.Test>;
  let base_url: string;

  beforeAll(async () => {
    const app = ExpressApp.create(router, new ErrorHandler()).app;
    request = supertest(app);
    const api_version = app.get("api-version");
    base_url = `/api/v${api_version}`;
  });

  describe("/POST /login", () => {
		test("should login an user", async () => {
			const body = {
        user: "user",
				password: "1234"
			}
		
			const res = await request.post(`${base_url}/auth/login`).send(body);
			expect(res.statusCode).toEqual(HTTP_STATUS_CODE.OK)
			expect(res.body).toBeDefined()
			expect(res.body.user.user).toEqual(body.user)
			expect(res.body.user.role).toEqual("user")
			expect(res.body.user.role).not.toEqual("admin")
		})

		test("should login an admin", async () => {
			const body = {
        user: "admin",
				password: "4321"
			}
			const res = await request.post(`${base_url}/auth/login`).send(body);
			expect(res.statusCode).toEqual(HTTP_STATUS_CODE.OK)
			expect(res.body).toBeDefined()
			expect(res.body.user.user).toEqual(body.user)
			expect(res.body.user.role).not.toEqual("user")
			expect(res.body.user.role).toEqual("admin")
		})

		test("should return Unauthorized error when bad credentials are provided", async () => {
			const body = {
        user: "admin",
				password: "4325"
			}
			const res = await request.post(`${base_url}/auth/login`).send(body);
			expect(res.statusCode).toEqual(HTTP_STATUS_CODE.UNAUTHORIZED)
		})

  })



})

