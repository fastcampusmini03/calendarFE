export const getBearerToken = (bearerToken: string | null) => {
    if (!bearerToken) return "";
  
    return bearerToken.split(" ")[1];
  };
  
  export const createBearerToken = (token: string) => {
    return `Bearer ${token}`;
  };
  