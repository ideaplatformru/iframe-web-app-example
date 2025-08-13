import { API_URL } from "./const";

type Props = {
  /** URL для запроса */
  url: string;
  /** Метод запроса данных */
  method: string;
  /** Токен авторизации */
  token?: string;
  /** Тело запроса */
  body?: any;
};

/** Функция обертка для запроса данных */
export const baseApi = async <T = unknown>(params: Props): Promise<T> => {
  const { url, token, ...options } = params;

  if (options.body) {
    options.body = JSON.stringify(options.body);
  }

  const headers: Record<string, string> = { "Content-Type": "application/json" };

  // Проставляем токен авторизации по ключу X-AUTH
  if (token) {
    headers["X-AUTH"] = token;
  }

  const data = await fetch(`${API_URL}/${url}`, {
    headers,
    ...options,
  });

  if (data.ok) {
    return data.json();
  }

  throw new Error(data.statusText);
};
