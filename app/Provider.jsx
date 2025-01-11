import Header from "@/app/_components/Header";
import Footer from "@/app/_components/Footer";

export default function Provider({ children }) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}

