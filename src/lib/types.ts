interface BaseSchema {
  id: string;
  createdAt: string;
  updatedAt: string;
}

interface ApiMetaData {
  totalCount: number;
  totalPages: number;
  page: number;
  pageSize: number;
}

interface ApiResponse<T={}> {
  data?: T;
  message: string;
  success: boolean;
}

interface _Count {
  groups: number;
  members: number;
  events: number;
  topics: number;
  followedByUsers:number;
}
interface Location extends BaseSchema {
  lat: number;
  lon: number;
  city: string;
  state: string;
  country: string;
  timezone: string;
  _count: Pick<_Count, "groups">;
}

interface User extends BaseSchema {
  name: string;
  profilePhoto: string;
  role: "User" | "Admin";
}

interface Topic extends BaseSchema {
  name: string;
  user: Pick<User, "id" | "name">;
  isActive: boolean;
  categoryId: string;
  slug:string;
  _count: Pick<_Count, "groups"|"events"|"followedByUsers">;
}

interface Group extends BaseSchema {
  location: Location;
  topics: Pick<Topic, "id" | "name" | "isActive">[];
  name: string;
  description: string;
  admin: Pick<User, "id" | "name">;
  _count: Pick<_Count, "members">;
  network: Pick<Network, "id" | "name">;
}

interface Network extends BaseSchema {
  name: string;
  organization?: string | null;
  organizationUrl?: string | null;
  groupsCount: number;
  user: Pick<User, "id" | "name">;
}

interface Category extends BaseSchema {
  name: string;
  slug: string;
  topics:Topic[],
  _count: Pick<_Count, "events" | "groups">;
}


export type  DiscoverCategory = Pick<Category,"name"|"slug"|"topics"|"id">


export type {
  ApiMetaData,
  ApiResponse,
  Category,
  Group,
  Location,
  Network,
  Topic,
  User,
  _Count,
};
