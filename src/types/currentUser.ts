/** Определение данных пользователя */
export interface ICurrentUser {
  /** Локализация */
  localization: string;
  /** Id роли */
  roleId: number;
  /** Логин */
  userName: string;
  /** Id пользователя */
  userId: number;
  /** Количество сброшенных паролей */
  pwtResetCount: number;
  /** Внутреннее имя роли */
  roleName: string;
  /** Истечение срока действия пароля */
  expiration: number;
  /** Последний вход (timestamp) */
  lastActivity: number;
  /** Полное имя пользователя */
  fullname: string;
  /** Значение токена авторизации */
  value: string;
  /** Значение токена OIDC авторизации для логаута */
  idToken: string | null;
  /** Электронная почта */
  email: string;
  /** Статус пользователя */
  status: string;
  /** Id рабочего пространства */
  workspaceId: number;
  /** Временная зона */
  timeZone: {
    /** Id тайм зоны */
    timeZoneId: string;
    /** Внутреннее имя тайм зоны */
    shortName: string;
    /** Отображаемое название тайм зоны */
    displayName: string;
    /** Смещение от UTC по тайм зоне пользователя */
    gmtOffset: number;
  };
}
