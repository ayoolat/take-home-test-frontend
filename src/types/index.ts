export interface JwtPayload {
  role: string;
  iss: string;
  aud: string;
  auth_time: number;
  user_id: string;
  sub: string;
  iat: number;
  exp: number;
  email: string;
  email_verified: boolean;
  firebase: Firebase;
}

export interface Firebase {
  identities: Identities;
  sign_in_provider: string;
}

export interface Identities {
  email: string[];
}

export interface PaginatedCompany {
  page: number;
  pageSize: number;
  totalCount: number;
  data: Company[];
}

export interface Company {
  id: number;
  name: string;
  usersCount: number;
  productsCount: number;
  percentage: number;
  image?: string;
}

export interface Image {
  type: string;
  data: number[];
}
