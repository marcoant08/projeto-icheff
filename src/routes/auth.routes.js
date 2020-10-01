import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../pages/Login";
import CriarConta from "../pages/CriarConta";
import RecuperarSenha from "../pages/RecuperarSenha";
import EscolherLogin from "../pages/EscolherLogin";

const AuthStack = createStackNavigator();

function AuthRoutes() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Escolher Login" component={EscolherLogin} />
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="CriarConta" component={CriarConta} />
      <AuthStack.Screen
        name="RecuperarSenha"
        component={RecuperarSenha}
        options={{ animationEnabled: false }}
      />
    </AuthStack.Navigator>
  );
}

export default AuthRoutes;
