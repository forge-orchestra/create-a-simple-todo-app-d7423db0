import { LucideIcon } from 'lucide-react';

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthenticatedUser extends User {
  token: string;
}

export interface UserProfileProps {
  user: User;
  onLogout: () => void;
}

export interface UserIconProps {
  user: User;
  icon: LucideIcon;
}