import React, { useRef, useState } from "react";
import axios from "axios";
import "./ProfilePage.css";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const navigate = useNavigate();

  const id = localStorage.getItem("id");
  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");
  const profilePic = localStorage.getItem("profile_pic");
  const role = localStorage.getItem("role");

  const [avatar, setAvatar] = useState(profilePic);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result.split(",")[1];
      try {
        const response = await axios.post("http://localhost:3001/users/update-profile-pic", {
          userId: id,
          profile_pic: base64,
        });
        localStorage.setItem("profile_pic", base64);
        setAvatar(base64);
      } catch (error) {
        console.error("Erro ao atualizar foto:", error);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handlePasswordSubmit = async () => {
    if (newPassword !== confirmPassword) {
      setMessage("As novas senhas não coincidem.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/users/change-password", {
        userId: id,
        currentPassword: currentPassword,
        newPassword: newPassword,
      });

      setMessage(response.data.message || "Senha alterada com sucesso!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setShowPasswordForm(false);
    } catch (err) {
      if (err.response) {
        if (err.response.status === 401) {
          setMessage("Senha atual incorreta.");
        } else if (err.response.status === 400) {
          setMessage("Preencha todos os campos.");
        } else {
          setMessage(err.response.data.message || "Erro interno no servidor.");
        }
      } else {
        setMessage("Não foi possível conectar ao servidor.");
      }
    }
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm("Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita!");
    if (!confirmDelete) return;

    try {
      await axios.post("http://localhost:3001/users/delete-account", {
        userId: id,
      });

      // Limpar dados locais e redirecionar
      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.error("Erro ao excluir conta:", error);
      alert("Erro ao excluir conta. Tente novamente.");
    }
  };

  return (
    <div className="profile-container">
      <header className="profile-header">
        <div className="profile-photo">
          <img
            src={
              avatar === "null" || !avatar
                ? "/default.jpg"
                : `data:image/jpeg;base64,${avatar}`
            }
            alt="Perfil"
            className="user-profile-avatar"
          />
          <button className="btn-change-photo" onClick={handleButtonClick}>
            Alterar foto
          </button>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </div>
        <div className="profile-main-info">
          <h1>{name}</h1>
          <p>{email}</p>
        </div>
      </header>

      <main className="profile-content">
        <h2>Informações da conta</h2>
        <ul>
          <li><strong>ID:</strong> {id}</li>
          <li><strong>Nome:</strong> {name}</li>
          <li><strong>Email:</strong> {email}</li>
          <li><strong>Role:</strong> {role}</li>
        </ul>

        <div className="password-section">
          <button
            className="btn-change-password"
            onClick={() => setShowPasswordForm(!showPasswordForm)}
          >
            {showPasswordForm ? "Cancelar" : "Alterar senha"}
          </button>

          {showPasswordForm && (
            <div className="password-form">
              <input
                type="password"
                placeholder="Senha atual"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="Nova senha"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="Confirmar nova senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button className="btn-save-password" onClick={handlePasswordSubmit}>
                Salvar nova senha
              </button>
            </div>
          )}

          {message && <p className="password-message">{message}</p>}
        </div>

        <div className="delete-account-section">
          <button className="btn-delete-account" onClick={handleDeleteAccount}>
            Excluir Conta
          </button>
        </div>
      </main>
    </div>
  );
}

export default ProfilePage;
