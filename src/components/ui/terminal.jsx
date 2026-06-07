import React from "react";

export function Terminal({
  commands = [],
  outputs = {},
  typingSpeed = 45,
  delayBetweenCommands = 1000,
  prompt = "akash@garage:~$",
  commandPrompts = {},
  passwordCommandIndexes = [],
  onComplete,
}) {
  const [history, setHistory] = React.useState([]);
  const [commandIndex, setCommandIndex] = React.useState(0);
  const [typedCommand, setTypedCommand] = React.useState("");
  const passwordIndexes = React.useMemo(() => new Set(passwordCommandIndexes), [passwordCommandIndexes]);

  React.useEffect(() => {
    setHistory([]);
    setCommandIndex(0);
    setTypedCommand("");
  }, [commands, outputs]);

  React.useEffect(() => {
    if (commandIndex >= commands.length) {
      onComplete?.();
      return undefined;
    }

    const currentCommand = commands[commandIndex] ?? "";

    if (typedCommand.length < currentCommand.length) {
      const timer = window.setTimeout(() => {
        setTypedCommand(currentCommand.slice(0, typedCommand.length + 1));
      }, typingSpeed);

      return () => window.clearTimeout(timer);
    }

    const timer = window.setTimeout(() => {
      const commandOutputs = outputs[commandIndex] ?? [];
      const commandPrompt = commandPrompts[commandIndex] ?? prompt;
      setHistory((previousHistory) => [
        ...previousHistory,
        {
          command: currentCommand,
          masked: passwordIndexes.has(commandIndex),
          outputs: commandOutputs,
          prompt: commandPrompt,
        },
      ]);
      setTypedCommand("");
      setCommandIndex((currentIndex) => currentIndex + 1);
    }, delayBetweenCommands);

    return () => window.clearTimeout(timer);
  }, [commandIndex, commandPrompts, commands, delayBetweenCommands, onComplete, outputs, passwordIndexes, prompt, typedCommand, typingSpeed]);

  const isPasswordEntry = passwordIndexes.has(commandIndex);
  const visibleTypedCommand = isPasswordEntry ? "•".repeat(typedCommand.length) : typedCommand;
  const activePrompt = commandPrompts[commandIndex] ?? prompt;

  return (
    <div className="w-full max-w-3xl overflow-hidden rounded-2xl border border-orange-300/20 bg-[#070707]/95 text-left font-mono text-sm text-zinc-100 shadow-[0_24px_90px_rgba(0,0,0,0.6),0_0_50px_rgba(255,191,72,0.11)] backdrop-blur md:text-base">
      <div className="flex items-center gap-2 border-b border-white/10 bg-zinc-950 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-red-500" />
        <span className="h-3 w-3 rounded-full bg-yellow-400" />
        <span className="h-3 w-3 rounded-full bg-green-500" />
        <span className="ml-3 text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500">Akash Garage Terminal</span>
      </div>

      <div className="min-h-[18rem] space-y-3 p-5 md:min-h-[21rem] md:p-6">
        {history.map((entry, index) => (
          <div key={`terminal-history-${index}`} className="space-y-2">
            <p className="break-words text-orange-200">
              {entry.prompt && <span className="text-emerald-400">{entry.prompt}</span>} {entry.masked ? "•".repeat(entry.command.length) : entry.command}
            </p>
            {entry.outputs.map((line) => (
              <p key={`${index}-${line}`} className="break-words pl-4 text-zinc-300">
                {line}
              </p>
            ))}
          </div>
        ))}

        {commandIndex < commands.length && (
          <p className="break-words text-orange-200">
            {activePrompt && <span className="text-emerald-400">{activePrompt}</span>} {visibleTypedCommand}
            <span className="ml-1 inline-block h-5 w-2 translate-y-1 animate-pulse bg-orange-200" />
          </p>
        )}
      </div>
    </div>
  );
}
