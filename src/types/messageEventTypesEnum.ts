/** Перечень типов событий фрейма */
export enum MessageEventTypesEnum {
  /** Событие установки данных пользователя */
  SET_USER = "SET_USER",
  /** Событие установки поисковых полей */
  SET_SEARCH_FIELDS = "SET_SEARCH_FIELDS",
  /** Событие смены пути хост приложения */
  CHANGE_PATH = "CHANGE_PATH",
  /** Событие открытия связанного отображения */
  SHOW_RELATED_DISPLAY = "SHOW_RELATED_DISPLAY",
  /** Событие открытия формы одной записи */
  SHOW_DETAILS_DISPLAY = "SHOW_DETAILS_DISPLAY",
}
