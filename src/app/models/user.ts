export interface User {
  id: string;
  name: string;
  lastName: string;
  email: string;
  role: 'admin' | 'seller' | 'user';
  status: 'verified' | 'unverified' | 'suspended';
}
