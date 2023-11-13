import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";

export const customers = sqliteTable("Customers", {
  CustomerId: integer("CustomerId").primaryKey(),
  CompanyName: text("CompanyName"),
  ContactName: text("ContactName"),
});
