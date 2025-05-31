import { Button } from "@/components/ui/button";
import { useVoice } from "@humeai/voice-react";
import { AnimatePresence, motion } from "framer-motion";
import { Phone } from "lucide-react";

export default function StartConversation({
  inline = false,
}: {
  inline?: boolean;
}) {
  const { status, connect } = useVoice();

  // If connected, render nothing
  if (status.value === "connected") {
    return <div style={{ display: "none" }} />;
  }

  // Handler for connect button
  const handleConnect = () => {
    connect()
      .then(() => {})
      .catch(() => {})
      .finally(() => {});
  };

  // Button component for reuse
  const ConnectButton = () => (
    <Button className="z-50 flex items-center gap-1.5" onClick={handleConnect}>
      <span>
        <Phone
          className="size-4 opacity-50"
          strokeWidth={2}
          stroke="currentColor"
        />
      </span>
      <span>Start Call</span>
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
          "fixed inset-0 flex items-center justify-center bg-background p-4"
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
