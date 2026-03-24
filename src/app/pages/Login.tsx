import React, { useState } from "react";
import { useNavigate } from "react-router";
import { GraduationCap, Eye, EyeOff, Lock, Mail, AlertCircle } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function Login() {
  const { login } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    const success = login(email, password);
    setLoading(false);
    if (success) {
      navigate("/");
    } else {
      setError("E-mail ou senha inválidos. Tente novamente.");
    }
  };

  const demoAccounts = [
    { role: "Administrador", email: "admin@pes.edu.br", password: "admin123", color: "bg-purple-100 text-purple-700 border-purple-200" },
    { role: "Responsável", email: "carlos@pes.edu.br", password: "resp123", color: "bg-blue-100 text-blue-700 border-blue-200" },
    { role: "Gestor", email: "marcia@pes.edu.br", password: "gestor123", color: "bg-green-100 text-green-700 border-green-200" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-xl mb-4">
            <GraduationCap className="w-8 h-8 text-blue-700" />
          </div>
          <h1 className="text-white text-2xl font-bold">PES</h1>
          <p className="text-blue-200 text-sm mt-1">Planejamento Estratégico da Educação</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-slate-800 text-xl font-semibold mb-1">Bem-vindo!</h2>
          <p className="text-slate-500 text-sm mb-6">Faça login para acessar o sistema.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">E-mail</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.gov.br"
                  required
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Senha</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-10 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                <AlertCircle size={15} />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-700 hover:bg-blue-800 text-white font-medium py-2.5 rounded-lg text-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Entrando...
                </span>
              ) : (
                "Entrar"
              )}
            </button>
          </form>

          {/* Demo accounts */}
          <div className="mt-6 pt-6 border-t border-slate-100">
            <p className="text-xs text-slate-500 mb-3 text-center">Contas de demonstração</p>
            <div className="space-y-2">
              {demoAccounts.map((acc) => (
                <button
                  key={acc.email}
                  onClick={() => {
                    setEmail(acc.email);
                    setPassword(acc.password);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg border text-xs font-medium transition-opacity hover:opacity-80 ${acc.color}`}
                >
                  <span>{acc.role}</span>
                  <span className="font-normal opacity-70">{acc.email}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <p className="text-center text-blue-300 text-xs mt-6">
          Secretaria de Educação © 2026 — Sistema PES
        </p>
      </div>
    </div>
  );
}
