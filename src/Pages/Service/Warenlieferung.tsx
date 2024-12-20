import { AuthPage } from "@/components/AuthPage";
import BackButton from "@/components/BackButton";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { generateWarenlieferung, sendWarenlieferung } from "@/db/Service";
import { useState } from "react";

export default function Warenlieferung() {
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const generate = async () => {
    setLoading(true);
    const res = await generateWarenlieferung();
    if (res.error != "false") {
      setError(res.error);
      return;
    } else {
      setGenerated(true);
      setLoading(false);
    }
  };

  const send = async () => {
    setLoading(true);
    const res = await sendWarenlieferung();
    if (res.error != "false") {
      setError(res.error);
      return;
    } else {
      setGenerated(false);
      setLoading(false);
      setError("Warenlieferung erfolgreich gesendet!");
    }
  };

  return (
    <AuthPage>
      <>
        <BackButton href="/" />
        <h1 className="mt-8 mb-8">Warenlieferung</h1>
        {loading && <LoadingSpinner />}
        {error == null && !loading && !generated && (
          <Button onClick={generate}>Warenlieferung generieren</Button>
        )}
        {error == null && generated && !loading && (
          <Button onClick={send}>Warenlieferung senden</Button>
        )}
        {error != null && (
          <h2 className="text-5xl font-bold text-red-600">{error}</h2>
        )}
      </>
    </AuthPage>
  );
}
