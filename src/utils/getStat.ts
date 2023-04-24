import { Stats } from "../data/stats";
import { Substats } from "../data/substats";

type SubstatKey = keyof typeof Substats;
type StatsKey = keyof typeof Stats;

export function getSubstat(substat: string) {
	return Substats[substat as SubstatKey];
}

export function getSubstatName(substat: string) {
	return Substats[substat as SubstatKey]?.name || substat;
}

export function getStatKeyByName(stat: string) {
	const statKey = Object.keys(Stats).find((key) => Stats[key as StatsKey] === stat);
  return statKey || stat;
} 