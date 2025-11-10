import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function validateInput() {
    if (!email.trim()) {
      setErrorMessage("Email é obrigatório.");
      return false;
    }
    if (!password) {
      setErrorMessage("Senha é obrigatória.");
      return false;
    }
    setErrorMessage("");
    return true;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateInput()) return;

    setLoading(true);
    setErrorMessage("");
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      console.log("register response:", res.status, data);

      if (res.ok) {
        // Exemplo de redirecionamento conforme papel do usuário
        if (data.role === "admin") {
          navigate("/admin-dashboard");
        } else if (data.role === "student") {
          navigate("/student-portal");
        } else if (data.role === "teacher") {
          navigate("/teacher-dashboard");
        } else {
          navigate("/dashboard");
        }
      } else {
        setErrorMessage(data?.message || "Erro no cadastro");
      }
    } catch (err) {
      console.error("network error:", err);
      setErrorMessage("Erro de rede. Veja console.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? "Enviando..." : "Cadastrar"}
      </button>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </form>
  );
}
