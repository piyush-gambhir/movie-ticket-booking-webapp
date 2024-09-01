import Header from "@/components/app/Header";
import Footer from "@/components/app/Footer";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
