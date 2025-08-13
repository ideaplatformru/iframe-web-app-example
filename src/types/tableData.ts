/** Определение данных таблицы */
export type ITableData = Record<string, unknown> &
  {
    /** Поле группировки */
    railway?: string | null;
  }[];
