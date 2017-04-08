PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE doc (
doc_id INTEGER PRIMARY KEY NOT NULL,
doc_name VARCHAR(16) NOT NULL,
account_id INTEGER NOT NULL
);
INSERT INTO "doc" VALUES(1,'weather',1);
INSERT INTO "doc" VALUES(2,'car',1);
INSERT INTO "doc" VALUES(3,'End Doc',4);
INSERT INTO "doc" VALUES(4,'dsc',2);
CREATE TABLE datasrc (
data_id INTEGER PRIMARY KEY NOT NULL,
data_name VARCHAR(16) NOT NULL,
data_type VARCHAR(16) NOT NULL,
have_data INTEGER NOT NULL,
account_id INTEGER NOT NULL
);
INSERT INTO "datasrc" VALUES(1,'name1','bar',1,1);
INSERT INTO "datasrc" VALUES(2,'name2','bar',1,1);
INSERT INTO "datasrc" VALUES(3,'name3','bar',1,1);
INSERT INTO "datasrc" VALUES(4,'name4','bar',1,1);
INSERT INTO "datasrc" VALUES(5,'namenew5','pie',1,1);
INSERT INTO "datasrc" VALUES(6,'line6','line',1,1);
INSERT INTO "datasrc" VALUES(7,'newpie','pie',1,1);
INSERT INTO "datasrc" VALUES(8,'piee','pie',1,4);
INSERT INTO "datasrc" VALUES(9,'nodatapp','bar',1,4);
CREATE TABLE account (
account_id INTEGER PRIMARY KEY NOT NULL,
account_name VARCHAR(16) NOT NULL,
account_pwd VARCHAR(16) NOT NULL,
account_nick VARCHAR(16) NOT NULL,
account_email VARCHAR(320) NOT NULL
);
INSERT INTO "account" VALUES(1,'dxc','111','Justyer','1554694323@qq.com');
INSERT INTO "account" VALUES(2,'qwer','1234','祈','kyriesnow@outlook.com');
INSERT INTO "account" VALUES(3,'asdf','4567','Fuck','1554694323@qq.com');
INSERT INTO "account" VALUES(4,'zxcv','bnm','End','1554694323@qq.com');
COMMIT;
