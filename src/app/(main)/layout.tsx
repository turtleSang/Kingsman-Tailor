import Footer from "@/layout/footer";
import NavBarMain from "@/layout/nav-bar";

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
