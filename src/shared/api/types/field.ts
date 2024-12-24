export type FieldOptionType = {
  label: string;
  value: number;
};

export type FieldType = {
  id: number;
  label: string;
  type: 'str' | 'textarea' | 'select' | 'date' | 'datetime' | 'attachment' | 'multiselect' | 'int';
  description: string;
  value: string | number | null | any[];
  options?: FieldOptionType[];
}; 