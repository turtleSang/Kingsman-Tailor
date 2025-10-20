import Footer from "@/layout/footer";
import NavBarMain from "@/layout/nav-bar";
import LoadingMain from "./loading";

export default function LayoutMainPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <NavBarMain />
      {children}
      <Footer />
    </div>
  );
}
