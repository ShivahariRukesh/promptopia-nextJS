import NavBar from "@/components/NavBar";
import "../styles/global.css";
import Provider from "@components/Provider";

export const metadata = {
  title: "Home For Now",
  description: "Static Description",
};
const RootLayout = ({ children }) => {
  return (
    <html>
      <body>
        <Provider>
          <div>
            <NavBar />
            {children}
          </div>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
