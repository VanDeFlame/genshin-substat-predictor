import { statFormatter } from "../formatters/statFormatter";

test("formats percents correctly", () => {
	/* SUBSTATS */
	// ATK%
  expect(statFormatter(4.08, false)).toBe("4.1%");
  expect(statFormatter(4.66, false)).toBe("4.7%");
  expect(statFormatter(5.25, false)).toBe("5.3%");
  expect(statFormatter(5.83, false)).toBe("5.8%");

	// ATK
  expect(statFormatter(13.62, true)).toBe("14");
  expect(statFormatter(15.56, true)).toBe("16");
  expect(statFormatter(17.51, true)).toBe("18");
  expect(statFormatter(19.45, true)).toBe("19");

	// Elemental Mastery
  expect(statFormatter(16.32, true)).toBe("16");
  expect(statFormatter(18.65, true)).toBe("19");
  expect(statFormatter(20.98, true)).toBe("21");
  expect(statFormatter(23.31, true)).toBe("23");

	// Energy Recharge
  expect(statFormatter(4.53, false)).toBe("4.5%");
  expect(statFormatter(5.18, false)).toBe("5.2%");
  expect(statFormatter(5.83, false)).toBe("5.8%");
  expect(statFormatter(6.48, false)).toBe("6.5%");

	// Crit DMG
  expect(statFormatter(5.44, false)).toBe("5.4%");
  expect(statFormatter(6.22, false)).toBe("6.2%");
  expect(statFormatter(6.99, false)).toBe("7.0%");
  expect(statFormatter(7.77, false)).toBe("7.8%");
});
