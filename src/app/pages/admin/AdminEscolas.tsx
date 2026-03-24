import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { School } from "../../data/mockData";
import { Plus, Pencil, Trash2, Search } from "lucide-react";

export default function AdminEscolas() {
  const { schools, students, addSchool, updateSchool, deleteSchool, currentUser } = useApp();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSchool, setEditingSchool] = useState<School | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"" | "Ativa" | "Inativa">("");
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    address: "",
    phone: "",
    status: "Ativa" as "Ativa" | "Inativa",
  });

  const isAdmin = currentUser?.role === "admin";

  const filteredSchools = schools.filter((school) => {
    if (searchTerm && !school.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    if (filterStatus && school.status !== filterStatus) return false;
    return true;
  });

  const getSchoolStudentsCount = (schoolId: string) => {
    return students.filter((s) => s.schoolId === schoolId).length;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingSchool) {
      updateSchool(editingSchool.id, formData);
    } else {
      addSchool(formData);
    }
    resetForm();
  };

  const handleEdit = (school: School) => {
    setEditingSchool(school);
    setFormData({
      name: school.name,
      code: school.code,
      address: school.address,
      phone: school.phone,
      status: school.status,
    });
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir esta escola?")) {
      deleteSchool(id);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      code: "",
      address: "",
      phone: "",
      status: "Ativa",
    });
    setEditingSchool(null);
    setIsFormOpen(false);
  };

  if (!isAdmin) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Você não tem permissão para acessar esta página.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Administração de Escolas</h1>
          <p className="mt-2 text-gray-600">
            Gerenciar cadastro de escolas da rede de ensino
          </p>
        </div>
        <button
          onClick={() => setIsFormOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Nova Escola
        </button>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar por nome da escola..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as "" | "Ativa" | "Inativa")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Todos os status</option>
              <option value="Ativa">Ativa</option>
              <option value="Inativa">Inativa</option>
            </select>
          </div>
        </div>
      </div>

      {isFormOpen && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4">
            {editingSchool ? "Editar Escola" : "Nova Escola"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome da Escola
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Código</label>
                <input
                  type="text"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Endereço</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value as "Ativa" | "Inativa" })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Ativa">Ativa</option>
                  <option value="Inativa">Inativa</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                {editingSchool ? "Atualizar" : "Criar"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid gap-4">
        {filteredSchools.length > 0 ? (
          filteredSchools.map((school) => {
            const studentCount = getSchoolStudentsCount(school.id);

            return (
              <div key={school.id} className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{school.name}</h3>
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded ${
                          school.status === "Ativa"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {school.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600 mb-2">
                      <div>
                        <span className="font-medium">Código:</span> {school.code}
                      </div>
                      <div>
                        <span className="font-medium">Telefone:</span> {school.phone}
                      </div>
                      <div className="md:col-span-2">
                        <span className="font-medium">Endereço:</span> {school.address}
                      </div>
                      <div>
                        <span className="font-medium">Alunos matriculados:</span> {studentCount}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => handleEdit(school)}
                      className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                      title="Editar"
                    >
                      <Pencil className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(school.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Excluir"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-gray-500">Nenhuma escola encontrada.</p>
          </div>
        )}
      </div>
    </div>
  );
}
