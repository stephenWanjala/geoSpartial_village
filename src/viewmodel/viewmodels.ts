// viewmodels/viewModel.ts
import axios from 'axios';
import { API_KEY, BEARER_TOKEN } from '@/main'
import { type GoogleApiResponse, type Village } from '@/types/types'



export async function fetchVillages(): Promise<Village[]> {
  try {
    const response = await axios.get('https://training.digimal.uonbi.ac.ke/api/get_sub_counties_list?parent_id=OU314032', {
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`
      }
    });

    const villages: Village[] = response.data.message;

    // Fetch coordinates for each sub-county and store them along with org_id
    for (const subCounty of villages) {
      const locationData = await fetchCoordinates(subCounty.name);
      if (locationData?.latitude !== undefined && locationData?.longitude !== undefined) {
        subCounty.latitude = locationData.latitude;
        subCounty.longitude = locationData.longitude;
      }
    }

    return villages;
  } catch (error) {
    throw new Error((error as Error).message || 'An error occurred');
  }
}

async function fetchCoordinates(address: string): Promise<{ latitude: number; longitude: number } | null> {
  try {
    const response = await axios.get<GoogleApiResponse>(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(`Kenya,Homabay,${address}`)}&key=${API_KEY}`
    );

    const location = response.data.results[0]?.geometry?.location;
    console.log('Location:', location)
    if (location) {
      return { latitude: location.lat, longitude: location.lng };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching coordinates:', error);
    return null;
  }
}
