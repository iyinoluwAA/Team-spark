import { Button } from "@/components/ui/button";
import { useVoice } from "@humeai/voice-react";
import { AnimatePresence, motion } from "framer-motion";
import { Phone } from "lucide-react";

export default function StartConversation({
  inline = false,
  configId,
  accessToken,
}: {
  inline?: boolean;
  configId?: string;
  accessToken: string;
}) {
  const { status, connect } = useVoice();

  // If connected, render nothing
  if (status.value === "connected") {
    return <div style={{ display: "none" }} />;
  }

  // Handler for connect button
  const handleConnect = () => {
    connect({
      auth: { type: "accessToken", value: accessToken },
      configId,
    })
      .then(() => {})
      .catch(() => {})
      .finally(() => {});
  };

  // Button component for reuse
  const ConnectButton = () => (
    <Button
      className="z-50 flex items-center gap-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700"
      onClick={handleConnect}
    >
      <span>
        <Phone
          className="size-4 opacity-50"
          strokeWidth={2}
          stroke="currentColor"
        />
      </span>
      <span>Start Convo or call</span>
    </Button>
  );

  // Inline version
  if (inline) {
    return <ConnectButton />;
  }

  // Overlay version
  return (
    <AnimatePresence>
      <motion.div
        className={
          "fixed inset-0 flex items-center justify-center bg-white p-4 dark:bg-gray-900"
        }
        initial="initial"
        animate="enter"
        exit="exit"
        variants={{
          initial: { opacity: 0 },
          enter: { opacity: 1 },
          exit: { opacity: 0 },
        }}
      >
        <ConnectButton />
      </motion.div>
    </AnimatePresence>
  );
}
