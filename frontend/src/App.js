import "./App.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { darkTheme } from "./Theme/DarkTheme";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./State/Authentication/Action";
import { findCart } from "./State/Cart/Action";
import Routers from "./Routers/Routers";
import { getRestaurantByUserId } from "./State/Restaurant/Action";

function App() {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const auth = useSelector((store) => store.auth); // ✅ correct

  useEffect(() => {
    if (auth.jwt || jwt) {
      dispatch(getUser(auth.jwt || jwt));
      dispatch(findCart(auth.jwt || jwt));
    }
  }, [auth.jwt,jwt,dispatch]); // ✅ add jwt as dependency

  useEffect(()=>{
    dispatch(getRestaurantByUserId(auth.jwt || jwt));
  },[auth.user,auth.jwt,dispatch,jwt])

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Routers/>
    </ThemeProvider>
  );
}

export default App;
