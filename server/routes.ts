import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertSpruchSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // API route for fetching a random Schnupfspruch
  app.get("/api/spruch/random", async (req, res) => {
    try {
      const randomSpruch = await storage.getRandomSpruch();
      
      if (!randomSpruch) {
        return res.status(404).json({ message: "Keine Sprüche gefunden" });
      }
      
      return res.json(randomSpruch);
    } catch (error) {
      console.error("Error fetching random spruch:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  });

  // API route for submitting a new Schnupfspruch
  app.post("/api/spruch/submit", async (req, res) => {
    try {
      // Validate the request body
      const validatedData = insertSpruchSchema.safeParse(req.body);
      
      if (!validatedData.success) {
        return res.status(400).json({ 
          message: "Ungültige Daten", 
          errors: validatedData.error.errors 
        });
      }
      
      // Create the new Spruch
      const newSpruch = await storage.createSpruch(validatedData.data);
      
      return res.status(201).json({
        message: "Spruch erfolgreich eingereicht",
        spruch: newSpruch
      });
    } catch (error) {
      console.error("Error submitting spruch:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  });

  // API route for fetching all approved Schnupfsprüche
  app.get("/api/spruch/all", async (req, res) => {
    try {
      const sprueche = await storage.getFreigegebeneSprueche();
      return res.json(sprueche);
    } catch (error) {
      console.error("Error fetching sprueche:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  });

  // Admin routes
  app.get("/api/admin/sprueche", async (req, res) => {
    try {
      const sprueche = await storage.getAllSprueche();
      return res.json(sprueche);
    } catch (error) {
      console.error("Error fetching all sprueche:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  });

  // API route for approving a Schnupfspruch
  app.put("/api/admin/spruch/:id/approve", async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Ungültige ID" });
      }

      // Update the Spruch status to approved
      const updatedSpruch = await storage.updateSpruchStatus(id, "freigegeben");
      
      if (!updatedSpruch) {
        return res.status(404).json({ message: "Spruch nicht gefunden" });
      }
      
      return res.json({
        message: "Spruch erfolgreich freigegeben",
        spruch: updatedSpruch
      });
    } catch (error) {
      console.error("Error approving spruch:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  });

  // API route for rejecting a Schnupfspruch
  app.put("/api/admin/spruch/:id/reject", async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Ungültige ID" });
      }

      // Update the Spruch status to rejected
      const updatedSpruch = await storage.updateSpruchStatus(id, "abgelehnt");
      
      if (!updatedSpruch) {
        return res.status(404).json({ message: "Spruch nicht gefunden" });
      }
      
      return res.json({
        message: "Spruch erfolgreich abgelehnt",
        spruch: updatedSpruch
      });
    } catch (error) {
      console.error("Error rejecting spruch:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
