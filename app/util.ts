export function randomId() {
  return Math.random().toString(36).substr(2, 8);
}

export function Range(start: number, end: number, step = 1): Array<number> {
  return Array(end - start).fill(null).reduce((result, _, i) => {
    return (i % step === 0) ? result.concat([i + start]) : result;
  }, []);
}
