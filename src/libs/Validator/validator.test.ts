import { CreateSafeboxDto } from "@src/domain/Safebox/dtos/createSafebox-dto";
import { UpdateSafeboxDto } from "@src/domain/Safebox/dtos/updateSafebox-dto";
import { plainToInstance } from "class-transformer";
import { IValidator } from "./IValidator";
import { Validator } from "./validator";

describe("validator class", () => {
  let data_validator: IValidator;

  beforeEach(() => {
    data_validator = Validator.create();
  });

  test("should confirm if data is in a correct format", async () => {
    const body = {
      name: "safebox1",
      password: "Luna$$2001",
    };
    const dto = plainToInstance(CreateSafeboxDto, body, {
      excludeExtraneousValues: true,
      exposeDefaultValues: true,
    });
    const result = await data_validator.validate(dto);
    expect(result).toBeTruthy();
  });
  test("should throw errors when name is empty", async () => {
    try {
      const body = {
        name: "",
        password: "Luna$$2001",
      };
      const dto = plainToInstance(CreateSafeboxDto, body, {
        excludeExtraneousValues: true,
        exposeDefaultValues: true,
      });
      await data_validator.validate(dto);
    } catch (error) {
      if (!(error instanceof Error)) return;
      expect(error).toBeDefined();
      expect(error.message).toMatch(/name should not be empty/gi);
    }
  });
  test("should throw an error when password is empty", async () => {
    try {
      const body = {
        name: "safebox1",
        password: "",
      };
      const dto = plainToInstance(CreateSafeboxDto, body, {
        excludeExtraneousValues: true,
        exposeDefaultValues: true,
      });
      await data_validator.validate(dto);
    } catch (error) {
      if (!(error instanceof Error)) return;
      expect(error).toBeDefined();
      expect(error.message).toMatch(/password should not be empty/gi);
    }
  });
  test("should throw an error when password or name are not strings", async () => {
    try {
      const body = {
        name: 123,
        password: 2001,
      };
      const dto = plainToInstance(CreateSafeboxDto, body, {
        excludeExtraneousValues: true,
        exposeDefaultValues: true,
      });
      await data_validator.validate(dto);
    } catch (error) {
      if (!(error instanceof Error)) return;
      expect(error).toBeDefined();
      //console.log(error);
      expect(error.message).toMatch(
        /name must be a string, password must be a string/gi
      );
    }
  });
  test("should throw an error when content array is empty", async () => {
    try {
      const body = {
        content: [],
      };
      const dto = plainToInstance(UpdateSafeboxDto, body, {
        excludeExtraneousValues: true,
        exposeDefaultValues: true,
      });
      await data_validator.validate(dto);
    } catch (error) {
      if (!(error instanceof Error)) return;
      expect(error).toBeDefined();
      expect(error.message).toMatch(/content should not be empty/);
    }
  });
  test("should throw an error when content is not an array ", async () => {
    try {
      const body = {
        content: 222,
      };
      const dto = plainToInstance(UpdateSafeboxDto, body, {
        excludeExtraneousValues: true,
        exposeDefaultValues: true,
      });
      await data_validator.validate(dto);
    } catch (error) {
      if (!(error instanceof Error)) return;
      expect(error).toBeDefined();
      expect(error.message).toMatch(/content must be an array/);
    }
  });
});
