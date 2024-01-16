import Header from "./components/Header";

function Layout({ children }) {
  return (
    <div className="w-full">
      <Header />
      {children}
    </div>
  );
}

export default Layout;
