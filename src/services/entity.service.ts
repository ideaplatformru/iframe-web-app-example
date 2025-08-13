import type { ITableData } from "../types";
import { baseApi } from "./baseApi";

type Props = {
  /** Название таблицы */
  tableName: string;
  /** Опции запроса */
  options?: Record<string, unknown>;
};

/** Запрос данных по таблице */
export const getTableData = async (params: Props): Promise<ITableData> => {
  const { tableName, options } = params;

  return baseApi<ITableData>({ url: `entity/${tableName}?expand=true`, method: "POST", ...options });
};
