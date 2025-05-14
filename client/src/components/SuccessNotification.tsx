import { CheckCircle } from "lucide-react";

export default function SuccessNotification() {
  return (
    <div className="fixed bottom-4 right-4 bg-white border-l-4 border-primary text-foreground p-5 rounded-lg shadow-xl animate-slide-up max-w-md z-50 flex items-start gap-3">
      <div className="flex-shrink-0 bg-primary/10 p-1.5 rounded-full">
        <CheckCircle className="h-5 w-5 text-primary" />
      </div>
      <div>
        <h4 className="font-semibold text-sm">Erfolgreich eingereicht!</h4>
        <p className="text-secondary text-sm mt-1">
          Vielen Dank! Dein Schnupfspruch wurde erfolgreich eingereicht und wird nach einer kurzen Prüfung veröffentlicht.
        </p>
      </div>
    </div>
  );
}
