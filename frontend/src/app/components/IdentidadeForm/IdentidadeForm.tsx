import { useEffect, useState } from "react";
import { getIdentidade, updateIdentidade } from "../../../services/api";

type CampoIdentidade = "missao" | "visao" | "valores";

interface IdentidadeFormProps {
  titulo: string;
  campo: CampoIdentidade;
  descricao?: string;
}

export default function IdentidadeForm({
  titulo,
  campo,
  descricao,
}: IdentidadeFormProps) {
  const [texto, setTexto] = useState("");
  const [loading, setLoading] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  useEffect(() => {
    carregarDados();
  }, []);

  async function carregarDados() {
    try {
      setLoading(true);
      setErro("");

      const identidade = await getIdentidade();

      setTexto((identidade[campo] as string) || "");
    } catch (error: any) {
      setErro(error.message || "Erro ao carregar informações.");
    } finally {
      setLoading(false);
    }
  }

  async function salvar() {
    try {
      setSalvando(true);
      setErro("");
      setMensagem("");

      await updateIdentidade({
        [campo]: texto,
      });

      setMensagem("Informações salvas com sucesso.");

      setTimeout(() => {
        setMensagem("");
      }, 3000);
    } catch (error: any) {
      setErro(error.message || "Erro ao salvar informações.");
    } finally {
      setSalvando(false);
    }
  }

  if (loading) {
    return (
      <div className="p-6">
        <p className="text-slate-500">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl">
      <h1 className="text-3xl font-bold text-slate-800 mb-2">{titulo}</h1>

      {descricao && <p className="text-slate-600 mb-6">{descricao}</p>}

      {erro && (
        <div className="mb-4 rounded-lg bg-red-50 border border-red-200 p-3 text-red-700">
          {erro}
        </div>
      )}

      {mensagem && (
        <div className="mb-4 rounded-lg bg-green-50 border border-green-200 p-3 text-green-700">
          {mensagem}
        </div>
      )}

      <textarea
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        rows={12}
        className="w-full border border-slate-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder={`Digite a ${titulo.toLowerCase()} da instituição...`}
      />

      <button
        onClick={salvar}
        disabled={salvando}
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition disabled:opacity-50"
      >
        {salvando ? "Salvando..." : "Salvar"}
      </button>
    </div>
  );
}
