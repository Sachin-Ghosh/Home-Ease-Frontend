import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div  className="bg-base-300">
      {children}
      </div>
      <Footer />
    </>
  );
};
export default Layout;