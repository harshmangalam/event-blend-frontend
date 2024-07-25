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