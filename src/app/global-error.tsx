'use client';

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <html>
      <p>{error.message}</p>
      <button onClick={() => reset()}>読み込み直す</button>
    </html>
  );
}
