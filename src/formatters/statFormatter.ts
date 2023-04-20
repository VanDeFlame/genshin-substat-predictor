export function statFormatter(value: number, isFlat: boolean): string {
	if (isFlat) {
		return `${Math.round(value)}`;
	} else {
		return `${(Math.round(value * 10) / 10).toFixed(1)}%`
	}
}