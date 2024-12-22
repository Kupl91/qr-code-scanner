import { useAppSelector } from '@/shared/lib/hooks';
import { Scanner } from '@/features/scanner';
import { ScanForm } from '@/features/scan-form';

export const ScannerPage = () => {
  const { currentScan } = useAppSelector((state) => state.scan);

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      {currentScan ? <ScanForm /> : <Scanner />}
    </div>
  );
}; 