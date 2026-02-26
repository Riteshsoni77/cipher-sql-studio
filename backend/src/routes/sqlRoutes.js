import express from "express";
import { client } from "../configdb/PostgreSQL.js";

const router = express.Router();

// API to execute SQL queries
router.post("/execute-query", async (req, res) => {
  const { schemaName, query } = req.body;

  if (!schemaName || !query) {
    return res.status(400).json({ error: "Schema name and query are required." });
  }

  try {
    // Set the search path to the schema
    await client.query(`SET search_path TO ${schemaName}`);

    // Execute the query
    const result = await client.query(query);

    // Return the query result
    res.status(200).json({ rows: result.rows });
  } catch (error) {
    console.error("Error executing query:", error.message);
    res.status(400).json({ error: error.message });
  }
});

// API to create assignment tables
router.post("/create-assignment-tables", async (req, res) => {
  const { schemaName, tables } = req.body;

  if (!schemaName || !tables || !Array.isArray(tables)) {
    return res.status(400).json({ error: "Schema name and tables are required." });
  }

  try {
    // Create schema
    await client.query(`CREATE SCHEMA IF NOT EXISTS ${schemaName}`);

    // Create tables and insert data
    for (const table of tables) {
      const { tableName, columns, rows } = table;

      // Create table
      const columnDefinitions = columns
        .map((col) => `${col.columnName} ${col.dataType}`)
        .join(", ");
      await client.query(`CREATE TABLE IF NOT EXISTS ${schemaName}.${tableName} (${columnDefinitions})`);

      // Insert rows
      for (const row of rows) {
        const columnNames = Object.keys(row).join(", ");
        const columnValues = Object.values(row)
          .map((val) => (typeof val === "string" ? `'${val}'` : val))
          .join(", ");
        await client.query(`INSERT INTO ${schemaName}.${tableName} (${columnNames}) VALUES (${columnValues})`);
      }
    }

    res.status(200).json({ message: "Tables created successfully" });
  } catch (error) {
    console.error("Error creating tables:", error.message);
    res.status(500).json({ error: "Failed to create tables" });
  }
});

export default router;