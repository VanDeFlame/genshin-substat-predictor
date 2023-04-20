import { Artifact } from "./model/artifact";
import { Ranges, Substats } from "./data/substats";
import { statFormatter } from "./formatters/statFormatter";
import { Stats } from "./data/stats";
import { Types } from "./data/artifacts";


for (let index = 0; index < 5; index++) {
	console.group('\nRoll ' + index);

	// let artifact = new Artifact(
	//	 Types.Goblet
  //   "Elemental", // mainStat
  //   { stat: "HP", levels: [Ranges.MAX] }, // SubStat1
  //   { stat: "ER", levels: [Ranges.MAX] }, // SubStat2
  //   { stat: "CR", levels: [Ranges.HIGH] }, // SubStat3
  //   // no SubStat4
  // )
	const artifact = new Artifact(
		Types.Goblet,
    "Elemental", // mainStat
    [
			{ stat: "HPFlat", range: Ranges.MAX }, // SubStat1
			{ stat: "DEF", range: Ranges.MAX }, // SubStat2
			{ stat: "CD", range: Ranges.HIGH }, // SubStat3
			// no SubStat4
		]
  )

	artifact.nextRoll() // LVL 4
	artifact.nextRoll() // LVL 8
	artifact.nextRoll() // LVL 12
	artifact.nextRoll() // LVL 16
	artifact.nextRoll() // LVL 20

	console.log(artifact.toString())

	console.groupEnd();
}

// console.log(
// 	statFormatter(
// 		Substats.ATK.getRange(Ranges.LOW),
// 		Substats.ATK.isFlat
// 	)
// )

// console.log(
// 	statFormatter(
// 		Substats.EM.getRange(Ranges.LOW),
// 		Substats.EM.isFlat
// 	)
// )