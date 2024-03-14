import "./globals.css";
import { Poppins } from "next/font/google";
import { AuthProvider } from "./Provider";
const inter = Poppins({ subsets: ["latin"] , weight:['100', '200', '300', '400', '500', '600', '700', '800', '900'] });
import ContextUserData from "@/ContextUser";
export const metadata = {
  title: "MiWaY",
  description: "A E-Learning platform with a focus on quality education , ai voice notes explation and many more",
  icons: {
    icon: '/favicon.ico'
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap"/>
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <ContextUserData>
            {children}
          </ContextUserData>
        </AuthProvider>
      </body>
    </html>
  );
}
