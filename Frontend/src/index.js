import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Adminworks from "./pages/Adminworks";
import Memberworks from "./pages/Memberworks";
import MemberAccount from "./components/MemberAccount";
import Rentpage from "./pages/Rentpage";
import Sellpage from "./pages/Sellpage";
import Password from "./components/Changepassword";
import MemberComplain from "./components/MemberComplain";
import Selllist from "./pages/Selllist";
import Rentlist from "./pages/Rentlist";
import Homerentlist from "./pages/Homerentlist";
import Homeselllist from "./pages/Homeselllist";
import Viewdetail from "./pages/viewdetail/[Detail]";
import Message from "./pages/Message";


export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="contact" element={<Contact />} />
          <Route path="adminworks" element={<Adminworks />} />
          <Route path="memberworks" element={<Memberworks />} />
          <Route path="memberaccount" element={<MemberAccount />} />
          <Route path="memberrent" element={<Rentpage />} />
          <Route path="membersell" element={<Sellpage />} />
          <Route path="password" element={<Password />} />
          <Route path="membercomplain" element={<MemberComplain />} />
          <Route path="selllist" element={<Selllist />} />
          <Route path="rentlist" element={<Rentlist />} />
          <Route path="homerentlist" element={<Homerentlist />} />
          <Route path="homeselllist" element={<Homeselllist />} />
          <Route path="viewdetail/:id" element={<Viewdetail />} />
          <Route path="message" element={<Message />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);