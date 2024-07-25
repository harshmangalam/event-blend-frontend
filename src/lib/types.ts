export type ApiMetaData = {
    totalCount: number;
    totalPages: number;
    page: number;
    pageSize: number;
  };

  export type ApiResponse<T={}> = {
    data?: T;
    message: string;
    success: boolean;
  }


  export type LoginResponse = {
    accessToken:string;
    refreshToken:string;
  }


  export type _Count = {
    groups: number;
    members: number;
  };

  export type User = {
    id: string;
    name: string;
    profilePhoto: string;
  };
  

  export type Location = {
    id: string;
    lat: number;
    lon: number;
    city: string;
    state: string;
    country: string;
    createdAt: string;
    updatedAt: string;
    timezone: string;
    _count: Pick<_Count, "groups">;
  };

  export type Topic = {
    id: string;
    name: string;
    user: Pick<User, "id" | "name">;
    isActive: boolean;
    _count: Pick<_Count, "groups">;
    createdAt: string;
    updatedAt: string;
  };

  export type Network = {
    id: string;
    name: string;
    organization?: string | null;
    organizationUrl?: string | null;
    groupsCount: number;
    user: Pick<User, "id" | "name">;
    createdAt: string;
    updatedAt: string;
  };
  

  export type Group = {
    id: string;
    location: Location;
    topics: Pick<Topic, "id" | "name" | "isActive">[];
    name: string;
    description: string;
    admin: Pick<User, "id" | "name">;
    _count: Pick<_Count, "members">;
    createdAt: string;
    updatedAt: string;
    network: Pick<Network, "id" | "name">;
  };