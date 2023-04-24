import { Ranges, SUBSTATS_PROBABILITY } from "../data/substats";

export function calcSubstatToLvl(rolls: number, prevIndex: number, prevRange: string): number {
	// Calculate the base probabilities based on the rolls
	const probabilities = SUBSTATS_PROBABILITY[rolls - 1];
	
	// Apply the bonus probabilities based on the previous substat level
	if (prevIndex !== -1) {
		probabilities[prevIndex] += getPreviousSubstatProbability(prevRange)
	}

	return rollForSubstat(probabilities);
}

function rollForSubstat(probabilities: number[]): number {
	const rand = Math.random();
	let probSum = 0;

	for (let i = 0; i < probabilities.length; i++) {
		probSum += probabilities[i];

		if (rand < probSum) {
			return i;
		}
	}

	// This should never happen, but just in case
	return probabilities.length - 1;
}

function getPreviousSubstatProbability(lastRange: string) {
	// max range
	if (lastRange === Ranges.MAX) {
		return 0.25;
	}

	// high range
	if (lastRange === Ranges.HIGH) {
		return 0.15;
	}

	return 0;
}