import { PencilLine } from "phosphor-react";
import { useState, ChangeEvent, FormEvent } from "react";
import { Avatar } from "./Avatar";
import { Modal } from "./Modal";
import styles from "./Sidebar.module.css";

// Tipagem para as informações do usuário
interface UserInfo {
  nome: string;
  cargo: string;
  foto: string;
}

export function Sidebar() {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    nome: "Artur Huber",
    cargo: "Web Developer",
    foto: "https://github.com/artur-debv.png",
  });

  const [editando, setEditando] = useState<boolean>(false);
  const [novaFoto, setNovaFoto] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Função para alternar o modal e ativar o modo de edição
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setEditando(!editando); // Alterna o estado de edição
  };

  // Função para lidar com a submissão do formulário de edição
  const handleSave = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (novaFoto) {
      setUserInfo({ ...userInfo, foto: novaFoto });
    }
    setEditando(false); // Desativa o modo de edição
    toggleModal(); // Fecha o modal
  };

  // Função para lidar com as mudanças nos inputs de texto
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  // Função para lidar com a seleção de uma nova imagem
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setNovaFoto(reader.result as string);
      };
      reader.readAsDataURL(file); // Converte a imagem em base64 para exibição
    }
  };

  return (
    <aside className={styles.sidebar}>
      <img
        className={styles.cover}
        src="https://images.unsplash.com/photo-1672957581550-6b37dcdbf6ff?q=50&w=500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />

      <div className={styles.profile}>
        <Avatar src={userInfo.foto} hasBorder={false} />
        <strong>{userInfo.nome}</strong>
        <span>{userInfo.cargo}</span>
      </div>

      <footer>
        <a href="#" onClick={toggleModal}>
          <PencilLine size={18} />
          {editando ? "Salvando perfil..." : "Editar seu perfil"}
        </a>
      </footer>

      {/* Modal para edição */}
      <Modal isOpen={isModalOpen} onClose={toggleModal}>
        <form className={styles.editForm} onSubmit={handleSave}>
          <input
            type="text"
            name="nome"
            value={userInfo.nome}
            onChange={handleInputChange}
            placeholder="Nome"
            className={styles.input}
          />
          <input
            type="text"
            name="cargo"
            value={userInfo.cargo}
            onChange={handleInputChange}
            placeholder="Cargo"
            className={styles.input}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className={styles.inputUpload}
          />
          {novaFoto && <img src={novaFoto} alt="Nova foto de perfil" className={styles.newAvatar} />}
          <div className={styles.containers}>
          <button type="submit" className={styles.saveButton}>
            Salvar
          </button>
          <button type="button" onClick={toggleModal} className={styles.cancelButton}>
            Cancelar
          </button>
          </div>
        </form>
      </Modal>
    </aside>
  );
}
