function ChunkArray<T>(array: T[], size: number): T[][] {
  let result : T[][] = [];
  for (let i = size; i > 0; i--) {
    result.push(array.splice(0, Math.floor(array.length / i)));
  }
  return result;
}

export {ChunkArray};