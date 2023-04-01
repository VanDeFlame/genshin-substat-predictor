class Stat {
  constructor(
    private readonly _name: string,
    private readonly _low: number,
    private readonly _medium: number,
    private readonly _high: number,
    private readonly _max: number
  ) {}

  get name(): string {
    return this._name;
  }

  get low(): number {
    return this._low;
  }

  get medium(): number {
    return this._medium;
  }

  get high(): number {
    return this._high;
  }

  get max(): number {
    return this._max;
  }

	public getRange(range: string): number {
		switch(range) {
			case "low": 		return this.low;
			case "medium": 	return this.medium;
			case "high": 		return this.high;
			case "max": 		return this.max;
			default:				return NaN;
		}
	}
}

const substats = {
  HP: new Stat("HP", 209.13, 239.00, 268.88, 298.75),
  ATK: new Stat("ATK", 13.62, 15.56, 17.51, 19.45),
  DEF: new Stat("DEF", 16.20, 18.52, 20.83, 23.15),
  HPP: new Stat("HP %", 4.08, 4.66, 5.25, 5.83),
  ATKP: new Stat("ATK %", 4.08, 4.66, 5.25, 5.83),
  DEFP: new Stat("DEF %", 5.10, 5.83, 6.56, 7.29),
  EM: new Stat("Elemental Mastery", 16.32, 18.65, 20.98, 23.31),
  ER: new Stat("Energy Recharge", 4.53, 5.18, 5.83, 6.48),
  CR: new Stat("Crit Rate", 2.72, 3.11, 3.50, 3.89),
  CD: new Stat("Crit Damage", 5.44, 6.22, 6.99, 7.77)
};

const SUBSTAT_RANGES = ["low", "medium", "high", "max"]

const SUBSTATS_ORDER = [
	"DEF", // 0
	"DEFP", // 1
	"HP", // 2
	"HPP", // 3
	"ATK", // 4
	"ATKP", // 5
	"ER", // 6
	"EM", // 7
	"CR", // 8
	"CD", // 9
];

export { substats, SUBSTAT_RANGES, SUBSTATS_ORDER };