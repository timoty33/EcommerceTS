CREATE TABLE "products_storage" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "products_storage_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"variantId" integer NOT NULL,
	"storage" integer DEFAULT 0 NOT NULL,
	"sizesInStorage" varchar(255)[]
);
--> statement-breakpoint
CREATE TABLE "products_variants" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "products_variants_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"productId" integer NOT NULL,
	"price" numeric(10, 2) NOT NULL,
	"isOnSale" boolean DEFAULT false NOT NULL,
	"salePrice" numeric(10, 2),
	"color" varchar(255) NOT NULL,
	"sizes" varchar(255)[] NOT NULL,
	"tags" jsonb,
	"sku" varchar(255)
);
--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "description" varchar(200);--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "starsAverage" real DEFAULT 4.5 NOT NULL;--> statement-breakpoint
ALTER TABLE "products_storage" ADD CONSTRAINT "products_storage_variantId_products_variants_id_fk" FOREIGN KEY ("variantId") REFERENCES "public"."products_variants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products_variants" ADD CONSTRAINT "products_variants_productId_products_id_fk" FOREIGN KEY ("productId") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products" DROP COLUMN "price";