import { users, type User, type InsertUser, sprueche, type Spruch, type InsertSpruch } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

// Interface with CRUD methods
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Spruch methods
  getSpruch(id: number): Promise<Spruch | undefined>;
  getAllSprueche(): Promise<Spruch[]>;
  getRandomSpruch(): Promise<Spruch | undefined>;
  getFreigegebeneSprueche(): Promise<Spruch[]>;
  createSpruch(spruch: InsertSpruch): Promise<Spruch>;
  updateSpruchStatus(id: number, status: string): Promise<Spruch | undefined>;
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  // Spruch methods
  async getSpruch(id: number): Promise<Spruch | undefined> {
    const result = await db.select().from(sprueche).where(eq(sprueche.id, id));
    return result[0];
  }

  async getAllSprueche(): Promise<Spruch[]> {
    return await db.select().from(sprueche);
  }

  async getFreigegebeneSprueche(): Promise<Spruch[]> {
    return await db.select().from(sprueche).where(eq(sprueche.status, "freigegeben"));
  }

  async getRandomSpruch(): Promise<Spruch | undefined> {
    const freigegebeneSprueche = await this.getFreigegebeneSprueche();
    if (freigegebeneSprueche.length === 0) return undefined;
    
    const randomIndex = Math.floor(Math.random() * freigegebeneSprueche.length);
    return freigegebeneSprueche[randomIndex];
  }

  async createSpruch(insertSpruch: InsertSpruch): Promise<Spruch> {
    // Make sure to set the default status
    const [spruch] = await db
      .insert(sprueche)
      .values({
        ...insertSpruch,
        status: "zur_pruefung",
      })
      .returning();
    return spruch;
  }

  async updateSpruchStatus(id: number, status: string): Promise<Spruch | undefined> {
    const [updatedSpruch] = await db
      .update(sprueche)
      .set({ status })
      .where(eq(sprueche.id, id))
      .returning();
    return updatedSpruch;
  }

  // Helper method to seed initial data if needed
  async seedInitialData(): Promise<void> {
    const count = await db.select().from(sprueche);
    
    // Only seed if we have no data
    if (count.length === 0) {
      const sampleSprueche = [
        "Zum Wohl, zum Wohl, zum Gerstensaft, erhält der Mensch die Lebenskraft.",
        "Ist die Schnupftabakdose leer, dann gibt's im Himmel keinen Schnupftabak mehr.",
        "Ein Schnupfer und ein Jäger sind Brüder im Geist, besonders wenn man gemeinsam den Tabak preist.",
        "Im Schnupfen liegt die Würze des Lebens, man nimmt ihn nie vergebens.",
        "Ein kleines Priischen, tut gut für's Näschen.",
        "Erst wenn die letzte Prise genommen, der letzte Schnupftabak geraucht und der letzte Tropfen getrunken ist, werdet ihr merken, dass man Geselligkeit nicht kaufen kann.",
        "Schnupfen ist mehr als eine Gewohnheit, es ist eine Lebenseinstellung.",
        "Wer niemals schnupft, hat nie gelebt!"
      ];

      await db.insert(sprueche).values(
        sampleSprueche.map(text => ({
          text,
          status: "freigegeben",
        }))
      );
    }
  }
}

export const storage = new DatabaseStorage();