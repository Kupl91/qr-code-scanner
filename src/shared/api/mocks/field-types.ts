import { FieldType } from '../types/field';

export const mockFieldTypes: FieldType[] = [
  {
    label: "Тема",
    type: "str",
    description: "Однострочное текстовое поле",
    value: "Приход оборудования"
  },
  {
    label: "Описание",
    type: "textarea",
    description: "Многострочное текстовое поле",
    value: "Регистрация поступления нового оборудования на склад."
  },
  {
    label: "Тип задачи",
    type: "select",
    description: "Выпадающий список с одиночным выбором",
    value: 20101,
    options: [
      {
        label: "Компьютеры",
        value: 20101
      },
      {
        label: "Принтеры",
        value: 20102
      },
      {
        label: "Сетевое оборудование",
        value: 20103
      },
      {
        label: "Мебель",
        value: 20104
      }
    ]
  },
  {
    label: "Дата поступления",
    type: "date",
    description: "Поле выбора даты",
    value: "2024-05-15"
  },
  {
    label: "Дата и время регистрации",
    type: "datetime", 
    description: "Поле выбора даты и времени",
    value: "2024-05-15T09:30:00"
  },
  {
    label: "Вложение",
    type: "attachment",
    description: "Поле для загрузки файлов",
    value: null
  },
  {
    label: "Что нужно изменить?",
    type: "multiselect",
    description: "Множественный выбор из списка",
    value: [],
    options: [
      {
        label: "Серийный номер",
        value: 30101
      },
      {
        label: "Местоположение на складе",
        value: 30102
      },
      {
        label: "Статус оборудования",
        value: 30103
      },
      {
        label: "Ответственный сотрудник",
        value: 30104
      }
    ]
  },
  {
    label: "Количество единиц",
    type: "int",
    description: "Числовое поле для ввода целых чисел",
    value: 50
  }
]; 