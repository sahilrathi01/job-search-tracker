export type Job = {
  id: string
  salary: number
  company: string
  title: string
  type: 'Full-time' | 'Part-time' | 'Shift' | 'Contract' | string
  location: {
    lat: number
    lon: number
  }
  distanceKm: number
}
