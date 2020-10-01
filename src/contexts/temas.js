import React, { createContext, useState, useEffect } from "react";
import { AsyncStorage, Alert, ToastAndroid } from "react-native";

export const TemasContext = createContext({});

function TemasProvider({ children }) {
  const [tema, setTema] = useState("#cc0000");

  useEffect(() => {
    async function load() {
      await AsyncStorage.getItem("@icheff:tema").then((resp) => {
        if (!!resp) setTema(resp);
      });
    }

    load();
  }, []);

  async function trocar(cor) {
    try {
      await AsyncStorage.setItem("@icheff:tema", cor);
      setTema(cor);
      ToastAndroid.show("O tema foi alterado.", ToastAndroid.SHORT);
    } catch (err) {
      ToastAndroid.show("Erro ao resgatar tema.", ToastAndroid.SHORT);
    }
  }

  return (
    <TemasContext.Provider value={{ tema, trocar }}>
      {children}
    </TemasContext.Provider>
  );
}

export default TemasProvider;
