import { Stats } from "../data/stats";
import { SUBSTATS_ORDER } from "../data/substats";
import { artifactSubStat } from "../model/artifactSubstat";
import { getStatKeyByName } from "../utils/getStat";

export function generateFourStat(subStats: artifactSubStat[], mainStat: string): string {
	let index = getInitialIndex(subStats);
	let isSuccess = false;

	do {
		index = index % 10;
		const selectedStat = SUBSTATS_ORDER[index];

		/* Duplicated */
		// If the mainstat is the same as the substat, index +1
		if (getStatKeyByName(mainStat) === selectedStat) {
			index += 1;
			continue;
		}
		
		// If the substat already exists in any of the first three substats, index +1
		if (subStats.some(stat => stat.stat === selectedStat)) {
			index += 1;
			continue;
		}

		/* 75% succeed */
		if (Math.random() < 0.75) {
			isSuccess = true;
			continue;
		}

		/* 25% next */
		// If the first or second substat has range "max", index +3
		if (subStats[0].levels[0] === "max" || subStats[0].levels[0] === "max") {
			index += 3;
			continue;
		}
		
		// If the mainstat is "BE" or "BF", index +4
		if ((mainStat === Stats.Elemental || mainStat === Stats.Physical)) {
			index += 4;
			continue;
		}
		
		// Regular situation, index +1
		index += 1;
	} while (!isSuccess);

	return SUBSTATS_ORDER[index]; 
}

function getInitialIndex(subStats: artifactSubStat[]): number {
	// 55% of the time substat3 + 1 is selected
	if (Math.random() < 0.55) {
		return SUBSTATS_ORDER.indexOf(subStats[2].stat) + 1;
	}
	
	// 20% of the time a substat with range "max" + 1 is selected
	const maxIndexes = subStats
		.map((subStat, index) => subStat.levels[0] === "max" ? index : -1) // If it's not "max", we return -1 to discard it
		.filter(index => index !== -1); // Discard the -1 values

	if (maxIndexes.length > 0 && Math.random() < 0.2) {
		const randomIndex = maxIndexes[Math.floor(Math.random() * maxIndexes.length)];
		return SUBSTATS_ORDER.indexOf(
			SUBSTATS_ORDER[randomIndex]
		) + 1;
	}
	
	// 25% of the time any substat + 1 is selected
	const randomIndex = Math.floor(Math.random() * 3);
	const selectedSubStat = subStats[randomIndex];
	return SUBSTATS_ORDER.indexOf(selectedSubStat.stat) + 1;
}