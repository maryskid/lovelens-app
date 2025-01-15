import "./globals.css";
import Provider from "@/app/Provider";
import { modernEra } from "@/fonts/typo";



export const metadata = {
  title: "Lovelens",
  description: "Transform Your Relationship Through Better Understanding",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${modernEra.className}  antialiased`}
      >
        <Provider>
            {children}
        </Provider>
      </body>
    </html>
  );
}
