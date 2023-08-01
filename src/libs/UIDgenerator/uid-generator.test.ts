import { IUDgenerator } from "./IUIDgenerator";
import { UIDgenerator } from "./uid-generator";

describe("UIDgenerator class", () => {
  let uidGenerator: IUDgenerator;

  beforeEach(() => {
    uidGenerator = UIDgenerator.create();
  });

  test("should gen an unique id", () => {
    const id = uidGenerator.gen();
    expect(id).toBeDefined();
    expect(id).not.toEqual("");
  });
});
