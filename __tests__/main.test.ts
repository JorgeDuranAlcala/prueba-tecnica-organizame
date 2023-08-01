import { add } from "../src/libs/add";
jest.mock("../src/libs/add", () => {
  return {
    add: jest.fn().mockImplementation((x: number, y: number) => x + y),
  };
});

describe("first test", () => {
  test("add function", () => {
    expect(add).toHaveBeenCalledTimes(0);
    const result = add(2, 2);
    expect(result).toEqual(4);
    expect(add).toHaveBeenCalled();
    expect(add).toHaveBeenCalledTimes(1);
    expect(add).toHaveBeenCalledWith(2, 2);
  });
});
