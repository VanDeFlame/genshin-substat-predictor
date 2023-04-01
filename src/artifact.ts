import { SUBSTATS_ORDER, SUBSTAT_RANGES, substats } from "./substats";

type SubStat = {
  stat: string;
  levels: string[];
};

class Artifact {
	private _phase: number = 0;
  private _mainStat: string;
  private _subStats: SubStat[];
  private _prevSubstat: number = -1;

	constructor(
    mainStat: string,
    sub1: SubStat,
    sub2: SubStat,
    sub3: SubStat,
    sub4: SubStat | null
  ) {
		this._phase = 0;
    this._mainStat = mainStat;
    this._subStats = [
      sub1,
      sub2,
      sub3,
    ];

		if (sub4) this._subStats.push(sub4);
	}

	/* Getters */
	get phase() {
    return this._phase;
  }

  get mainStat() {
    return this._mainStat;
  }

  get subStats() {
    return this._subStats;
  }

	/* "RNG" logic */
	public nextPhase() {
		this._phase++;

		if (this.subStats.length === 3) {
			// Add a 4th substat
			const newStat = this.generateFourStat();
			this._subStats.push(newStat);
			this._prevSubstat = 3;
    } else {
			// Add a lvl to a existent substat
			const index = this.calcSubstatToLvl(this.phase);
      this.addStatLvl(index, this.calcStatRange());
    }
  }	
	
	private calcStatRange(): string {
		const index = Math.floor(Math.random() * 4);
		return SUBSTAT_RANGES[index];
	}

	/* Substat lvl */
	private calcSubstatToLvl(phase: number): number {
		// Calculate the base probabilities for each substat based on the phase
		const baseProbabilities = [
			[0.1, 0.4, 0.25, 0.25], // Phase 1
			[0.15, 0.35, 0.35, 0.15], // Phase 2
			[0.325, 0.225, 0.225, 0.225], // Phase 3
			[0.225, 0.225, 0.225, 0.325], // Phase 4
			[0.7, 0.1, 0.1, 0.1], // Phase 5
		];
		
		// Apply the base probabilities for the given phase
		let probabilities = baseProbabilities[phase - 1];
		
		// Apply the bonus probabilities based on the previous substat level
		const [prevIndex, prevProbability] = this.getPreviousSubstatProbability();
		if (prevIndex !== -1) {
			probabilities[prevIndex-1] += prevProbability
		}

		return this.rollForSubstat(probabilities);
	}
	
	private rollForSubstat(probabilities: number[]): number {
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

	private getPreviousSubstatProbability() {
		const iPrev = this._prevSubstat;
		if (iPrev === -1) return [iPrev, 0];
		
		const prevSub = this._subStats[iPrev];
		if (prevSub === undefined) return [-1, 0];

		const iRange = prevSub.levels.length - 1
		const lastRange = prevSub.levels[iRange];

		// max range
		if (lastRange === SUBSTAT_RANGES[3]) {
			return [iPrev, 0.25];
		}

		// high range
		if (lastRange === SUBSTAT_RANGES[2]) {
			return [iPrev, 0.15];
		}

		return [-1, 0]
	}

	private addStatLvl(subStatIndex: number, range: string) {
    const subStat = this._subStats[subStatIndex];
    subStat.levels.push(range);

		console.log(`lvl: ${this.phase * 4} - ${subStat.stat} - ${range}`)

		this._prevSubstat = subStatIndex;
  }

	/* 4th Substat */
	public generateFourStat(): SubStat {
		let index = this.getInitialIndex(this.subStats);
		index = this.calcProbabilities(index);

		const range = this.calcStatRange();
		const fourSubstat: SubStat = {
			stat: SUBSTATS_ORDER[index],
			levels: [range]
		};

		console.log(`lvl: ${this.phase * 4} - ${fourSubstat.stat} - ${range}`)
		return fourSubstat;
	}

	private getInitialIndex(subStats: SubStat[]): number {
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

	private calcProbabilities(firstIndex: number): number {
		let isSuccess = false;
		let index = firstIndex;

		do {
			const selectedStat = SUBSTATS_ORDER[index];

			/* Duplicated */
			// If the mainstat is the same as the substat, index +1
			if (this.mainStat === selectedStat) {
				index + 1;
				continue;
			}
			
			// If the substat already exists in any of the first three substats, index +1
			if (this.subStats.some(stat => stat.stat === selectedStat)) {
				index + 1;
				continue;
			}

			/* 75% succeed */
			if(Math.random() < 0.75) {
				isSuccess = true;
			}

			/* 25% next */
			// If the first or second substat has range "max", index +3
			if (this.subStats[0].levels[0] === "max" || this.subStats[0].levels[0] === "max") {
				index + 3;
				continue;
			}
			
			// If the mainstat is "BE" or "BF", index +4
			if ((this.mainStat === "BE" || this.mainStat === "BF")) {
				index + 4;
				continue;
			}
			
			// Regular situation, index +1
			index + 1;
		} while (!isSuccess);
		
		return index;
	}

	/* Formatters */
	public subtatToString(index: number): string {
		const substat = this._subStats[index];
		if (substat === undefined) return "";

		type StatKey = keyof typeof substats;
		const stat = substats[substat?.stat as StatKey];
		
		const value = substat.levels.reduce((acc, range) => {
			return acc + stat.getRange(range);
		}, 0);

		return `${stat.name} - ${Math.round(value * 10) / 10} // ${substat.levels.join("-")}`
	}

	public toString(): string {
		return `\nArtifact`
			+ `\n\tLvl: ${this.phase * 4}`
			+ `\n\tMain Stat: ${this._mainStat}`
			+ `\n\t- ${this.subtatToString(0)}`
			+ `\n\t- ${this.subtatToString(1)}`
			+ `\n\t- ${this.subtatToString(2)}`
			+ `\n\t- ${this.subtatToString(3)}`;
	}
}

export { Artifact }