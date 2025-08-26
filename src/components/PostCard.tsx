import { Post } from '@/types/post';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6 border border-gray-100">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 leading-tight">
          {post.title}
        </h3>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 ml-3 flex-shrink-0">
          User {post.userId}
        </span>
      </div>
      <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
        {post.body}
      </p>
      <div className="mt-4 pt-3 border-t border-gray-100">
        <span className="text-xs text-gray-500">Post ID: {post.id}</span>
      </div>
    </div>
  );
}

