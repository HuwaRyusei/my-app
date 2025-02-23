// components/PostList.tsx
import React from 'react';
import { PostType } from '@/types';

async function fetchAll() {
    // 本番環境URL
    const res = await fetch(`https://my-app-theta-ten-80.vercel.app/api`, {
        cache: "no-store",
    });
    const data = await res.json();
    return data.posts;
}

// 投稿リスト
async function PostList(){

    const posts = await fetchAll();

    return (
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
    );
};

export default PostList;
