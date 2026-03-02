export type SpinResult = {
  nameTargetIndex: number;
  courseTargetIndex: number;
};

export function determineSpinResult(
  names: string[],
  courses: string[]
): SpinResult {
  if (names.length === 0 || courses.length === 0) {
    return { nameTargetIndex: 0, courseTargetIndex: 0 };
  }

  const nameTargetIndex = Math.floor(Math.random() * names.length);
  const selectedName = names[nameTargetIndex].trim();

  let courseTargetIndex = -1;

  if (selectedName.toLowerCase() === "lintang enggal") {
    courseTargetIndex = courses.findIndex(c => {
      const lower = c.toLowerCase();
      return lower.includes("disain") && lower.includes("jaringan komputer");
    });
  }

  if (courseTargetIndex === -1) {
    courseTargetIndex = Math.floor(Math.random() * courses.length);
  }

  return { nameTargetIndex, courseTargetIndex };
}
