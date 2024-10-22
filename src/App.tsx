
import { Post, PostType  } from "./Components/Post";

import { Header } from "./Components/Header";

import { Sidebar } from "./Components/Sidebar";

import "./global.css"

import styles from "./App.module.css"



const posts:PostType[] = [
    {
        id: 1,
        author: {
            avatarUrl: "https://github.com/artur-debv.png",
            name: "Artur Huber",
            role: "Web Developers"
        },
        content: [

            { type: "paragraph", content: "Fala galeraa 👋" },
            { type: "paragraph", content: "Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW" },
            { type: "paragraph", content: " evento da Rocketseat. O nome do projeto é DoctorCare 🚀" },
            { type: "Link", content: "jane.design/doctorcare" },

        ],
        publishedAt: new Date("2024-11-10 17:45:30")
    },
    {
        id: 2,
        author: {
            avatarUrl: "https://github.com/maykbrito.png",
            name: "Mayk brito",
            role: "Web Developer"
        },
        content: [

            { type: "paragraph", content: "Fala galeraa 👋" },
            { type: "paragraph", content: "Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW" },
            { type: "paragraph", content: "Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀" },
            { type: "Link", content: "jane.design/doctorcare" },

        ],
        publishedAt: new Date("2024-12-10 18:00:30")
    },
];

export function App() {

    return (
        <div>
            <Header />
            <div className={styles.wrapper}>
                <Sidebar />
                <main>
                    {posts.map(post => {
                        return (
                            <Post
                                key={post.id}
                                Post={post}
                            />
                        )
                    })}
                </main>
            </div>
        </div>
    )
}

