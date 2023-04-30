export function splitArray<U>(inputArray: U[], maxElements: number): U[][] {
  const result: U[][] = [];
  for (let i = 0; i < inputArray.length; i += maxElements) {
    result.push(inputArray.slice(i, i + maxElements));
  }
  return result;
}
