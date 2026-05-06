import React, { useState } from "react";
import { Plus, Edit2, Trash2, Building2, X, Check } from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function AdminSetores() {
  const { sectors, addSector, updateSector, deleteSector, goals } = useApp();
  const [newName, setNewName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (newName.trim()) {
      addSector(newName.trim());
      setNewName("");
    }
  };

  const startEdit = (id: string, name: string) => {
    setEditingId(id);
    setEditingName(name);
  };

  const saveEdit = (id: string) => {
    if (editingName.trim()) {
      updateSector(id, editingName.trim());
    }
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    if (confirmDelete === id) {
      deleteSector(id);
      setConfirmDelete(null);
    } else {
      setConfirmDelete(id);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <div>
        <h2 className="text-slate-800 text-xl font-bold">Cadastro de Setores</h2>
        <p className="text-slate-500 text-sm mt-1">{sectors.length} setores cadastrados</p>
      </div>

      {/* Add Form */}
      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <h3 className="text-sm font-semibold text-slate-700 mb-3">Adicionar Novo Setor</h3>
        <form onSubmit={handleAdd} className="flex gap-3">
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Nome do setor..."
            className="flex-1 border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={!newName.trim()}
            className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
          >
            <Plus size={15} />
            Adicionar
          </button>
        </form>
      </div>

      {/* List */}
      <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-50">
        {sectors.map((sector) => {
          const goalCount = goals.filter((g) => g.sectorId === sector.id).length;
          return (
            <div key={sector.id} className="flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors">
              <div className="w-9 h-9 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Building2 className="text-slate-500" size={16} />
              </div>

              {editingId === sector.id ? (
                <input
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === "Enter") saveEdit(sector.id);
                    if (e.key === "Escape") setEditingId(null);
                  }}
                  className="flex-1 border border-blue-300 rounded-lg px-3 py-1.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <div className="flex-1">
                  <div className="text-sm font-medium text-slate-800">{sector.name}</div>
                  <div className="text-xs text-slate-400">{goalCount} metas vinculadas</div>
                </div>
              )}

              <div className="flex items-center gap-1 flex-shrink-0">
                {editingId === sector.id ? (
                  <>
                    <button
                      onClick={() => saveEdit(sector.id)}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                    >
                      <Check size={15} />
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="p-2 text-slate-400 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                      <X size={15} />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => startEdit(sector.id, sector.name)}
                      className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit2 size={15} />
                    </button>
                    <button
                      onClick={() => handleDelete(sector.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        confirmDelete === sector.id
                          ? "bg-red-600 text-white"
                          : "text-slate-400 hover:text-red-600 hover:bg-red-50"
                      }`}
                      title={confirmDelete === sector.id ? "Confirmar exclusão" : "Excluir"}
                    >
                      <Trash2 size={15} />
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}

        {sectors.length === 0 && (
          <div className="py-12 text-center text-slate-400">
            <Building2 size={32} className="mx-auto mb-2 opacity-30" />
            <p>Nenhum setor cadastrado.</p>
          </div>
        )}
      </div>
    </div>
  );
}
