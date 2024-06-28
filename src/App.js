import { AppContext } from './context/AppContext';
import { useContext, useEffect } from 'react';
import { Route, Routes, useLocation, useSearchParams } from 'react-router-dom';
import Home from './pages/Home';
import BlogPage from './pages/BlogPage';


function App() {
  const {fetchData,setCategory,setTag} = useContext(AppContext)
  const location = useLocation()
  const [searchParams,setSearchParams] = useSearchParams() 

  useEffect(()=>{
    const page = searchParams.get('page')?? 1
    if(location.pathname.includes('tag')){
      setTag(location.pathname.split('/').at(-1).replaceAll("-",' '))
    }
    else if(location.pathname.includes('categories')){
      setCategory(location.pathname.split('/').at(-1).replaceAll('-',' '))
    }
    else{
      setTag(null)
      setCategory([])
    }
  },[location.pathname,location.search])

  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/blogs/:blogId' element={<BlogPage/>}/>
      <Route path='/tags/:tagId' element={<Home/>}/>
      <Route path='/categories/:category' element={<Home/>}/>
    </Routes>
  );
}

export default App;
