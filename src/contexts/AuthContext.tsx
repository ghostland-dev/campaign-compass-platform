
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginInput, RegisterInput, loginUser, registerUser } from '@/lib/auth';
import { useToast } from '@/hooks/use-toast';
import { LogOut } from 'lucide-react';

type User = {
  id: string;
  email: string;
  name?: string | null;
  role: string;
  avatar?: string | null;
};

interface AuthContextType {
  user: User | null;
  loading: boolean;
  register: (data: RegisterInput) => Promise<void>;
  login: (data: LoginInput) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user', error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const register = async (data: RegisterInput) => {
    try {
      setLoading(true);
      const newUser = await registerUser(data);
      setUser(newUser as User);
      localStorage.setItem('user', JSON.stringify(newUser));
      toast({
        title: "Inscription réussie",
        description: "Votre compte a été créé avec succès.",
      });
      navigate('/');
    } catch (error) {
      toast({
        title: "Échec de l'inscription",
        description: error instanceof Error ? error.message : "Une erreur est survenue",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const login = async (data: LoginInput) => {
    try {
      setLoading(true);
      const loggedUser = await loginUser(data);
      setUser(loggedUser as User);
      localStorage.setItem('user', JSON.stringify(loggedUser));
      toast({
        title: "Connexion réussie",
        description: "Vous êtes maintenant connecté.",
      });
      navigate('/');
    } catch (error) {
      toast({
        title: "Échec de la connexion",
        description: error instanceof Error ? error.message : "Une erreur est survenue",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast({
      title: "Déconnexion",
      description: "Vous avez été déconnecté avec succès.",
    });
    navigate('/landing');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        register,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
