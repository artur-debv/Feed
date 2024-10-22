
import { ThumbsUp, Trash } from "phosphor-react"
import styles from "./Comment.module.css"
import { Avatar } from "./Avatar"
import { useState } from "react"

interface CommentProps {
    content: string;
    onDeleteComment: (comment: string) => void;
}


export function Comment({ content, onDeleteComment }: CommentProps) {

    const [LikeCount, SetLikeCount] = useState(0)

    function handleDeleteComment() {
        onDeleteComment(content)
    }


    function handleLikeComment() {
        SetLikeCount((state) => {
            return state + 1
        })
    }


    return (
        <div className={styles.Comment}>
            <Avatar hasBorder={false} src="https://github.com/artur-debv.png" />
            <div className={styles.CommentBox}>
                <div className={styles.CommentContent}>
                    <header>
                        <div className={styles.authorAndTime}>
                            <strong>Artur Huber</strong>
                            <time
                                className={styles.time}
                                title="10 de outubro de 2024"
                                dateTime="2024-10-10 21:02:30"
                            >
                                Cerca de 1h atrás
                            </time>
                        </div>
                        <button onClick={handleDeleteComment} title="Deletar comentário">
                            <Trash size={20} />
                        </button>
                    </header>
                    <p>{content}</p>
                </div>
                <footer>
                    <button onClick={handleLikeComment}>
                        <ThumbsUp />
                        aplaudir <span>{LikeCount}</span>
                    </button>
                </footer>
            </div>
        </div>
    )
}