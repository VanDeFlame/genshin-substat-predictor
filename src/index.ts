import { Artifact } from "./model/artifact";
import { Ranges } from "./data/substats";
import { Types } from "./data/artifacts";


for (let index = 0; index < 5; index++) {
	console.group('\nRoll ' + index);

	const artifact = new Artifact(
		Types.Circlet,
    "CRIT DMG%", // mainStat
    [
			{ stat: "HP", range: Ranges.MEDIUM }, // SubStat1
			{ stat: "EM", range: Ranges.HIGH }, // SubStat2
			{ stat: "DEF", range: Ranges.HIGH }, // SubStat3
			{ stat: "HPFlat", range: Ranges.LOW }, // SubStat4
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