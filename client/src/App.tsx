import { Routes, Route } from "react-router-dom";
import { CustomRouter } from "./routers/CustomRouter";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Container from "./components/container/Container";
import Login from "./pages/login/LoginPage";
import Register from "./pages/register/RegisterPage";
const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {CustomRouter.map((item, index) => (
          <Route
            key={index}
            path={item.path}
            element={
              <div>
                <Container>
                  {!item.hideHeaderFooter && <Header />}
                  {item.element}
                </Container>
                {!item.hideHeaderFooter && <Footer />}
              </div>
            }
          />
        ))}
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;
