
import { z } from 'zod';
import prisma from './prisma';
import { hashSync, compareSync } from 'bcryptjs';

// Validation schemas
export const registerSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Format d'email invalide"),
  password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères"),
});

export const loginSchema = z.object({
  email: z.string().email("Format d'email invalide"),
  password: z.string().min(1, "Veuillez saisir votre mot de passe"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;

// Authentication functions
export async function registerUser(input: RegisterInput) {
  const { name, email, password } = input;
  
  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });
  
  if (existingUser) {
    throw new Error("Cet e-mail est déjà associé à un compte");
  }
  
  // Hash password
  const hashedPassword = hashSync(password, 10);
  
  // Create user
  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
    },
  });
  
  // Remove password from returned user object
  const { password: _, ...userWithoutPassword } = newUser;
  
  return userWithoutPassword;
}

export async function loginUser(input: LoginInput) {
  const { email, password } = input;
  
  // Find user
  const user = await prisma.user.findUnique({
    where: { email },
  });
  
  if (!user) {
    throw new Error("Email ou mot de passe incorrect");
  }
  
  // Check password
  const passwordValid = compareSync(password, user.password);
  
  if (!passwordValid) {
    throw new Error("Email ou mot de passe incorrect");
  }
  
  // Remove password from returned user object
  const { password: _, ...userWithoutPassword } = user;
  
  return userWithoutPassword;
}
