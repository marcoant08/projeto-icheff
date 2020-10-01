import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "../pages/Home";
import Pesquisar from "../pages/Pesquisar";
import Favoritos from "../pages/Favoritos";
import Perfil from "../pages/Perfil";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Temas from "../pages/Temas";
import Sobre from "../pages/Sobre";
import CustomDrawer from "../components/CustomDrawer";
import Detalhes from "../pages/Detalhes";
import Avaliacoes from "../pages/Avaliacoes";
import Respostas from "../pages/Respostas";
import { TemasContext } from "../contexts/temas";
import OutroPerfil from "../pages/OutroPerfil";
import VerFoto from "../pages/VerFoto";
import NovaReceita from "../pages/NovaReceita";
import EditarReceita from "../pages/EditarReceita";
import EditarPerfil from "../pages/EditarPerfil";

const AppStack = createStackNavigator();
const AppTabs = createBottomTabNavigator();
const AppDrawer = createDrawerNavigator();

function Tabs() {
  const { tema } = useContext(TemasContext);

  return (
    <AppTabs.Navigator
      tabBarOptions={{
        style: {
          elevation: 0,
          height: 64,
        },
        tabStyle: {
          alignItems: "center",
          justifyContent: "center",
        },
        iconStyle: {
          flex: 0,
          width: 20,
          height: 20,
        },
        labelStyle: {
          fontFamily: "Arimo_400Regular",
          fontSize: 13,
          padding: 3,
        },
        inactiveBackgroundColor: "#fff",
        //activeBackgroundColor: "#ddd",
        inactiveTintColor: "#c1bccc",
        activeTintColor: tema,
      }}
    >
      <AppTabs.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Feed",
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <MaterialCommunityIcons
                name="home-outline"
                size={size}
                color={color}
              />
            );
          },
        }}
      />
      <AppTabs.Screen
        name="Pesquisar"
        component={Pesquisar}
        options={{
          tabBarLabel: "Pesquisar",
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <MaterialCommunityIcons
                name="magnify"
                size={size}
                color={color}
              />
            );
          },
        }}
      />
      <AppTabs.Screen
        name="Favoritos"
        component={Favoritos}
        options={{
          tabBarLabel: "Favoritos",
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <MaterialCommunityIcons
                name="heart-outline"
                size={size}
                color={color}
              />
            );
          },
        }}
      />
      <AppTabs.Screen
        name="Perfil"
        component={Perfil}
        options={{
          tabBarLabel: "Perfil",
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <MaterialCommunityIcons
                name="account-outline"
                size={size}
                color={color}
              />
            );
          },
        }}
      />
    </AppTabs.Navigator>
  );
}

function Drawer() {
  const { tema } = useContext(TemasContext);

  return (
    <AppDrawer.Navigator
      drawerContent={CustomDrawer}
      drawerContentOptions={{
        labelStyle: {
          fontSize: 16,
        },
        activeTintColor: tema,
      }}
      drawerType="slide"
    >
      <AppDrawer.Screen
        name="Tabs"
        component={Tabs}
        options={{
          drawerLabel: "Home",
          drawerIcon: ({ color, size, focused }) => {
            return (
              <MaterialCommunityIcons
                name="home-outline"
                size={size}
                color={color}
              />
            );
          },
        }}
      />
      <AppDrawer.Screen
        name="Temas"
        component={Temas}
        options={{
          drawerLabel: "Temas",
          drawerIcon: ({ color, size, focused }) => {
            return (
              <MaterialCommunityIcons
                name="palette"
                size={size}
                color={color}
              />
            );
          },
        }}
      />
    </AppDrawer.Navigator>
  );
}

function AppRoutes() {
  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      <AppStack.Screen name="Drawer" component={Drawer} />
      <AppStack.Screen name="Detalhes" component={Detalhes} />
      <AppStack.Screen
        name="Avaliacoes"
        component={Avaliacoes}
        options={{ animationEnabled: false }}
      />
      <AppStack.Screen
        name="Respostas"
        component={Respostas}
        options={{ animationEnabled: false }}
      />
      <AppStack.Screen name="OutroPerfil" component={OutroPerfil} />
      <AppStack.Screen
        name="VerFoto"
        component={VerFoto}
        options={{ animationEnabled: false }}
      />
      <AppStack.Screen name="NovaReceita" component={NovaReceita} />
      <AppStack.Screen name="EditarReceita" component={EditarReceita} />
      <AppStack.Screen name="EditarPerfil" component={EditarPerfil} />
    </AppStack.Navigator>
  );
}

export default AppRoutes;
