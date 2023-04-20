class Substat {
  constructor(
    public readonly name: string,
    public readonly low: number,
    public readonly medium: number,
    public readonly high: number,
    public readonly max: number,
    public readonly isFlat: boolean,
  ) {}

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

export { Substat }