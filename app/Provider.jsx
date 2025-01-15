import Header from "@/app/_components/Header";
import Footer from "@/app/_components/Footer";

export default function Provider({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header stays at the top */}
      <Header />

      {/* Main content fills available space */}
      <main className="flex-grow">{children}</main>

      {/* Footer stays at the bottom */}
      <Footer />
    </div>
  );
}
