export function words(text: string) {
  return text.toLowerCase().replace(/ё/g, 'е').match(/[\p{L}\p{N}]+/gu) ?? [];
}

type Edit = { kind: 'correct' | 'wrong' | 'extra' | 'missing'; value: string };

export function compareWords(expected: string[], actual: string[]) {
  // Only one extra token is needed to prove an overlong answer is wrong.
  const displayed = actual.slice(0, expected.length * 2 + 1);
  const distance = Array.from({ length: expected.length + 1 }, () => Array<number>(displayed.length + 1).fill(0));
  for (let i = expected.length; i >= 0; i--) {
    for (let j = displayed.length; j >= 0; j--) {
      if (i === expected.length) distance[i][j] = displayed.length - j;
      else if (j === displayed.length) distance[i][j] = expected.length - i;
      else if (expected[i] === displayed[j]) distance[i][j] = distance[i + 1][j + 1];
      else distance[i][j] = 1 + Math.min(distance[i + 1][j + 1], distance[i + 1][j], distance[i][j + 1]);
    }
  }

  const edits: Edit[] = [];
  let i = 0;
  let j = 0;
  while (i < expected.length || j < displayed.length) {
    if (i < expected.length && j < displayed.length && expected[i] === displayed[j]) {
      edits.push({ kind: 'correct', value: displayed[j++] });
      i++;
    } else if (i < expected.length && j < displayed.length && distance[i][j] === 1 + distance[i + 1][j + 1]) {
      edits.push({ kind: 'wrong', value: displayed[j++] });
      i++;
    } else if (i < expected.length && distance[i][j] === 1 + distance[i + 1][j]) {
      edits.push({ kind: 'missing', value: 'пропуск' });
      i++;
    } else {
      edits.push({ kind: 'extra', value: displayed[j++] });
    }
  }
  if (displayed.length < actual.length) edits.push({ kind: 'extra', value: '…' });

  return {
    edits,
    correct: distance[0][0] === 0,
    errors: distance[0][0] + actual.length - displayed.length,
  };
}

export function compareFinal(expected: readonly string[], answer: string) {
  const actual = answer.split(/\r?\n/).map(words).filter((line) => line.length > 0);
  let total = 0;
  let errors = 0;
  const lines = Array.from({ length: Math.max(expected.length, actual.length) }, (_, index) => {
    const target = words(expected[index] ?? '');
    const result = compareWords(target, actual[index] ?? []);
    total += Math.max(target.length, actual[index]?.length ?? 0);
    errors += result.errors;
    return result;
  });
  return { lines, correct: errors === 0, accuracy: total ? Math.floor(100 * (total - errors) / total) : 100 };
}

export function shuffle<T>(values: readonly T[]): T[] {
  const copy = [...values];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
