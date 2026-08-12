export function FormErrorMessage({ errorMessage }: { errorMessage?: string }) {
  if (!errorMessage) return null;
  return <p className="text-red-500 text-sm my-1 mb-0 p-0">{errorMessage}</p>;
}
