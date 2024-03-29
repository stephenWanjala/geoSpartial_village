export interface SubCounty {
  id: number;
  name: string;
  code: string;
  org_id: string;
  parent_id: string;
  level_id: number;
  supervisor: string;
  latitude?: number; // Optional latitude property
  longitude?: number; // Optional longitude property
}

export interface GoogleApiResponse {
  results: {
    geometry: {
      location: {
        lat: number;
        lng: number;
      };
    };
  }[];
}