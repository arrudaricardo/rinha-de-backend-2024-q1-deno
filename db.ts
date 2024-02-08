import { DB } from "https://deno.land/x/sqlite@v3.8/mod.ts";

export const db = new DB("./db/sqlite.db");

export class CustomHttpError extends Error {
  constructor(readonly httpCode: number, readonly message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

export interface Account {
  id: number;
  limite: number;
  saldo: number;
}

export interface UserAccountTransaction {
  valor: number;
  tipo: string;
  descricao?: string;
  realizada_em?: string;
}

interface TransacoeResponse {
  saldo: {
    total: number;
    data_extrato: string;
    limite: number;
  };
  ultimas_transacoes: Array<UserAccountTransaction>;
}

export function getUserAccount(id: number | string): Account {
  const [userAccount] = db.query<[number, number, number]>(
    "SELECT id, saldo, limite FROM account where id = ?",
    [id]
  );
  if (!userAccount) {
    throw new CustomHttpError(404, "User not found");
  }
  return {
    id: userAccount[0],
    saldo: userAccount[1],
    limite: userAccount[2],
  };
}

export function processPayment(
  id: string,
  transaction: Omit<UserAccountTransaction, "realizada_em">
): Omit<Account, "id"> {
  if (!["d", "c"].includes(transaction.tipo)) {
    throw new CustomHttpError(422, "Invalid transaction type");
  }
  if (!transaction.descricao || transaction.descricao.length > 10) {
    throw new CustomHttpError(422, "Invalid descricao");
  }
  const userAccount = getUserAccount(id);
  const valor =
    transaction.tipo === "d" ? -transaction.valor : transaction.valor;
  const updatedUserAccount = {
    limite: userAccount.limite,
    saldo: userAccount.saldo + valor,
  };

  if (
    updatedUserAccount.saldo < -updatedUserAccount.limite ||
    valor % 1 !== 0
  ) {
    throw new CustomHttpError(422, "Operation not allowed, insufficient funds");
  }

  db.transaction(() => {
    db.query(`
      INSERT INTO account_transaction (account_id, valor, tipo, descricao, realizada_em)
      VALUES (${id}, ${transaction.valor}, '${transaction.tipo}', '${
      transaction.descricao
    }', '${new Date().toISOString()}')
    `);
    db.query(`
      UPDATE account SET saldo = ${updatedUserAccount.saldo} WHERE id = ${id}
    `);
  });

  return updatedUserAccount;
}

export function getAccountTransations(id: number | string): TransacoeResponse {
  const userAccount = getUserAccount(id);
  const q = db.query<[number, string, string, string, number, number]>(`
    SELECT t.valor, t.tipo, t.descricao, t.realizada_em FROM account_transaction t WHERE t.account_id = ${id} ORDER BY realizada_em DESC LIMIT 10
  `);
  return {
    saldo: {
      total: userAccount.saldo,
      data_extrato: new Date().toISOString(),
      limite: userAccount.limite,
    },
    ultimas_transacoes: q.map((t) => ({
      valor: t[0],
      tipo: t[1],
      descricao: t[2],
      realizada_em: t[3],
    })),
  };
}
