interface HeaderProps {
    onNewPostClick: () => void;
}

function Header( { onNewPostClick }: HeaderProps) {
  return (
    <>
    <div className="text-center bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 py-5 shadow-lg rounded-2xl">
    <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-sm tracking-tight">
      Post App
    </h1>
    <p className="mt-1 text-sm md:text-base text-blue-100 opacity-90">
      Manage, view, and create posts with ease
    </p>
  </div>
    <button className="px-6 py-1 my-4 bg-gradient-to-r from-blue-500 to-purple-500 
    text-white font-bold rounded-full transition-transform transform-gpu 
    hover:-translate-y-1 hover:shadow-lg"
    onClick={onNewPostClick}>
        New Post
    </button>
    </>
  )
}

export default Header