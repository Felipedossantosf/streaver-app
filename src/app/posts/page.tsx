'use client';

import { useState, useEffect } from 'react';
import { usePosts } from '@/hooks/usePosts';
import SearchInput from '@/components/SearchInput';
import PostCard from '@/components/PostCard';
import SlowConnectionNotification from '@/components/SlowConnectionNotification';

export default function PostsPage() {
  const [selectedUserId, setSelectedUserId] = useState<number | undefined>();
  const [showSlowConnection, setShowSlowConnection] = useState(false);
  const { posts, isLoading, isError, isValidating } = usePosts(selectedUserId);

  // Handle slow connection detection
  useEffect(() => {
    let slowConnectionTimer: NodeJS.Timeout;
    
    if (isLoading && !isError) {
      // Show slow connection notification after 3 seconds
      slowConnectionTimer = setTimeout(() => {
        setShowSlowConnection(true);
      }, 3000);
    } else {
      // Hide notification when loading completes or error occurs
      setShowSlowConnection(false);
    }

    return () => {
      if (slowConnectionTimer) {
        clearTimeout(slowConnectionTimer);
      }
    };
  }, [isLoading, isError]);

  const handleSearch = (userId: number | undefined) => {
    setSelectedUserId(userId);
  };

  const handleDismissSlowConnection = () => {
    setShowSlowConnection(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Posts
          </h1>
          <p className="text-gray-600">
            Browse and filter posts from our community
          </p>
        </div>

        {/* Search Input */}
        <SearchInput onSearch={handleSearch} isLoading={isLoading} />

        {/* Status Messages */}
        {isLoading && (
          <div className="text-center py-8">
            <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
              Loading posts...
            </div>
          </div>
        )}

        {isError && (
          <div className="text-center py-8">
            <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-red-100 text-red-800">
              <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Error loading posts. Please try again.
            </div>
          </div>
        )}

        {/* Posts Grid */}
        {!isLoading && !isError && posts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}

        {/* No Posts Message */}
        {!isLoading && !isError && posts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500">
              {selectedUserId ? (
                <div>
                  <p className="text-lg font-medium mb-2">No posts found</p>
                  <p className="text-sm">No posts found for user ID {selectedUserId}</p>
                </div>
              ) : (
                <div>
                  <p className="text-lg font-medium mb-2">No posts available</p>
                  <p className="text-sm">There are currently no posts to display</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Results Count */}
        {!isLoading && !isError && posts.length > 0 && (
          <div className="text-center mt-8 text-sm text-gray-500">
            Showing {posts.length} post{posts.length !== 1 ? 's' : ''}
            {selectedUserId && ` for user ID ${selectedUserId}`}
          </div>
        )}

        {/* Validating Indicator */}
        {isValidating && !isLoading && (
          <div className="fixed bottom-4 right-4 z-40">
            <div className="inline-flex items-center px-3 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-800 shadow-lg">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600 mr-2"></div>
              Updating...
            </div>
          </div>
        )}
      </div>

      {/* Slow Connection Notification */}
      <SlowConnectionNotification
        isVisible={showSlowConnection}
        onDismiss={handleDismissSlowConnection}
      />
    </div>
  );
}

