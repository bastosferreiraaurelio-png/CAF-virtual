import './globals.css';
import { Sora } from 'next/font/google';

const sora = Sora({ subsets: ['latin'] });
export const metadata = { title: 'CAFÉvirtual', description: 'O futuro dos negócios acontece aqui.' };

export default function RootLayout({ children }) {
  return <html lang="pt-BR"><body className={sora.className}>{children}</body></html>;
}