interface Post {
    id: number;
    title: string;
    body:string;
    userId: number;
}

interface PostListProps{
    posts: Post[];
    searchQuery: string;
}
function PostList({posts, searchQuery}: PostListProps) {
    
    //Filter posts based on searchQuery (case-insensitive)

    const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <>
    <h1>Posts</h1>
    <ul>
        {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
                <li key={post.id} className='mb-4'>
                    <h2 className="bg-blue-300 text-left">{post.title}</h2>
                    <p className='mt-1 text-gray-700'>{post.body}</p>
                </li>
            ))
        ):(
            <p>No posts match your search.</p>
        )}
    </ul>
    </>
  )
}

export default PostList