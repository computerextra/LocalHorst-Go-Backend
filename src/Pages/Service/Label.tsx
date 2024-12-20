import { AuthPage } from "@/components/AuthPage";
import BackButton from "@/components/BackButton";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { syncLabel } from "@/db/Service";
import { useState } from "react";

export default function Label() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const sync = async () => {
    setLoading(true);
    const res = await syncLabel();
    if (res.error != "false") {
      setError(res.error);
      return;
    } else {
      setLoading(false);
      setError("Daten erfolgreich synchronisiert");
    }
  };
  return (
    <AuthPage>
      <>
        <BackButton href="/" />
        <h1 className="mt-8 mb-8">Label Sync</h1>
        {loading && <LoadingSpinner />}
        {error == null && !loading && (
          <Button onClick={sync}>Sync Label</Button>
        )}
        {error != null && (
          <h2 className="text-5xl font-bold text-red-600">{error}</h2>
        )}
      </>
    </AuthPage>
  );
}
