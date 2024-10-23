import { PencilLine } from "phosphor-react";
import { useState, ChangeEvent, FormEvent } from "react";
import styles from "./Sidebar.module.css";
import { Avatar } from "./Avatar";

// Tipagem para as informações do usuário
interface UserInfo {
    nome: string;
    cargo: string;
    foto: string;
}

export function Sidebar() {
    // Estado para armazenar as informações do usuário
    const [userInfo, setUserInfo] = useState<UserInfo>({
        nome: "Artur Huber",
        cargo: "Web Developer",
        foto: "https://github.com/artur-debv.png"
    });

    // Estado para controlar o modo de edição
    const [editando, setEditando] = useState<boolean>(false);

    // Função para alternar entre os modos de edição e visualização
    const toggleEditMode = () => {
        setEditando(!editando);
    };

    // Função para lidar com a submissão do formulário de edição
    const handleSave = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setEditando(false); // Fecha o modo de edição
    };

    // Função para lidar com as mudanças nos inputs
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserInfo({ ...userInfo, [name]: value });
    };

    return (
        <aside className={styles.sidebar}>
            <img
                className={styles.cover}
                src="https://images.unsplash.com/photo-1672957581550-6b37dcdbf6ff?q=50&w=500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />

            <div className={styles.profile}>
                {/* Exibe a foto */}
                <Avatar src={userInfo.foto} hasBorder={false} />

                {/* Exibe o nome e cargo ou um formulário de edição */}
                {editando ? (
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
                            type="text"
                            name="foto"
                            value={userInfo.foto}
                            onChange={handleInputChange}
                            placeholder="URL da foto"
                            className={styles.input}
                        />
                        <button type="submit" className={styles.saveButton}>Salvar</button>
                        <button type="button" onClick={toggleEditMode} className={styles.cancelButton}>
                            Cancelar
                        </button>
                    </form>
                ) : (
                    <>
                        <strong>{userInfo.nome}</strong>
                        <span>{userInfo.cargo}</span>
                    </>
                )}
            </div>

            <footer>
                <a href="#" onClick={toggleEditMode}>
                    <PencilLine size={20} />
                    Editar seu perfil
                </a>
            </footer>
        </aside>
    );
}
