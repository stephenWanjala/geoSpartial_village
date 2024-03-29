export interface Village {
  id: number;
  org_id: string;
  parent_id: string;
  county: string;
  subcounty: string;
  ward: string;
  location: string;
  sublocation: string;
  village: string;
  county_id: number;
  subcounty_id: number;
  ward_id: number;
  location_id: number;
  sublocation_id: number;
  village_id: number;
  latitude?: number;
  longitude?: number;
}

export interface Pagination {
  current_page: number;
  total_pages: number;
  per_page: number;
  total: number;
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