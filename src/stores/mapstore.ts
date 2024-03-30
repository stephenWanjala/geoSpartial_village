import { defineStore } from 'pinia';
import { fetchCounties, fetchAdministrativeUnitsByCounty } from '@/viewmodel/MapViewmodel';
import  type { GoogleApiResponse } from '@/types/types';
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
  }),
  actions: {
    async fetchCounties() {
      try {
        const counties = await fetchCounties(); // Call the function from the view model
        console.log('Counties:', counties);
        this.counties = counties;
      } catch (error) {
        console.error('Error fetching counties:', error);
        throw error;
      }
    },
    async fetchAdministrativeUnitsByCounty(countyId: number) {
      try {
        const administrativeUnits = await fetchAdministrativeUnitsByCounty(countyId); // Call the function from the view model
        for (const unit of administrativeUnits) {
          const address = `${unit.village}, ${unit.subcounty}, ${unit.county}`;
          const coordinates = await this.fetchCoordinates(address);
          unit.latitude = coordinates.lat;
          unit.longitude = coordinates.lng;
          console.log("Administrative unit:", unit)
        }
        this.administrativeUnits = administrativeUnits;
        console.log('Administrative units:', administrativeUnits);
      } catch (error) {
        console.error('Error fetching administrative units:', error);
        throw error;
      }
    },
    async fetchCoordinates(address: string) {
      try {
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API_KEY}`);
        if (!response.ok) {
          throw new Error('Failed to fetch coordinates');
        }
        const data: GoogleApiResponse = await response.json();
        const coordinates = data.results[0].geometry.location;
        console.log('Coordinates:', coordinates);
        return coordinates;
      } catch (error) {
        console.error('Error fetching coordinates:', error);
        throw error;
      }
    },
  },
});