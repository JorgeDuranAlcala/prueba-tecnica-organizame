import { InMemoryDatabase } from "../database/In-memory";
import { InMemoryProductRepo } from "./InMemoryProductRepo";

const _db = new InMemoryDatabase();
export const inMemoryProductRepo = new InMemoryProductRepo(_db);
