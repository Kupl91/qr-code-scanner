"use client";

import { useCallback, useEffect, useRef } from 'react';
import { BrowserMultiFormatReader } from '@zxing/library';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { setScanResult, setError, startScanning } from '@/entities/scan/model/scanSlice';
import { Button } from '@/shared/ui/button';
import { generateFieldsBasedOnCode } from '@/entities/scan/lib/generateFields';
import { ScanResult } from '@/entities/scan/model/types';

export const Scanner = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const dispatch = useAppDispatch();
  const { error } = useAppSelector((state) => state.scan);

  const handleScan = useCallback(async () => {
    const codeReader = new BrowserMultiFormatReader();
    
    try {
      if (!videoRef.current) {
        throw new Error('Видео элемент не найден');
      }
      
      const videoInputDevices = await codeReader.listVideoInputDevices();
      
      if (!videoInputDevices?.length) {
        throw new Error('Камера не найдена');
      }

      dispatch(startScanning());

      await codeReader.decodeFromVideoDevice(
        null,
        videoRef.current || null,
        (result) => {
          if (result) {
            // Динамическое создание полей на основе типа кода
            const scanResult: ScanResult = {
              id: Date.now().toString(),
              code: result.getText(),
              type: result.getBarcodeFormat().toString().includes('QR') ? 'qr' : 'barcode',
              timestamp: Date.now(),
              fields: generateFieldsBasedOnCode(result.getText(), result.getBarcodeFormat().toString()),
            };
            
            dispatch(setScanResult(scanResult));
            codeReader.reset();
          }
        }
      );
    } catch (error) {
      dispatch(setError(error instanceof Error ? error.message : 'Произошла ошибка при сканировании'));
    }
  }, [dispatch]);

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();
    
    return () => {
      codeReader.reset();
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      {error && (
        <p className="text-destructive text-sm">{error}</p>
      )}
      <Button onClick={handleScan}>
        Начать сканирование
      </Button>
      <video
        ref={videoRef}
        className="w-full max-w-md aspect-video"
      />
    </div>
  );
}; 