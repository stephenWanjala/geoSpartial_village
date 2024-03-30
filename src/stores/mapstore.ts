import { defineStore } from 'pinia';
import { fetchCounties, fetchAdministrativeUnitsByCounty } from '@/viewmodel/MapViewmodel';

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
        this.counties = counties;
      } catch (error) {
        console.error('Error fetching counties:', error);
        throw error;
      }
    },
    async fetchAdministrativeUnitsByCounty(countyId: number) {
      try {
        const administrativeUnits = await fetchAdministrativeUnitsByCounty(countyId); // Call the function from the view model
        this.administrativeUnits = administrativeUnits;
      } catch (error) {
        console.error('Error fetching administrative units:', error);
        throw error;
      }
    },
  },
});
