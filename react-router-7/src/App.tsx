import { Route, Routes } from "react-router";
import { Home } from "./container/home";
import { About } from "./container/about";
import { Contact } from "./container/contact";
import { Navbar } from "./components/navbar";
import { Login } from "./container/login";
import { SignUp } from "./container/sign-up";
import { Users } from "./components/users";
import { User } from "./components/user";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Navbar />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="user">
            <Route path="login" element={<Login />} />{" "}
            {/* Path becomes /user/login */}
            <Route path="signup" element={<SignUp />} />{" "}
            {/* Path becomes /user/signup */}
          </Route>
        </Route>
        <Route path="/*" element={<h1>Page not found</h1>} />
      </Routes>
    </>
  );
}

export default App;
