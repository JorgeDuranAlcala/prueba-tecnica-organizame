import { IUDgenerator } from "./IUIDgenerator";
import { v4 as uuid } from "uuid";

export class UIDgenerator implements IUDgenerator {
  static create() {
    return new UIDgenerator();
  }

  public gen() {
    return uuid();
  }
}
