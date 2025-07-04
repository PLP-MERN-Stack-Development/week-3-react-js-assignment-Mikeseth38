import { useState, useEffect } from 'react';
import ApiData from './pages/Api Data'; // Adjust the import path as necessary
import axios from 'axios';
import Card from '../components/Card';
import Button from '../components/TaskForm';
import { apiGet } from '../utility/api';

const ApiData = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/posts',
        {
          params: {
            q: searchTerm,
            _page: page,
            _limit: 8,
          },
        }
      );
      setPosts(response.data);
    } catch {
      setError('Failed to fetch posts. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line
  }, [page, searchTerm]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchPosts();
  };

  return (
    <Card title="API Posts" className="max-w-4xl mx-auto" bodyClass="space-y-4">
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search posts..."
          className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        <Button type="submit" variant="primary">
          Search
        </Button>
      </form>

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="text-red-500 p-3 bg-red-50 rounded-md dark:bg-red-900/20">
          {error}
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-6 text-gray-500 dark:text-gray-400">
          No posts found
        </div>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            {posts.map((post) => (
              <Card key={post.id} className="p-4 border dark:border-gray-700">
                <h3 className="font-bold text-gray-800 dark:text-white line-clamp-1">
                  {post.title}
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300 line-clamp-2">
                  {post.body}
                </p>
                <Button
                  size="sm"
                  variant="secondary"
                  className="mt-3 w-full"
                  onClick={() => alert(`Post ID: ${post.id}`)}
                >
                  View Details
                </Button>
              </Card>
            ))}
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1 || loading}
              variant="secondary"
            >
              Previous
            </Button>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Page {page}
            </span>
            <Button
              onClick={() => setPage((p) => p + 1)}
              disabled={posts.length < 8 || loading}
              variant="secondary"
            >
              Next
            </Button>
          </div>
        </>
      )}
    </Card>
  );
};

export default ApiData;