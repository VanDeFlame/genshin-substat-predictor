import { Artifact } from "./artifact";

for (let index = 0; index < 5; index++) {
	console.group('\nRoll ' + index);

	let artifact = new Artifact(
    "EB", // mainStat
    { stat: "HPP", levels: ["max"] }, // SubStat1
    { stat: "ER", levels: ["max"] }, // SubStat2
    { stat: "CR", levels: ["high"] }, // SubStat3
    null  // no SubStat4
  )

	artifact.nextPhase() // 4
	artifact.nextPhase() // 8
	artifact.nextPhase() // 12
	artifact.nextPhase() // 16
	artifact.nextPhase() // 20

	console.log(artifact.toString())

	console.groupEnd();
}