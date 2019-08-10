DROP TABLE IF EXISTS beer_reviews;
DROP TABLE IF EXISTS beer_table;
DROP TABLE IF EXISTS beer_styles;
DROP TABLE IF EXISTS brewery_table;
DROP TABLE IF EXISTS user_table;

DROP TABLE IF EXISTS "Beer_Reviews";
DROP TABLE IF EXISTS "Beer_Table";
DROP TABLE IF EXISTS "Beer_Styles";
DROP TABLE IF EXISTS "Brewery_Table";
DROP TABLE IF EXISTS "User_Table";

-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.

-- Modify this code to update the DB schema diagram.
-- To reset the sample schema, replace everything with
-- two dots (‘..’ - without quotes).

CREATE TABLE "beer_styles" (
    "beer_style_id" int   NOT NULL,
    "name" VARCHAR   NOT NULL,
    "beer_style" VARCHAR   NOT NULL,
    "ibu_Min" float,
    "ibu_Max" float,
    "abv_Min" float,
    "abv_Max" float,
    "srm_Min" float,
    "srm_Max" float,
    "og_Min" float,
    "fg_Min" float,
    "fg_Max" float,
    CONSTRAINT "pk_beer_styles" PRIMARY KEY (
        "beer_style_id"
     )
);

CREATE TABLE "beer_reviews" (
    "review_id" int   NOT NULL,
    "review_time" time   NOT NULL,
    "user_profile_id" int   NOT NULL,
    "review_overall" float   NOT NULL,
    "review_aroma" float   NOT NULL,
    "review_appearance" float   NOT NULL,
    "review_palate" float   NOT NULL,
    "review_taste" float   NOT NULL,
    "beer_name" VARCHAR,
    "beer_id" int   NOT NULL,
    CONSTRAINT "pk_beer_reviews" PRIMARY KEY (
        "review_id"
     )
);

CREATE TABLE "user_table" (
    "profile_name" VARCHAR,
    "profile_id" int   NOT NULL,
    CONSTRAINT "pk_user_table" PRIMARY KEY (
        "profile_id"
     )
);

CREATE TABLE "brewery_table" (
    "brewery_id" int   NOT NULL,
    "brewery_name" VARCHAR,
    CONSTRAINT "pk_brewery_table" PRIMARY KEY (
        "brewery_id"
     )
);

CREATE TABLE "beer_table" (
    "beer_style_id" int   NOT NULL,
    "beer_id" int   NOT NULL,
    "beer_name" VARCHAR   NOT NULL,
    "brewery_id" int   NOT NULL,
    "beer_abv" float,
    "beer_style" VARCHAR   NOT NULL,
    CONSTRAINT "pk_beer_table" PRIMARY KEY (
        "beer_id"
     )
);

ALTER TABLE "beer_reviews" ADD CONSTRAINT "fk_beer_reviews_user_profile_id" FOREIGN KEY("user_profile_id")
REFERENCES "user_table" ("profile_id");

ALTER TABLE "beer_reviews" ADD CONSTRAINT "fk_beer_reviews_beer_id" FOREIGN KEY("beer_id")
REFERENCES "beer_table" ("beer_id");

ALTER TABLE "beer_table" ADD CONSTRAINT "fk_beer_table_beer_style_id" FOREIGN KEY("beer_style_id")
REFERENCES "beer_styles" ("beer_style_id");

ALTER TABLE "beer_table" ADD CONSTRAINT "fk_beer_table_brewery_id" FOREIGN KEY("brewery_id")
REFERENCES "brewery_table" ("brewery_id");


Select * from beer_styles