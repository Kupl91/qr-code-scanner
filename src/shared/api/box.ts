import { Box, ScanBoxResponse } from './types/box';

const BASE_URL = 'http://localhost:3001';

export const boxApi = {
  scanBox: async (code: string): Promise<ScanBoxResponse> => {
    try {
      const response = await fetch(`${BASE_URL}/boxes?id=${code}`);
      const boxes: Box[] = await response.json();
      
      if (boxes.length === 0) {
        return {
          success: false,
          error: 'Коробка не найдена'
        };
      }

      return {
        success: true,
        data: boxes[0]
      };
    } catch (error) {
      return {
        success: false,
        error: 'Ошибка при сканировании'
      };
    }
  },

  updateBox: async (id: string, data: Partial<Box>): Promise<Box> => {
    try {
      // Сначала получаем текущие данные
      const response = await fetch(`${BASE_URL}/boxes?id=${id}`);
      const boxes: Box[] = await response.json();
      
      if (boxes.length === 0) {
        throw new Error('Коробка не найдена');
      }

      // Обновляем данные
      const updatedBox = { ...boxes[0], ...data };
      
      const updateResponse = await fetch(`${BASE_URL}/boxes/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedBox),
      });

      return updateResponse.json();
    } catch (error) {
      throw new Error('Ошибка при обновлении данных');
    }
  }
}; 