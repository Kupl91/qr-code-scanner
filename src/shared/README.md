# Shared Layer

Переиспользуемый код, утилиты и базовые компоненты.

## UI Components (`/ui`)

### Button
- Варианты:
  - Primary: основная кнопка
  - Ghost: прозрачная кнопка
  - Link: кнопка-ссылка
- Состояния:
  - Hover, Active, Focus
  - Disabled
  - Loading
- Доступность:
  - ARIA атрибуты
  - Keyboard навигация
- Кастомизация:
  - Размеры (sm, md, lg)
  - Цвета через CSS переменные
  - Иконки и контент

### Input
- Функционал:
  - Controlled/Uncontrolled режимы
  - Интеграция с формами
  - Валидация и ошибки
- Состояния:
  - Focus, Hover
  - Error, Success
  - Disabled
- Доступность:
  - Labels и ARIA
  - Error messages
- Стилизация:
  - Размеры и отступы
  - Цвета и границы
  - Анимации

### Card
- Компоненты:
  - CardHeader
  - CardContent
  - CardFooter
- Стилизация:
  - Тени и скругления
  - Отступы и spacing
  - Borders и dividers
- Варианты:
  - Elevated
  - Outlined
  - Compact

### Avatar
- Функционал:
  - Изображения
  - Fallback с инициалами
  - Placeholder
- Размеры:
  - sm: 24px
  - md: 32px
  - lg: 40px
- Стилизация:
  - Скругления
  - Borders
  - Colors

## Config (`/config`)

### Store
- Redux конфигурация
- Middleware setup
- DevTools интеграция
- Типизация state

### Constants
- API endpoints
- Размеры и брейкпоинты
- Цветовые схемы
- Валидационные правила

### Fonts
- Подключение шрифтов:
  - Geist Sans
  - Geist Mono
- Оптимизация:
  - Preload
  - Variable fonts
  - Subset Latin

## Lib (`/lib`)

### Hooks
- useDownloadQR
  - Конвертация canvas в PNG
  - Сохранение файла
  - Обработка ошибок
- useMediaQuery
  - Адаптивность
  - Breakpoints
- useDebounce
  - Оптимизация вызовов
  - Типизация

### Utils
- cn: утилита для классов
  - Merge classnames
  - Conditional styles
- formatters
  - Форматирование дат
  - Форматирование телеф��нов
  - Форматирование URL
- validators
  - Проверка email
  - Проверка телефона
  - Проверка URL

## API (`/api`)

### Types
- Common types
  - API responses
  - Error handling
  - Pagination
- DTO interfaces
  - Request/Response types
  - Entity types

### Mocks
- Mock data
  - Тестовые данные
  - Демо контент
- Mock API
  - Response имитация
  - Error cases 