import { useCallback, useEffect, useState, type FC } from "react";
import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";
import { getTableData } from "./services";
import { type ICurrentUser, MessageEventTypesEnum, type TChartData } from "./types";
import { PIE_COLOR } from "./constants";
import { convertDataToChartFormat } from "./utils";

const ChartApp: FC = () => {
  const [chartData, setChartData] = useState<TChartData | null>(null);
  const [currentUser, setCurrentUser] = useState<ICurrentUser | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    // Подписываемся на событие message, куда будут приходить сообщения из Системы
    window.addEventListener("message", handleHostMessage);

    return () => {
      // Отписываемся от события
      window.removeEventListener("message", handleHostMessage);
    };
  }, []);

  useEffect(() => {
    // Выполняем запрос данных, только тогда, когда пользователь получен
    if (!currentUser) {
      return;
    }

    fetchChartData();
  }, [currentUser]);

  /** Слушатель события message, посредством которого Система будет отправлять сообщения */
  const handleHostMessage = useCallback(({ data }: MessageEvent): void => {
    switch (data.type) {
      // Получение данных пользователя с записью их в стейт
      case MessageEventTypesEnum.SET_USER: {
        setCurrentUser(data.body);
        break;
      }

      // Получение поисковых полей
      case MessageEventTypesEnum.SET_SEARCH_FIELDS: {
        const { search_title } = data.body || {};

        if (search_title) {
          setTitle(search_title);
        }

        console.log("Поисковые поля", data.body);
        break;
      }
    }
  }, []);

  /** Запрос данных таблицы и преобразование данных в нужный формат */
  const fetchChartData = async (): Promise<void> => {
    try {
      const data = await getTableData({
        tableName: "build",
        options: {
          token: currentUser?.value, // Передаем токен авторизации
          body: {
            search: `createdbyid=${currentUser?.userId}`, // Поиск по createdbyid текущего пользователя
            paging: {
              count: 10_000, // Максимальное число записей за запрос
              startRow: 0, // Начиная с перового ряда
            },
          },
        },
      });

      setChartData(convertDataToChartFormat(data)); // Преобразовываем данные к необходимому формату и записываем в стейт
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  /** Обработка клика на секцию и отправка сообщения Системе по типу (для демонстрации) */
  const handleClickSection =
    (search: number | null, type: "link" | "related" | "details"): VoidFunction =>
    (): void => {
      let message: Record<string, any> = {};

      switch (type) {
        // Сообщение смены пути Системы
        case "link": {
          let path = "/build_by_railway";

          if (search) {
            path += `?p_railway=${search}`;
          }

          message = {
            type: MessageEventTypesEnum.CHANGE_PATH,
            body: {
              path,
            },
          };
          break;
        }

        // Сообщение открытия связанного экрана
        case "related": {
          message = {
            type: MessageEventTypesEnum.SHOW_RELATED_DISPLAY,
            body: {
              relatedViewId: "build_by_railway",
              search: {
                p_railway: search,
              },
            },
          };
          break;
        }

        // Сообщение открытия формы одной записи
        case "details": {
          message = {
            type: MessageEventTypesEnum.SHOW_DETAILS_DISPLAY,
            body: {
              relatedViewId: "pagination_list_example",
              recordId: "1",
              search: {
                p_railway: search,
              },
            },
          };
          break;
        }
      }

      // Отправка сообщения Системе
      window.parent.postMessage(message, "*");
    };

  if (isLoading) {
    return <p>Загрузка...</p>;
  }

  if (!chartData?.length) {
    return <p>Нет записей.</p>;
  }

  return (
    <div>
      {!!title && <h3>{title}</h3>}
      <PieChart width={400} height={400}>
        <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120} fill={PIE_COLOR}>
          {chartData.map(({ color, search }, index) => (
            <Cell key={`cell-${index}`} fill={color} onClick={handleClickSection(search, "related")} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default ChartApp;
