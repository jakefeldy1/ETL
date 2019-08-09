-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.

-- Modify this code to update the DB schema diagram.
-- To reset the sample schema, replace everything with
-- two dots ('..' - without quotes).

CREATE TABLE "Beer_Styles" (
    "name" VARCHAR   NOT NULL,
    "beer_style" VARCHAR   NOT NULL,
    "ibu_Min" float   NOT NULL,
    "ibu_Max" float   NOT NULL,
    "abv_Min" float   NOT NULL,
    "abv_Max" float   NOT NULL,
    "srm_Min" float   NOT NULL,
    "srm_Max" float   NOT NULL,
    "og_Min" float   NOT NULL,
    "fg_Min" float   NOT NULL,
    "fg_Max" float   NOT NULL,
    CONSTRAINT "pk_Beer_Styles" PRIMARY KEY (
        "beer_style"
     )
);

CREATE TABLE "Beer_Reviews" (
    "review_id" int   NOT NULL,
    "review_time" time   NOT NULL,
    "user_profile_id" int   NOT NULL,
    "review_overall" float   NOT NULL,
    "review_aroma" float   NOT NULL,
    "review_appearance" float   NOT NULL,
    "review_palate" float   NOT NULL,
    "review_taste" float   NOT NULL,
    "beer_name" VARCHAR   NOT NULL,
    "beer_id" int   NOT NULL,
    CONSTRAINT "pk_Beer_Reviews" PRIMARY KEY (
        "review_id"
     )
);

CREATE TABLE "User_Table" (
    "profile_name" VARCHAR   NOT NULL,
    "profile_id" int   NOT NULL,
    CONSTRAINT "pk_User_Table" PRIMARY KEY (
        "profile_id"
     )
);

CREATE TABLE "Brewery_Table" (
    "brewery_id" int   NOT NULL,
    "brewery_name" VARCHAR   NOT NULL,
    CONSTRAINT "pk_Brewery_Table" PRIMARY KEY (
        "brewery_id"
     )
);

CREATE TABLE "Beer_Table" (
    "beer_id" int   NOT NULL,
    "beer_name" VARCHAR   NOT NULL,
    "brewery_id" int   NOT NULL,
    "beer_abv" float   NOT NULL,
    "beer_style" VARCHAR   NOT NULL,
    CONSTRAINT "pk_Beer_Table" PRIMARY KEY (
        "beer_id"
     )
);

ALTER TABLE "Beer_Reviews" ADD CONSTRAINT "fk_Beer_Reviews_user_profile_id" FOREIGN KEY("user_profile_id")
REFERENCES "User_Table" ("profile_id");

ALTER TABLE "Beer_Reviews" ADD CONSTRAINT "fk_Beer_Reviews_beer_id" FOREIGN KEY("beer_id")
REFERENCES "Beer_Table" ("beer_id");

ALTER TABLE "Beer_Table" ADD CONSTRAINT "fk_Beer_Table_brewery_id" FOREIGN KEY("brewery_id")
REFERENCES "Brewery_Table" ("brewery_id");

ALTER TABLE "Beer_Table" ADD CONSTRAINT "fk_Beer_Table_beer_style" FOREIGN KEY("beer_style")
REFERENCES "Beer_Styles" ("beer_style");

