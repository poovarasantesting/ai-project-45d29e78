import { createContext, useContext, useState, ReactNode } from "react";
import toast from "react-hot-toast";

interface User {
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const isAuthenticated = !!user;

  const login = async (email: string, password: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you would validate credentials with a backend
      // For demo, we'll check against localStorage
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const userFound = users.find((u: any) => 
        u.email === email && u.password === password
      );
      
      if (!userFound) {
        toast.error("Invalid email or password");
        return false;
      }
      
      const userData = { name: userFound.name, email: userFound.email };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      toast.success("Logged in successfully!");
      return true;
    } catch (error) {
      toast.error("Login failed");
      return false;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you would send this data to your backend
      // For demo, we'll store in localStorage
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      
      if (users.some((u: any) => u.email === email)) {
        toast.error("Email already exists");
        return false;
      }
      
      users.push({ name, email, password });
      localStorage.setItem("users", JSON.stringify(users));
      
      // Auto login after registration
      const userData = { name, email };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      toast.success("Registration successful!");
      return true;
    } catch (error) {
      toast.error("Registration failed");
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}