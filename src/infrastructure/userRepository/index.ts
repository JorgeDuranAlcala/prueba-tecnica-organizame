import { InMemoryDatabase } from "../database/In-memory";
import { InMemoryUserRepo } from "./InMemoryUserRepo";

const _db = new InMemoryDatabase();
export const inMemoryUserRepo = new InMemoryUserRepo(_db);
