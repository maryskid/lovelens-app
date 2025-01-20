import "./globals.css";
import { modernEra } from "@/fonts/typo";
import { UserProvider } from "@/context/UserContext";



export const metadata = {
  title: "Lovelens",
  description: "Transform Your Relationship Through Better Understanding",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${modernEra.className}  antialiased`}
      >
        <UserProvider>
            {children}
        </UserProvider>
      </body>
    </html>
  );
}
