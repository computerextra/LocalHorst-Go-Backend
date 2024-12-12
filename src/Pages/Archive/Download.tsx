import BackButton from "@/components/BackButton";
import LoadingSpinner from "@/components/LoadingSpinner";
import { getPdf } from "@/db/Archive";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useParams } from "react-router";

export default function Download() {
  const { filename } = useParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["ArchiveDownload", filename],
    queryFn: () => getPdf({ title: filename ?? "" }),
  });

  useEffect(() => {
    if (data == null) return;
    if (data == "Unable to open file") return;

    const link = document.querySelector("#PDFDownload") as HTMLLinkElement;
    if (link == null) return;

    link.href = "data:application/pdf;base64," + btoa(data);
  }, [data]);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <>Fehler!</>;

  return (
    <>
      <BackButton href="/Sage" />
      {data == "Unable to open file" ? (
        <p className="text-2xl text-destructive">Datei wurde nicht gefunden!</p>
      ) : (
        <iframe
          className="w-full min-h-[80vh]"
          src={`data:application/pdf;base64,` + data}
        ></iframe>
      )}
    </>
  );
}
