import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Email is required')
    .email('Please enter a valid email'),

  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

export const registerSchema = z.object({
  username: z
    .string()
    .trim()
    .min(1, 'Username is required')
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be at most 20 characters'),

  email: z
    .string()
    .trim()
    .min(1, 'Email is required')
    .email('Please enter a valid email'),

  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(50, 'Password must be at most 50 characters'),

  avatar: z
    .any()
    .optional()
    .refine(
      (file) =>
        !file ||
        !file.type ||
        ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(
          file.type,
        ),
      'Only JPG, PNG, or WEBP files are allowed',
    ),
});

export const resetPasswordSchema = z
  .object({
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });
