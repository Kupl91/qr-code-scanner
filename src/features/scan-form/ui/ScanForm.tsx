"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { clearScanResult, saveScanResult } from '@/entities/scan/model/scanSlice';
import { Card, CardContent, CardFooter, CardHeader } from '@/shared/ui/card';
import { boxApi } from '@/shared/api/box';
import { useToast } from '@/shared/ui/use-toast';

type FormData = Record<string, string>;

export const ScanForm = () => {
  const dispatch = useAppDispatch();
  const { currentScan } = useAppSelector((state) => state.scan);
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

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

  const onSubmit = async (data: FormData) => {
    try {
      dispatch(saveScanResult({ 
        ...currentScan, 
        fields: currentScan.fields.map(field => ({
          ...field,
          value: data[field.id]
        }))
      }));

      await boxApi.updateBox(currentScan.code, {
        fields: currentScan.fields.map(field => ({
          ...field,
          value: data[field.id]
        }))
      });

      setIsEditing(false);
      toast({
        title: "Успешно",
        description: `Изменения внесены для ${currentScan.code}`,
        variant: "default",
        duration: 3000,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Ошибка сохранения",
        description: error instanceof Error 
          ? `Не удалось сохранить изменения: ${error.message}`
          : "Не удалось сохранить изменения",
        duration: 5000,
      });
      console.error('Ошибка при сохранении:', error);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <h2 className="text-xl font-semibold">Результат сканирования</h2>
        <p className="text-sm text-muted-foreground">
          Код: {currentScan.code}
        </p>
      </CardHeader>
      <CardContent>
        <form id="scan-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {currentScan.fields.map((field) => (
            <div key={field.id} className="space-y-2">
              <Label htmlFor={field.id}>
                {field.label}
                {field.required && <span className="text-destructive ml-1">*</span>}
              </Label>
              {field.type === 'text' && field.id === 'components' ? (
                <textarea
                  id={field.id}
                  className="w-full min-h-[100px] p-2 border rounded-md resize-y"
                  {...form.register(field.id)}
                  disabled={!isEditing}
                />
              ) : (
                <Input
                  id={field.id}
                  type={field.type}
                  {...form.register(field.id)}
                  disabled={!isEditing}
                />
              )}
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
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => dispatch(clearScanResult())}
          >
            Назад
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? 'Отменить' : 'Редактировать'}
          </Button>
        </div>
        <Button 
          type="submit"
          form="scan-form"
          disabled={!isEditing}
        >
          Сохранить
        </Button>
      </CardFooter>
    </Card>
  );
}; 