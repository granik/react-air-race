export type LocationId = string | number

export type Coordinates = [latitude: number, longitude: number]

export interface LocationItemState {
  hovered: boolean
  selected: boolean
}
