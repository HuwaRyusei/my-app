
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";

export default async function Home() {

  return (
    <div className="bg-gray-100 font-sans text-gray-900 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">情専掲示板(非公式)</h1>

        <PostForm />
    
        <PostList />
      </div>
    </div>
  );
  
}
