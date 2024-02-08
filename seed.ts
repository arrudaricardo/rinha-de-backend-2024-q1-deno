import { db } from "./db.ts";

db.execute(`
  CREATE TABLE IF NOT EXISTS account (
    id INTEGER PRIMARY KEY,
    saldo INTEGER,
    limite INTEGER
  );
  CREATE TABLE IF NOT EXISTS account_transaction (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    account_id INTEGER,
    valor INTEGER,
    tipo TEXT,
    descricao TEXT,
    realizada_em TEXT,
    FOREIGN KEY(account_id) REFERENCES account(id)
  );

    DELETE FROM account_transaction;
    DELETE FROM account;

    INSERT INTO account (id, limite, saldo) VALUES (1, 100000, 0);
    INSERT INTO account (id, limite, saldo) VALUES (2, 80000, 0);
    INSERT INTO account (id, limite, saldo) VALUES (3, 1000000, 0);
    INSERT INTO account (id, limite, saldo) VALUES (4, 10000000, 0);
    INSERT INTO account (id, limite, saldo) VALUES (5, 500000, 0);
`);

