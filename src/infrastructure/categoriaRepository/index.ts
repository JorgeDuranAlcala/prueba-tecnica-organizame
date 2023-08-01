import { InMemoryDatabase } from "../database/In-memory";
import { InMemoryCategoriaRepo } from "./InMemoryCategoriaRepo";

const _db = new InMemoryDatabase();
export const inMemoryCategoriaRepo = new InMemoryCategoriaRepo(_db);
