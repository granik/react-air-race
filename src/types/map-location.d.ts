import type { Coordinates, LocationId } from './locations'

export interface MapLocation {
  id: LocationId
  title: string
  description: string
  coordinates: Coordinates
}
