# Features

Слой функциональности приложения.

## Структура

### scanner/
Функционал сканирования штрих-кодов
- `ui/Scanner.tsx` - Компонент сканера
- `model/` - Бизнес-логика сканирования

### scan-form/
Форма редактирования результатов сканирования
- `ui/ScanForm.tsx` - Компонент формы
- `model/` - Валидация и обработка данных

## API Endpoints

- `GET /boxes?id={code}` - Получение информации о коробке
- `PATCH /boxes/{id}` - Обновление информации о коробке 