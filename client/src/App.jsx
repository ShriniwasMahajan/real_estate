import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import SignIn from "./pages/sign-in";
import SignUp from "./pages/sign-up";
import About from "./pages/about";
import Profile from "./pages/profile";
import Header from "./components/header";
import PrivateRoute from "./components/private-route";
import CreateListing from "./pages/create-listing";
import UpdateListing from "./pages/update-listing";
import Listing from "./pages/listing";
import Search from "./pages/search";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/search" element={<Search />} />
        <Route path="/listings/:listingId" element={<Listing />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route
            path="/update-listing/:listingId"
            element={<UpdateListing />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
