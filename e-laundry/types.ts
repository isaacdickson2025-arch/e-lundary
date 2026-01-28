export type UserRole = 'customer' | 'delivery' | 'office' | 'admin' | null;

export enum ViewState {
  HOME = 'HOME',
  LOGIN_CUSTOMER = 'LOGIN_CUSTOMER',
  REGISTER_CUSTOMER = 'REGISTER_CUSTOMER',
  DASHBOARD_CUSTOMER = 'DASHBOARD_CUSTOMER',
  LOGIN_DELIVERY = 'LOGIN_DELIVERY',
  LOGIN_OFFICE = 'LOGIN_OFFICE',
  LOGIN_ADMIN = 'LOGIN_ADMIN',
}

export interface User {
  name: string;
  phone: string;
  role: UserRole;
}

export interface NavItem {
  label: string;
  icon: React.ElementType;
  action: ViewState;
}