import { Types } from "../data/artifacts";
import { Ranges } from "../data/substats";
import { getSubstat } from "../utils/getStat";
import { statFormatter } from "../utils/statFormatter";
import { artifactSubStat } from "./artifactSubstat";

class Artifact {
	private readonly _type: Types;
	private _rolls = 0;
  private readonly _mainStat: string;
  private _subStats: artifactSubStat[];
  private _prevSubstat = -1;
  private readonly _isFull: boolean;

	constructor(
		type: Types,
		mainStat: string,
    subStats: {stat: string, range: Ranges}[]
	) {
    this._type = type;
		this._mainStat = mainStat;
		this._subStats = subStats
			.filter(sub => sub !== null)
			.filter(sub => sub.stat !== 'none')
			.map((sub) => ({
				stat: sub.stat,
				levels: [sub.range]
			}));
		
		this._isFull = (this._subStats.length === 4);
	}	

	/* Getters and Setters */
	get rolls() {
    return this._rolls;
  }

	private set rolls(jump: number) {
		if (jump < 0) return;
		if (jump > 5) return;
		this._rolls = jump;
	}
	
  get type(): Types {
    return this._type;
  }

  get mainStat(): string {
    return this._mainStat;
  }

  get prevSubstat(): number {
    return this._prevSubstat;
  }

	set prevSubstat(index: number) {
		if (index < -1) return;
		if (index > 3) return;
		this._prevSubstat = index;
	}

  get isFull(): boolean {
    return this._isFull;
  }

  get subStats(): artifactSubStat[] {
    return this._subStats;
  }

	get substatList(): string[] {
		return this.subStats.map(ss => ss.stat);
	}

	getLastRangeUpgrade(): string {
		if (this.prevSubstat === -1) return '';
		const prevSub = this.subStats[this.prevSubstat];
		if (!prevSub) return '';

		const iRange = prevSub.levels.length - 1
		return prevSub.levels[iRange];
	}

	public static getSubstatValue(substat: artifactSubStat): number {
		if (!substat) return 0;

		const stat = getSubstat(substat.stat);
		if (stat === undefined) return 0;

		// Get the stat value. Sum the value of each range.
		const value = substat.levels.reduce((acc, range) => {
			return acc + stat.getRange(range);
		}, 0);

		return value;
	}

	/* "RNG" logic */
	public nextRoll(substat: string, range: string) {
		this.rolls++;

		if (!this.isFull && this.rolls === 1) {
			// Add a 4th substat
			const newStat = {
				stat: substat,
				levels: [	Ranges[range as keyof typeof Ranges] ]
			}
			this._subStats.push(newStat);
			this.prevSubstat = 3;
    } else {
			// Add a lvl to a existent substat
			const subStatIndex = this.subStats.findIndex(ss => ss.stat === substat)
			const sub = this.subStats[subStatIndex];
			sub.levels.push(range);
	
			console.log(`lvl: ${this.rolls * 4} - ${sub.stat} - ${range}`)
			this.prevSubstat = subStatIndex;
    }
  }

	/* Formatters */
	public subtatToString(index: number): string {
		const substat = this.subStats[index];
		if (substat === undefined) return "";

		const stat = getSubstat(substat.stat);
		const value = Artifact.getSubstatValue(substat);
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