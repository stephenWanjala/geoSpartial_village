// viewmodels/subCountiesViewModel.ts
import axios from 'axios';
import { API_KEY, BEARER_TOKEN } from '@/main'
import { type SubCounty } from '@/types/types';

interface GoogleApiResponse {
  results: {
    geometry: {
      location: {
        lat: number;
        lng: number;
      };
    };
  }[];
}

export async function fetchSubCounties(): Promise<SubCounty[]> {
  try {
    const response = await axios.get('https://training.digimal.uonbi.ac.ke/api/get_sub_counties_list?parent_id=OU314032', {
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`
      }
    });

    const subCounties: SubCounty[] = response.data.message;

    // Fetch coordinates for each sub-county and store them along with org_id
    for (const subCounty of subCounties) {
      const locationData = await fetchCoordinates(subCounty.name);
      if (locationData?.latitude !== undefined && locationData?.longitude !== undefined) {
        subCounty.latitude = locationData.latitude;
        subCounty.longitude = locationData.longitude;
      }
    }

    return subCounties;
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
