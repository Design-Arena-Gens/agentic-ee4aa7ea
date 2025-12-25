"use client";

import { type ChangeEvent, useMemo, useState } from "react";
import { generateStory, StoryInputs } from "@/lib/storyGenerator";

const defaultInputs: StoryInputs = {
  title: "Sinos de Pedra Fria",
  protagonista: "Helena",
  confidente: "Davi",
  antagonista: "Irmã Celina",
  ambiente: "o mosteiro suspenso sobre a serra",
  gatilhoCaos: "os sinos que tocam sozinhos",
  simboloEspiritual: "véu azul",
  culpaOculta: "abandonar Clara no portão",
};

const camadaLabels: Record<"A" | "B" | "C", string> = {
  A: "Camada A · Presente",
  B: "Camada B · Passado Recente",
  C: "Camada C · Passado Distante",
};

const camadaStyles: Record<"A" | "B" | "C", string> = {
  A: "border-emerald-500/60 bg-emerald-500/5",
  B: "border-amber-500/60 bg-amber-500/5",
  C: "border-indigo-500/60 bg-indigo-500/5",
};

export default function Home() {
  const [inputs, setInputs] = useState<StoryInputs>(defaultInputs);
  const [copied, setCopied] = useState(false);

  const story = useMemo(() => generateStory(inputs), [inputs]);
  const storyText = useMemo(
    () =>
      [
        `Título: ${inputs.title}`,
        ...story.map((segment) => `${segment.titulo}\n${segment.conteudo}`),
      ].join("\n\n"),
    [story, inputs.title],
  );

  const handleChange =
    (field: keyof StoryInputs) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setInputs((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
      setCopied(false);
    };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(storyText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (error) {
      console.error("Falha ao copiar história", error);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 pb-24 text-zinc-100">
      <header className="border-b border-white/5 bg-zinc-950/70 backdrop-blur">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-3 px-6 py-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-emerald-400">
              Oficina de Suspense Espiritual
            </p>
            <h1 className="mt-1 text-3xl font-semibold sm:text-4xl">
              Gerador de Histórias · Linha do tempo quebrada
            </h1>
            <p className="mt-3 max-w-xl text-sm text-zinc-400 sm:text-base">
              Ajuste os gatilhos abaixo. O texto final já nasce no meio do caos,
              intercala camadas temporais e amarra conexões emocionais.
            </p>
          </div>
          <button
            onClick={handleCopy}
            className="inline-flex items-center justify-center rounded-full border border-emerald-400/60 px-5 py-2 text-sm font-medium text-emerald-300 transition hover:border-emerald-300 hover:text-emerald-200"
          >
            {copied ? "Copiado ✓" : "Copiar história"}
          </button>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-col gap-12 px-6 pt-12 lg:flex-row">
        <section className="w-full space-y-8 lg:w-[360px]">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.34em] text-zinc-400">
              Brief do caos
            </h2>
            <p className="mt-2 text-sm text-zinc-400">
              Mude nomes, cenário e ponto de ruptura emocional. Os detalhes
              alimentam todas as camadas do enredo.
            </p>
          </div>
          <form className="grid grid-cols-1 gap-5">
            <LabelInput
              label="Título"
              value={inputs.title}
              onChange={handleChange("title")}
            />
            <LabelInput
              label="Protagonista"
              value={inputs.protagonista}
              onChange={handleChange("protagonista")}
            />
            <LabelInput
              label="Confidente"
              value={inputs.confidente}
              onChange={handleChange("confidente")}
            />
            <LabelInput
              label="Figura ambígua"
              value={inputs.antagonista}
              onChange={handleChange("antagonista")}
            />
            <LabelInput
              label="Ambiente sagrado"
              value={inputs.ambiente}
              onChange={handleChange("ambiente")}
            />
            <LabelInput
              label="Gatilho do caos"
              value={inputs.gatilhoCaos}
              onChange={handleChange("gatilhoCaos")}
            />
            <LabelInput
              label="Símbolo espiritual"
              value={inputs.simboloEspiritual}
              onChange={handleChange("simboloEspiritual")}
            />
            <LabelInput
              label="Culpa oculta"
              value={inputs.culpaOculta}
              onChange={handleChange("culpaOculta")}
            />
          </form>
        </section>

        <section className="flex-1 space-y-8">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.34em] text-zinc-400">
              Estrutura entregue
            </h2>
            <p className="mt-2 text-sm text-zinc-400">
              Cada bloco sinaliza a camada temporal e mantém a tensão circular.
            </p>
          </div>
          <div className="space-y-6">
            {story.map((segment) => (
              <article
                key={segment.id}
                className={`rounded-3xl border px-6 py-6 transition hover:border-white/40 hover:bg-white/5 ${camadaStyles[segment.camada]}`}
              >
                <header className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
                  <span className="text-xs font-medium uppercase tracking-[0.26em] text-zinc-400">
                    {camadaLabels[segment.camada]}
                  </span>
                  <h3 className="text-base font-semibold text-emerald-200">
                    {segment.titulo}
                  </h3>
                </header>
                <p className="mt-4 text-sm leading-relaxed text-zinc-200">
                  {segment.conteudo}
                </p>
              </article>
            ))}
          </div>
          <section className="rounded-3xl border border-white/10 bg-zinc-900/60 p-6">
            <h2 className="text-sm font-semibold uppercase tracking-[0.34em] text-zinc-400">
              Texto íntegro
            </h2>
            <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-zinc-200">
              {storyText}
            </p>
          </section>
        </section>
      </main>
    </div>
  );
}

function LabelInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <label className="space-y-2">
      <span className="block text-xs font-semibold uppercase tracking-[0.3em] text-zinc-400">
        {label}
      </span>
      <input
        value={value}
        onChange={onChange}
        className="w-full rounded-xl border border-white/10 bg-zinc-900/60 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
        placeholder="Digite aqui"
      />
    </label>
  );
}
