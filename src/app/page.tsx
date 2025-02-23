"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import ProgressBar from "./components/ProgressBar";

const PASSWORD = "jyousen123"; // 共有パスワード

export default function Home() {
    const [inputPassword, setInputPassword] = useState("");
    const router = useRouter();
    // エラーメッセージ用
    const [errMsg, setErrMsg] = useState("");
    // ロードバー用
    const [progress, setProgress] = useState(0); 


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputPassword === PASSWORD) {
            setProgress(20);
            localStorage.setItem("authenticated", "true");
            setProgress(80);
            router.push("/home"); // 認証成功後にリダイレクト
            setProgress(100);
        } else {
            setErrMsg("パスワードが違います");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-2xl">
                
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    パスワードを入力
                </h1>

                {/* ロードバーの表示 */}
                <ProgressBar progress={progress} />

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="password"
                        value={inputPassword}
                        onChange={(e) => setInputPassword(e.target.value)}
                        placeholder="パスワードを入力"
                        className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <p className="text-red-500">{errMsg}</p>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
                    >
                        送信
                    </button>
                </form>
            </div>
        </div>
    );
}

