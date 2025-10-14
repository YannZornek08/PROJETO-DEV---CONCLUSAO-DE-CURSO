import React, { useState, createContext, ReactNode, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../services/api";

type UserProps = {
  id: string;
  name: string;
  email: string;
  token: string;
};

type SignInProps = {
  email: string;
  password: string;
};

type AuthContextData = {
  user: UserProps | null;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;        // carregando sessão salva
  loadingAuth: boolean;    // carregando requisição de login
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingAuth, setLoadingAuth] = useState(false);

  const isAuthenticated = !!user;

  useEffect(() => {
    async function loadUserStorage() {
      try {
        const storedUser = await AsyncStorage.getItem("@costumerdata");

        if (storedUser) {
          const parsedUser: UserProps = JSON.parse(storedUser);
          setUser(parsedUser);

          // Define o token nas requisições
          api.defaults.headers.common["Authorization"] = `Bearer ${parsedUser.token}`;
        }
      } catch (err) {
        console.log("Erro ao carregar dados do usuário:", err);
      }

      setLoading(false);
    }

    loadUserStorage();
  }, []);

  async function signIn({ email, password }: SignInProps) {
    setLoadingAuth(true);

    try {
      // Chama o backend correto
      const response = await api.post("/session/costumers", { email, password });

      const { id, name, email: userEmail, token } = response.data;

      const data = { id, name, email: userEmail, token };

      // Salva os dados localmente
      await AsyncStorage.setItem("@costumerdata", JSON.stringify(data));

      // Define o token no axios
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      setUser(data);
    } catch (err) {
      console.log("Erro ao fazer login:", err);
    }

    setLoadingAuth(false);
  }

  async function signOut() {
    try {
      await AsyncStorage.removeItem("@costumerdata");
    } catch (err) {
      console.log("Erro ao sair:", err);
    } finally {
      setUser(null);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        signIn,
        signOut,
        loading,
        loadingAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
