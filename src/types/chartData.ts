/** Определение данных диаграммы */
export type TChartData = {
  /** Имя секции */
  name: string;
  /** Значение секции */
  value: number;
  /** Цвет секции */
  color: string;
  /** Поисковое значение секции */
  search: number | null;
}[];
