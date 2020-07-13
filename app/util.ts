export function randomId() {
  return Math.random().toString(36).substr(2, 8);
}

export function Range(start: number, end: number, step = 1): Array<number> {
  return Array(end - start).fill(null).reduce((result, _, i) => {
    return (i % step === 0) ? result.concat([i + start]) : result;
  }, []);
}

export function shuffle<T>(arr: Array<T>): Array<T> {
  const copy = [...arr];

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}
