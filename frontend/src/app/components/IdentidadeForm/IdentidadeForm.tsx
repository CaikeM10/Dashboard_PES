import React, { useState, useEffect } from "react";

type Item = {
  id: string;
  texto: string;
};

export default function IdentidadeForm({
  titulo,
  storageKey,
}: {
  titulo: string;
  storageKey: string;
}) {
  const [items, setItems] = useState<Item[]>([]);
  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  // carregar
  useEffect(() => {
    const data = localStorage.getItem(storageKey);
    if (data) setItems(JSON.parse(data));
  }, [storageKey]);

  // salvar
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(items));
  }, [items, storageKey]);

  // adicionar ou editar
  const handleSave = () => {
    if (!input.trim()) return;

    if (editingId) {
      setItems((prev) =>
        prev.map((item) =>
          item.id === editingId ? { ...item, texto: input } : item,
        ),
      );
      setEditingId(null);
    } else {
      setItems((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          texto: input,
        },
      ]);
    }

    setInput("");
  };

  // editar
  const handleEdit = (item: Item) => {
    setInput(item.texto);
    setEditingId(item.id);
  };

  // excluir
  const handleDelete = (id: string) => {
    if (!confirm("Deseja realmente excluir?")) return;
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-bold">{titulo}</h2>

      {/* INPUT */}
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Digite ${titulo.toLowerCase()}...`}
          className="border p-2 rounded w-full"
        />

        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-4 rounded"
        >
          {editingId ? "Salvar" : "Adicionar"}
        </button>
      </div>

      {/* LISTA */}
      <div className="space-y-2">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center border p-3 rounded"
          >
            <span>{item.texto}</span>

            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(item)}
                className="text-blue-600"
              >
                Editar
              </button>

              <button
                onClick={() => handleDelete(item.id)}
                className="text-red-600"
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
