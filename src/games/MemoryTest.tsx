import { useState, type FormEvent } from 'react';
import { Check } from 'lucide-react';
import { AnswerDiff } from '../components/AnswerDiff';
import { Button } from '../components/Button';
import { Actions, Feedback, FieldLabel, TextArea } from '../components/ui';
import { errorReaction } from '../data/compliments';
import { compareWords, words } from '../utils/textComparison';

export function MemoryTest({ line, onAnswer }: { line: string; onAnswer: (correct: boolean) => void }) {
  const [input, setInput] = useState('');
  const [attempt, setAttempt] = useState(0);
  const [result, setResult] = useState<ReturnType<typeof compareWords>>();

  function check(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (words(input).length === 0) return;
    const compared = compareWords(words(line), words(input));
    setResult(compared);
    setAttempt(attempt + 1);
    onAnswer(compared.correct);
  }

  return (
    <form onSubmit={check}>
      <FieldLabel htmlFor="memory">ВВЕДИ ВСЮ СТРОКУ ПО ПАМЯТИ</FieldLabel>
      <TextArea id="memory" value={input} placeholder="Строка начинается здесь…" rows={3}
        spellCheck={false} autoComplete="off" autoCapitalize="off" aria-invalid={result && !result.correct}
        onChange={(event) => { setInput(event.target.value); setResult(undefined); }} />
      {result && !result.correct && <Feedback role="status">{errorReaction(attempt - 1)} Проверь выделенные места.
        <AnswerDiff edits={result.edits} />
      </Feedback>}
      <Actions><Button type="submit" disabled={words(input).length === 0}><Check size={18} /> ЗАСЧИТАТЬ ЧИТКУ</Button></Actions>
    </form>
  );
}
