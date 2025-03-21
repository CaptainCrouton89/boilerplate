import { useSearchParams } from "next/navigation";

export function FormAlert() {
  const searchParams = useSearchParams();
  const success = searchParams.get("success");
  const error = searchParams.get("error");
  const message = searchParams.get("message");

  return (
    <div className="flex flex-col gap-2 w-full max-w-md text-sm">
      {success && (
        <div className="text-foreground border-l-2 border-foreground px-4">
          {success}
        </div>
      )}
      {error && (
        <div className="text-destructive border-l-2 border-destructive px-4">
          {error}
        </div>
      )}
      {message && (
        <div className="text-foreground border-l-2 px-4">{message}</div>
      )}
    </div>
  );
}
