import { COLORS, DEFAULT_COLOR, DEFAULT_LABEL, GROUP_FIELD } from "../constants";
import type { ITableData, TChartData } from "../types";

/** Преобразует данные таблицы в формат данных диаграммы */
export const convertDataToChartFormat = (data: ITableData | null): TChartData | null => {
  if (!data?.length) {
    return null;
  }

  const groupsCounter: Record<string, number> = {};

  // Подсчет частотности значения по ключу группировки
  data.forEach((dataItem) => {
    const fieldValue = dataItem[GROUP_FIELD] ?? DEFAULT_LABEL;
    groupsCounter[fieldValue] = groupsCounter[fieldValue] ? groupsCounter[fieldValue] + 1 : 1;
  });

  const groups = Object.entries(groupsCounter).map(([key, value], index) => ({
    name: key,
    value: value,
    color: COLORS[index] ?? DEFAULT_COLOR,
    search: key === DEFAULT_LABEL ? null : index + 1, // Используется для демонстрации
  }));

  return groups;
};
