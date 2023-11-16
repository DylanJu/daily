import { sql } from "drizzle-orm";
import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";

export const customers = sqliteTable("Customers", {
  CustomerId: integer("CustomerId").primaryKey(),
  CompanyName: text("CompanyName"),
  ContactName: text("ContactName"),
});

export const journals = sqliteTable("journals", {
  journal_id: integer("journal_id").primaryKey(),
  title: text("title"),
  content: text("content"),
  created_at: text("created_at").default(sql`CURRENT_DATE`),
  updated_at: text("updated_at").default(sql`CURRENT_DATE`),
  user_id: integer("user_id").default(1),

  timestamp: text("timestamp").default(sql`CURRENT_TIMESTAMP`),
  time: text("time").default(sql`CURRENT_TIME`),
});
