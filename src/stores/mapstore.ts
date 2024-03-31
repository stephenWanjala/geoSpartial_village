import { defineStore } from 'pinia'
import { fetchAdministrativeUnitsByCounty, fetchCounties } from '@/viewmodel/MapViewmodel'
import type { GoogleApiResponse } from '@/types/types'
import { API_KEY } from '@/main'

// Define the County interface
interface County {
  id: number;
  name: string;
  code: string;
  org_id: string;
  parent_id: string;
  level_id: number;
  supervisor: string;
}

// Define the AdministrativeUnit interface
interface AdministrativeUnit {
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

export const useCountyStore = defineStore({
  id: 'county',
  state: () => ({
    counties: [] as County[],
    administrativeUnits: [] as AdministrativeUnit[],
    loadingCoordinates: false,
    mError: null as string | null,
  }),
  actions: {
    async fetchCounties() {
      try {
        const counties = await fetchCounties();
        this.counties = counties;
      } catch (error) {
        console.error('Error fetching counties:', error);
        this.mError = (error as Error).message;
        throw error;
      }
    },
    async fetchAdministrativeUnitsByCounty(countyId: number) {
      try {
        let administrativeUnits = JSON.parse(localStorage.getItem(`adminUnits_${countyId}`) || '[]');
        if (administrativeUnits.length === 0) {
          this.loadingCoordinates = true;
          administrativeUnits = await fetchAdministrativeUnitsByCounty(countyId);
          for (const unit of administrativeUnits) {
            const address = `${unit.village}, ${unit.subcounty}, ${unit.county}`;
            const coordinates = await this.fetchCoordinates(address);
            unit.latitude = coordinates.lat;
            unit.longitude = coordinates.lng;
          }
          localStorage.setItem(`adminUnits_${countyId}`, JSON.stringify(administrativeUnits));
          this.loadingCoordinates = false;
        }
        this.administrativeUnits = administrativeUnits;
      } catch (error) {
        this.loadingCoordinates = false;
        throw error;
      }
    },
    async fetchCoordinates(address: string) {
      try {
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API_KEY}`);
        if (!response.ok) {
          this.mError = 'Failed to fetch coordinates';
          throw new Error('Failed to fetch coordinates');
        }
        const data: GoogleApiResponse = await response.json();
        return data.results[0].geometry.location;
      } catch (error) {
        console.error('Error fetching coordinates:', error);
        this.mError = (error as Error).message;
        throw error;
      }
    },
  },
});
