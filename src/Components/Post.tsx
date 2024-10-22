import { format, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import styles from "./Post.module.css";
import { Avatar } from "./Avatar";
import { Comment } from "./Comment";
import { ChangeEvent, FormEvent, useState } from "react";

interface Author {
    name: string;
    role: string;
    avatarUrl: string;
}

export interface PostType {
    id: number;
    author: Author;
    publishedAt: Date;
    content: Content[];
}

interface PostProps {
    Post: PostType;
}

interface Content {
    type: "paragraph" | "Link";
    content: string;
}

export function Post({ Post }: PostProps) {
    const [comments, setComments] = useState(["Post muito bacana, Hein?"]);
    const [newCommentText, setNewCommentText] = useState(""); // Inicializa como string vazia

    // Formatação da data de publicação
    const publishedDateFormatted = format(Post.publishedAt, "d 'de' LLLL 'ás' HH:mm 'h'", {
        locale: ptBR,
    });

    const publishedDateRelativeToNow = formatDistanceToNow(Post.publishedAt, {
        locale: ptBR,
        addSuffix: true,
    });

    // Função para criar um novo comentário
    function handleCreateNewComment(event: FormEvent) {
        event.preventDefault();

        setComments([...comments, newCommentText.trim()]);
        setNewCommentText(""); // Limpa o campo de comentário após o envio
    }

    // Função para capturar a mudança no campo de comentário
    function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
        setNewCommentText(event.target.value);
        event.target.setCustomValidity(""); // Limpa mensagens de erro personalizadas
    }


    // Função para deletar um comentário
    function deleteComment(commentToDelete: string) {
        const commentsWithoutDeleteOne = comments.filter(comment => comment !== commentToDelete);
        setComments(commentsWithoutDeleteOne);
    }

    const isNewCommentInputEmpty = newCommentText.length === 0

    return (
        <article className={styles.Post}>
            <header>
                <div className={styles.author}>
                    <Avatar hasBorder={true} src={Post.author.avatarUrl} />
                    <div className={styles.authorInfo}>
                        <strong>{Post.author.name}</strong>
                        <span>{Post.author.role}</span>
                    </div>
                </div>

                <time
                    className={styles.time}
                    title={publishedDateFormatted}
                    dateTime={Post.publishedAt.toISOString()}
                >
                    {publishedDateRelativeToNow}
                </time>
            </header>

            <div className={styles.content}>
                {Post.content.map(line => {
                    if (line.type === "paragraph") {
                        return <p key={line.content}>{line.content}</p>;
                    } else if (line.type === "Link") {
                        return <p key={line.content}><a href="#">{line.content}</a></p>;
                    }
                })}
            </div>

            <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
                <strong>Deixe seu Feedback</strong>
                <textarea
                    name="comment"
                    value={newCommentText}
                    placeholder="Deixe um comentário"
                    onChange={handleNewCommentChange}
                    required
                />
                <button type="submit" disabled={isNewCommentInputEmpty}>
                    Comentar
                </button>
            </form>

            <div className={styles.CommentList}>
                {comments.map(comment => {
                    return (
                        <Comment
                            key={comment}
                            content={comment}
                            onDeleteComment={deleteComment}
                        />
                    );
                })}
            </div>
        </article>
    );
}
