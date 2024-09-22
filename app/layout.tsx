import { Metadata } from "next"
import React from "react"
export const metadata: Metadata = {
    title: "Mini Story App",
    description: "This app is a great supplement for low beginning learners who want to learn English/Chinese/Spanish/Arabic deeply to increase vocabulary, comprehension with step by step transcriptions and AI assistant.",
    keywords: ["effortless", "english", "mini", "story", "story", "learning", "aj hoge", "vietnam", "vietnamese", "chinese", "spanish", "arabic", "deep", "learning", "listen", "answer", "tpr", "tprs", "tprstorytelling"],
    icons: {
        icon: "./favicon.svg"
    }
}
export default function RootLayout(props: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>
                { props.children }
            </body>
        </html>
    )
}