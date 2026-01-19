import type {User} from '../types/user.types';

export const getDashboardPath = (role: User['role']): string | null => {
  switch (role) {
    case 'admin':
    case 'superadmin':
      return '/admin';
    case 'manager':
      return '/property-manager';
    default:
      return null;
  }
};

