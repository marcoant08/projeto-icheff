import React, { useContext } from "react";
import AuthRoutes from "./auth.routes";
import AppRoutes from "./app.routes";
import { AuthContext } from "../contexts/auth";
import { AppLoading } from "expo";

function Routes() {
  const { signed, loading } = useContext(AuthContext);

  if (loading) {
    return <AppLoading />;
  }

  return signed ? <AppRoutes /> : <AuthRoutes />;
}

export default Routes;
