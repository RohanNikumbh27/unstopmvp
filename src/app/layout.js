
import { isUserLoggedIn } from "@/utils";
import "./globals.css";
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata = {
  title: "Unstop",
};

export default function RootLayout({ children }) {
  isUserLoggedIn();
  return (
    <html lang="en" className="bg-[#F4F4F4]">
      <body
        className={`${poppins.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
