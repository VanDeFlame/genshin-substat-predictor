import { Types } from "../data/artifacts";
import { Stats } from "../data/stats";
import { Substats, SUBSTATS_ORDER, Ranges, SUBSTATS_PROBABILITY } from "../data/substats";
import { statFormatter } from "../formatters/statFormatter";

type SubStat = {
  stat: string;
  levels: string[];
};

type StatKey = keyof typeof Stats;
type SubstatKey = keyof typeof Substats;

class Artifact {
	private _type: Types;
	private _rolls = 0;
  private _mainStat: string;
  private _subStats: SubStat[];
  private _prevSubstat = -1;

	constructor(
		type: Types,
		mainStat: string,
    subStats: {stat: string, range: Ranges}[]
	) {
    this._type = type;
		this._mainStat = mainStat;
		this._subStats = subStats
			.filter(sub => sub !== null)
			.map((sub) => ({
				stat: sub.stat,
				levels: [sub.range]
			}));
	}

	/* Getters */
	public get rolls() {
    return this._rolls;
  }
	
  get type() {
    return this._type;
  }

  get mainStat() {
    return Stats[this._mainStat as StatKey];
  }

  get subStats() {
    return this._subStats;
  }

	getSubstatValue(slot: number): number {		
		const substat = this._subStats[slot - 1];
		if (substat === undefined) return 0;

		const stat = Substats[substat.stat as SubstatKey];

		// Get the stat value. Sum the value of each range.
		const value = substat.levels.reduce((acc, range) => {
			return acc + stat.getRange(range);
		}, 0);

		return value;
	}

	/* "RNG" logic */
	public nextRoll() {
		this._rolls++;

		if (this.subStats.length === 3) {
			// Add a 4th substat
			const newStat = this.generateFourStat();
			this._subStats.push(newStat);
			this._prevSubstat = 3;
    } else {
			// Add a lvl to a existent substat
			const index = this.calcSubstatToLvl(this.rolls);
      this.addStatLvl(index, this.calcStatRange());
    }
  }	
	
	private calcStatRange(): string {
		const index = Math.floor(Math.random() * 4);
		return Object.values(Ranges)[index];
	}

	/* Substat lvl */
	private calcSubstatToLvl(rolls: number): number {
		// Calculate the base probabilities based on the rolls
		const probabilities = SUBSTATS_PROBABILITY[rolls - 1];
		
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
		if (lastRange === Ranges.MAX) {
			return [iPrev, 0.25];
		}

		// high range
		if (lastRange === Ranges.HIGH) {
			return [iPrev, 0.15];
		}

		return [-1, 0]
	}

	private addStatLvl(subStatIndex: number, range: string) {
    const subStat = this._subStats[subStatIndex];
    subStat.levels.push(range);

		console.log(`lvl: ${this.rolls * 4} - ${subStat.stat} - ${range}`)

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

		console.log(`lvl: ${this.rolls * 4} - ${fourSubstat.stat} - ${range}`)
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
				index += 1;
				continue;
			}
			
			// If the substat already exists in any of the first three substats, index +1
			if (this.subStats.some(stat => stat.stat === selectedStat)) {
				index += 1;
				continue;
			}

			/* 75% succeed */
			if(Math.random() < 0.75) {
				isSuccess = true;
			}

			/* 25% next */
			// If the first or second substat has range "max", index +3
			if (this.subStats[0].levels[0] === "max" || this.subStats[0].levels[0] === "max") {
				index += 3;
				continue;
			}
			
			// If the mainstat is "BE" or "BF", index +4
			if ((this.mainStat === Stats.Elemental || this.mainStat === Stats.Physical)) {
				index += 4;
				continue;
			}
			
			// Regular situation, index +1
			index += 1;
		} while (!isSuccess);

		return index % 10;
	}

	/* Formatters */
	public subtatToString(index: number): string {
		const substat = this._subStats[index];
		if (substat === undefined) return "";

		const stat = Substats[substat.stat as SubstatKey];
		const value = this.getSubstatValue(index+1)
		return `${stat.name} - ${statFormatter(value, stat.isFlat)} // ${substat.levels.join("-")}`
	}

	public toString(): string {
		return `\nArtifact`
			+ `\n\tLvl: ${this.rolls * 4}`
			+ `\n\tMain Stat: ${this.mainStat}`
			+ `\n\t- ${this.subtatToString(0)}`
			+ `\n\t- ${this.subtatToString(1)}`
			+ `\n\t- ${this.subtatToString(2)}`
			+ `\n\t- ${this.subtatToString(3)}`;
	}
}

export { Artifact }