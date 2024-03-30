// Define the County interface
import { BEARER_TOKEN } from '@/main'

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

// Fetch function to retrieve counties
export async function fetchCounties() {
  try {
    const response = await fetch('https://training.digimal.uonbi.ac.ke/api/get_org_unit_with_children?parent_id=HfVjCurKxh2', {
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`
      }
    });
    if (!response.ok) {
      throw new Error('Failed to fetch counties');
    }
    const data = await response.json();
    const counties: County[] = data.data;
    return counties;
  } catch (error) {
    console.error('Error fetching counties:', error);
    throw error;
  }
}

// Fetch function to retrieve administrative units by county
export async function fetchAdministrativeUnitsByCounty(countyId: number) {
  try {
    const response = await fetch(`https://training.digimal.uonbi.ac.ke/api/administrative_unit?county_id=${countyId}`, {
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`
      }
    });
    if (!response.ok) {
      throw new Error('Failed to fetch administrative units');
    }
    const data = await response.json();
    const administrativeUnits: AdministrativeUnit[] = data.data;
    return administrativeUnits;
  } catch (error) {
    console.error('Error fetching administrative units:', error);
    throw error;
  }
}




