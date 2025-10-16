import './App.css'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import Footer from './components/Footer'
import PostList from './components/PostList'
import {useState, useEffect} from 'react';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //state for the current search query
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => {
      if(!response.ok){
        throw new Error("Network response error");
      }
      return response.json();
    })
    .then((data) => {
      setData(data);
      setLoading(false);
    })
    .catch((error) => {
      setError(error.message);
      setLoading(false);
    });
  }, []);

  if(loading) return <p>Loading ...</p>
  if(error) return <p>Error: {error}</p>


  //pass setSearchQuery down to SearchBar so it can update the query
  //pass posts and searchQuery down to PostList so it can filter and display



  return (
    <>
      <Header/>
      <SearchBar onSearch={setSearchQuery}/>
      <PostList posts={data} searchQuery={searchQuery}/>
      <Footer/>
    </>
  )
}

export default App
