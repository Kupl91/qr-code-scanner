import { StoreProvider } from '@/app/providers/store';
import './globals.css';
import { Toaster } from '@/shared/ui/toaster';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>
        <StoreProvider>
          {children}
        </StoreProvider>
        <Toaster />
      </body>
    </html>
  );
} 