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
