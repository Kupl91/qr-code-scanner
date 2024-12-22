import { ScanField } from '../model/types';

export const generateFieldsBasedOnCode = (code: string, format: string): ScanField[] => {
  const baseFields: ScanField[] = [
    {
      id: 'name',
      label: 'Название',
      type: 'text',
      value: '',
      required: true,
    },
    {
      id: 'quantity',
      label: 'Количество',
      type: 'number',
      value: '1',
      required: true,
    }
  ];

  // Добавляем специфичные поля в зависимости от формата
  if (format.includes('QR')) {
    baseFields.push(
      {
        id: 'description',
        label: 'Описание',
        type: 'text',
        value: '',
      },
      {
        id: 'date',
        label: 'Дата',
        type: 'date',
        value: new Date().toISOString().split('T')[0],
      }
    );
  } else if (format.includes('EAN') || format.includes('UPC')) {
    baseFields.push(
      {
        id: 'price',
        label: 'Цена',
        type: 'number',
        value: '',
        required: true,
      }
    );
  }

  return baseFields;
}; 