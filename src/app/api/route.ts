import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
type ApiResponse = { message?: string; error?: string };

const prisma = new PrismaClient();

export default function handler(req: NextApiRequest, res: NextApiResponse<ApiResponse>) {
    res.setHeader("Access-Control-Allow-Origin", "*"); // すべてのオリジンを許可
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  
    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }
  
    if (req.method === "POST") {
      return res.status(200).json({ message: "投稿成功" });
    }
  
    res.status(405).json({ error: "Method Not Allowed" });
  }
  

// データベース接続を行う補助関数
async function connectToDatabase() {
    try {
        await prisma.$connect();
    } catch (err) {
        throw new Error("DB接続失敗: " + err);
    }
}

// 全ポスト取得　API
export async function GET() {
    try {
        await connectToDatabase();  // DB接続

        // posts変数に取得したすべての記事を格納
        const posts = await prisma.post.findMany();

        // 取り出したメッセージを返す
        return NextResponse.json({ message: "success", posts }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "error", err }, { status: 500 });
    } finally {
        prisma.$disconnect();
    }
}

// 投稿用　API
export const POST = async (req: Request) => {
    try {
        const { name, content } = await req.json();  // リクエストから値を受け取る

        await connectToDatabase();  // DB接続

        // 新しい投稿を作成
        const post = await prisma.post.create({
            data: { name, content }
        });

        return NextResponse.json({ message: "success", post }, { status: 201 });
    } catch (err) {
        return NextResponse.json({ message: "error", err }, { status: 500 });
    } finally {
        prisma.$disconnect();
    }
};
