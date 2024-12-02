import { LoaderPinwheel } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

export default function LoadingSpinner() {
  return (
    <Alert className="text-primary">
      <LoaderPinwheel className="w-6 h-6 animate-spin" />
      <AlertTitle>Laden ...</AlertTitle>
      <AlertDescription>Dieser Inhalt lädt gerade.</AlertDescription>
    </Alert>
  );
}
