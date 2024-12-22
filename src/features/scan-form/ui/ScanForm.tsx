"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { clearScanResult, saveScanResult } from '@/entities/scan/model/scanSlice';
import { Card, CardContent, CardFooter, CardHeader } from '@/shared/ui/card';

type FormData = Record<string, string>;

export const ScanForm = () => {
  const dispatch = useAppDispatch();
  const { currentScan } = useAppSelector((state) => state.scan);

  const createValidationSchema = () => {
    const schema: Record<string, z.ZodTypeAny> = {};
    
    currentScan?.fields.forEach((field) => {
      let fieldSchema = z.string();
      
      if (field.type === 'number') {
        fieldSchema = z.string().regex(/^\d+$/, 'Должно быть числом');
      } else if (field.type === 'date') {
        fieldSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Неверный формат даты');
      }
      
      if (field.required) {
        fieldSchema = fieldSchema.min(1, 'Обязательное поле');
      }
      
      schema[field.id] = fieldSchema;
    });

    return z.object(schema);
  };

  const form = useForm<FormData>({
    resolver: zodResolver(createValidationSchema()),
    defaultValues: Object.fromEntries(
      currentScan?.fields.map((field) => [field.id, field.value]) ?? []
    ),
  });

  if (!currentScan) return null;

  const onSubmit = (data: FormData) => {
    dispatch(saveScanResult({ ...currentScan, fields: currentScan.fields.map(field => ({
      ...field,
      value: data[field.id]
    }))}));
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <h2 className="text-xl font-semibold">Результат сканирования</h2>
        <p className="text-sm text-muted-foreground">
          Ко��: {currentScan.code}
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {currentScan.fields.map((field) => (
            <div key={field.id} className="space-y-2">
              <Label htmlFor={field.id}>
                {field.label}
                {field.required && <span className="text-destructive ml-1">*</span>}
              </Label>
              <Input
                id={field.id}
                type={field.type}
                {...form.register(field.id)}
              />
              {form.formState.errors[field.id] && (
                <p className="text-sm text-destructive">
                  {form.formState.errors[field.id]?.message as string}
                </p>
              )}
            </div>
          ))}
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={() => dispatch(clearScanResult())}
        >
          Назад
        </Button>
        <Button type="submit">
          Сохранить
        </Button>
      </CardFooter>
    </Card>
  );
}; 