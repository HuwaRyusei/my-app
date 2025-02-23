"use client";
import { useRef,useState } from "react";
import { useRouter } from "next/navigation";
import ProgressBar from "./components/ProgressBar";

const postMsg = async (name: string | undefined, content: string | undefined) => {
    const res = await fetch(`https://my-app-theta-ten-80.vercel.app/api`, {
        method: "POST",
        body: JSON.stringify({ name, content }),
        headers: {
            "Content-Type": "application/json",
        },
    });
    return res.json();
};

// 投稿フォーム
function PostForm() {

    const router = useRouter();
    const nameRef = useRef<HTMLInputElement>(null);
    const contentRef = useRef<HTMLTextAreaElement>(null);
    
    const [progress, setProgress] = useState(0); // ロードバーの進捗

    const hundleSubmit = (e: React.FormEvent) =>{
        e.preventDefault();

        setProgress(10); // 最初に少し進捗を表示

        // ポスト
        postMsg(nameRef.current?.value, contentRef.current?.value);

        // 進捗が50%まで進んだとして表示
        setProgress(50);

        // 中身があればカラにする
        if(nameRef.current && contentRef.current){
            nameRef.current.value = "";
            contentRef.current.value = "";
        }
        
        // 画面のリフレッシュ
        router.refresh();

        // 投稿が完了したら進捗を100%に設定
        setProgress(100);
        setTimeout(() => setProgress(0), 1000); // 完了後に少し待機してからバーをリセット
    }

    return (
        <form className="space-y-6" onSubmit={hundleSubmit}>
            {/* ローディング中のみロードバーの表示 */}
            <ProgressBar progress={progress} />
            {/* 名前入力と送信ボタン */}
            <div className="flex items-center space-x-4">
                <div className="flex flex-col w-full">
                    <input
                        ref={nameRef}
                        type="text"
                        id="name"
                        name="name"
                        required
                        placeholder="投稿名"
                        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300 w-full"
                    />
                </div>
                <button
                    type="submit"
                    className="px-3 py-5 text-white font-semibold rounded-lg transition duration-300"
                >
                    {/* 送信アイコン */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#5f6368"
                    >
                        <path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z" />
                    </svg>
                </button>
            </div>

            {/* 文章入力 */}
            <div className="flex flex-col">
                <textarea
                    ref={contentRef}
                    id="message"
                    name="message"
                    rows={4}
                    required
                    placeholder="投稿内容"
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300 w-full"
                />
            </div>
        </form>
    );
};

export default PostForm;