function Header() {
  return (
    <>
    <div className='text-center bg-gradient-to-r from-blue-500 to-purple-500'>Post App</div>
    <button className="px-6 py-1 my-4 bg-gradient-to-r from-blue-500 to-purple-500 
    text-white font-bold rounded-full transition-transform transform-gpu 
    hover:-translate-y-1 hover:shadow-lg">
        New Post
    </button>
    </>
  )
}

export default Header