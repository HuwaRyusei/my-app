"use client";

import { PostType } from "@/types";
import { useRef } from "react";


async function fetchAll() {
  // 本番環境URL
  const res = await fetch(`https://my-app-theta-ten-80.vercel.app/api`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data.posts;
}

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

export default async function Home() {

  const posts = await fetchAll();
  const nameRef = useRef<HTMLInputElement | null>(null);
  const contentRef = useRef<HTMLTextAreaElement | null>(null);

  const hundleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // ブログの投稿
    postMsg(nameRef.current?.value, contentRef.current?.value);

    // リフレッシュ
    window.location.reload();
  };

  return (
    <div className="bg-gray-100 font-sans text-gray-900 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">掲示板</h1>

        {/* 投稿フォーム */}
        <form className="space-y-6">
          {/* 名前入力と送信ボタン */}
          <div className="flex items-center space-x-4">
            <div className="flex flex-col w-full">
              <input
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
              id="message"
              name="message"
              rows={4}
              required
              placeholder="投稿内容"
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300 w-full"
            />
          </div>
        </form>

        {/* 投稿リスト */}
        <div className="mt-8 space-y-4">
          {posts.map((post: PostType) => (
            <div key={post.id} className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <div className="flex items-center mb-2">
                <span className="font-bold text-gray-800">{post.name}</span>
                <span className="text-sm text-gray-500 ml-2">
                  {new Date(post.createdAt).toLocaleDateString("ja-JP")}
                </span>
              </div>
              <p className="text-gray-700">{post.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  
}
