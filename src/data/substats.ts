import { Substat } from "../model/substat";
import { Stats } from "./stats";

// List of possible substat ranges
export enum Ranges {
	LOW 		= "low",
	MEDIUM 	= "medium",
	HIGH 		= "high",
	MAX 		= "max"
}

export const Substats = {
	// 										name						low				medium		high			max				(not %)
	HPFlat: 	new Substat(Stats.HPFlat, 	209.13, 	239.00, 	268.88, 	298.75, 	true),
  HP: 			new Substat(Stats.HP, 			4.08, 		4.66, 		5.25, 		5.83, 		false),
  ATKFlat: 	new Substat(Stats.ATKFlat, 	13.62, 		15.56, 		17.51, 		19.45, 		true),
  ATK: 			new Substat(Stats.ATK, 			4.08, 		4.66, 		5.25, 		5.83, 		false),
  DEFFlat:	new Substat(Stats.DEFFlat, 	16.20, 		18.52, 		20.83, 		23.15, 		true),
  DEF:			new Substat(Stats.DEF, 			5.10, 		5.83, 		6.56, 		7.29, 		false),
  EM: 			new Substat(Stats.EM, 			16.32, 		18.65, 		20.98, 		23.31, 		true),
  ER: 			new Substat(Stats.ER, 			4.53, 		5.18, 		5.83, 		6.48, 		false),
  CR: 			new Substat(Stats.CR, 			2.72, 		3.11, 		3.50, 		3.89, 		false),
  CD: 			new Substat(Stats.CD, 			5.44, 		6.22, 		6.99, 		7.77, 		false)
};

// Orden of substats
export const SUBSTATS_ORDER = [
	"DEFFlat", 	// 0
	"DEF", 			// 1
	"HPFlat", 	// 2
	"HP", 			// 3
	"ATKFlat", 	// 4
	"ATK", 			// 5
	"ER", 			// 6
	"EM", 			// 7
	"CR", 			// 8
	"CD", 			// 9
];

// Base chance of upgrade the substat slot by ascension
// 1st  	2nd     3rd			4th
export const SUBSTATS_PROBABILITY = [
	[0.1, 	0.4, 		0.25, 	0.25], 	// LVL 4
	[0.15, 	0.35, 	0.35, 	0.15], 	// LVL 8
	[0.325, 0.225, 	0.225, 	0.225], // LVL 12
	[0.225, 0.225, 	0.225, 	0.325], // LVL 16
	[0.7, 	0.1, 		0.1, 		0.1], 	// LVL 20
];
