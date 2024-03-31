import axios from 'axios'
import type { Pagination, Village } from '@/types/types'
import { API_KEY } from '@/main'
import { fetchToken } from '@/viewmodel/Api'


async function fetchCoordinates(address: string): Promise<{ latitude: number; longitude: number } | null> {


  try {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API_KEY}`)
    const location = response.data.results[0]?.geometry?.location
    if (location) {
      return { latitude: location.lat, longitude: location.lng }
    } else {
      return null
    }
  } catch (error) {
    console.error('Error fetching coordinates:', error)
    return null
  }
}
export async function fetchVillages(page: number, county_id: number): Promise<{
  villages: Village[];
  pagination: Pagination
}> {


  try {
    const token = await fetchToken()
    const response = await axios.get(`https://training.digimal.uonbi.ac.ke/api/administrative_unit?county_id=${county_id}&page=${page}`,{
      headers: {
        Authorization: `Bearer ${token}`
      }

    })

    const data = response.data
    const villages: Village[] = data.data

    // Fetch coordinates for each village and store them
    for (const village of villages) {
      const coordinates = await fetchCoordinates(`${village.village}, ${village.sublocation}, ${village.location}, ${village.subcounty}, ${village.county}, Kenya`)
      if (coordinates) {
        console.log('Coordinates:', coordinates)
        village.latitude = coordinates.latitude
        village.longitude = coordinates.longitude
      }
    }

    const pagination: Pagination = data.pagination

    return { villages, pagination }
  } catch (error) {
    throw new Error((error as Error).message || 'An error occurred')
  }
}

