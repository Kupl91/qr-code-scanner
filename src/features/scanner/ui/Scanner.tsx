"use client";

import { useCallback, useRef } from 'react';
import { useAppDispatch } from '@/shared/lib/hooks';
import { setScanResult, setError } from '@/entities/scan/model/scanSlice';
import { Button } from '@/shared/ui/button';
import { boxApi } from '@/shared/api/box';
import { useToast } from '@/shared/ui/use-toast';
import { BoxField } from '@/shared/api/types/box';
import { ScanField } from '@/entities/scan/model/types';

const mapBoxFieldToScanField = (field: BoxField): ScanField => ({
  ...field,
  value: String(field.value),
  type: field.type === 'str' || field.type === 'select' || field.type === 'textarea' ? 'text' : field.type === 'number' ? 'number' : 'date'
});

export const Scanner = () => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const lastScannedId = useRef<string | null>(null);

  const handleScan = useCallback(async () => {
    try {
      const boxIds = ['BOX001', 'BOX002', 'BOX003', 'BOX004'];
      let randomId;
      
      // Исключаем последний отсканированный ID
      do {
        randomId = boxIds[Math.floor(Math.random() * boxIds.length)];
      } while (randomId === lastScannedId.current && boxIds.length > 1);
      
      lastScannedId.current = randomId;
      
      const scanResult = await boxApi.scanBox(randomId);
      
      if (!scanResult.success) {
        throw new Error(scanResult.error);
      }

      // Добавляем поле components к полям формы
      const componentsField: BoxField = {
        id: 'components',
        label: 'Комплектация',
        type: 'textarea',
        value: scanResult.data!.components.join('\n'),
        required: false
      };

      dispatch(setScanResult({
        id: scanResult.data!.id,
        code: scanResult.data!.id,
        type: 'barcode',
        timestamp: Date.now(),
        fields: [...scanResult.data!.fields.map(mapBoxFieldToScanField), mapBoxFieldToScanField(componentsField)]
      }));

      toast({
        title: "Успешно",
        description: `Отсканирован ${scanResult.data!.productType}`
      });
    } catch (error) {
      dispatch(setError(error instanceof Error ? error.message : 'Произошла ошибка при сканировании'));
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: error instanceof Error ? error.message : 'Произошла ошибка при сканировании'
      });
    }
  }, [dispatch, toast]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <Button onClick={handleScan} size="lg" className="px-8 py-6 text-lg">
        Сканировать коробку
      </Button>
    </div>
  );
}; 