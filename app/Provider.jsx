import Header from "@/app/_components/Header";
export default function Provider({ children }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}

