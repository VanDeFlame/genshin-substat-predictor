import { Stats } from "./stats";

export enum Types {
  Flower = "Flower of Life",
  Plume = "Plume of Death",
  Sands = "Sands of Eon",
  Goblet = "Goblet of Eonothem",
	Circlet = "Circlet of Logos",
}

export const allowedMainStats: Record<Types, Stats[]> = {
  [Types.Flower]: [
		Stats.HPFlat
	],
  [Types.Plume]:	[
		Stats.ATKFlat
	],
  [Types.Sands]: 	[
		Stats.HP,
		Stats.ATK,
		Stats.DEF,
		Stats.ER,
		Stats.EM
	],
  [Types.Goblet]: [
    Stats.HP,
    Stats.ATK,
    Stats.DEF,
    Stats.EM,
    Stats.Elemental,
    Stats.Physical,
  ],
  [Types.Circlet]: [
    Stats.HP,
    Stats.ATK,
    Stats.DEF,
    Stats.EM,
    Stats.HB,
    Stats.CR,
    Stats.CD,
  ],
};