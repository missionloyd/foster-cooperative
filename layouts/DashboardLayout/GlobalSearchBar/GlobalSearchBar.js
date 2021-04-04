import React, { useEffect, useReducer } from 'react';
import Popover from '@material-ui/core/Popover';
import SearchBar from './SearchBar';
import Item from './Item';
import Box from '@material-ui/core/Box';

// Initial State And Reducer Function
const initialState = {
  isLoading: true,
  data: [],
  search: '',
  searchData: [],
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_DATA':
      return {
        ...state,
        data: action.payload,
        isLoading: false,
      }
    case 'SEARCH_INPUT':
      return { ...state, search: action.payload }
    case 'SEARCH_DATA':
      return { ...state, searchData: action.payload }
    default:
      throw new Error()
  }
}

// The Component
const GlobalSearchBar = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [anchorEl, setAnchorEl] = React.useState(null);

  // Async Fetch
  const fetchData = async url => {
    try {
      const res = await fetch(url)
      const data = await res.json()
      dispatch({ type: 'SET_DATA', payload: data })
    } catch (err) {
      console.log('Error:', err)
    }
  }

  useEffect(() => {
    fetchData('https://jsonplaceholder.typicode.com/posts')
  }, [])

  // Search And Highlight Function
  const handleInput = e => {
    let str = e.target.value
    dispatch({ type: 'SEARCH_INPUT', payload: str })
    const newArr = state.data
      .filter(
        item =>
          item.title.toLowerCase().includes(str.toLowerCase()) ||
          item.body.toLowerCase().includes(str.toLowerCase())
      )
      .map(item => {
        let newTitle = item.title.replace(
          new RegExp(str, 'gi'),
          match =>
            `<mark style="background: #2769AA; color: white;">${match}</mark>`
        )
        let newBody = item.body.replace(
          new RegExp(str, 'gi'),
          match =>
            `<mark style="background: #2769AA; color: white;">${match}</mark>`
        )
        return {
          ...item,
          title: newTitle,
          body: newBody,
        }
      })

    dispatch({ type: 'SEARCH_DATA', payload: newArr })
    handleOpen(e);
  };

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'popover' : undefined;

  // Return Statement
  return (
      <div>
      <SearchBar onInput={e => handleInput(e)} classes={props.classes} autoFocus={true}/>
      <Popover
      id={id}
      open={Boolean(anchorEl)} 
      //state.searchData > "0"
      hidden={!(state.search.length > 2)}
      disableAutoFocus
      onKeyDown={handleClose}
      anchorEl={anchorEl}
      style={{marginTop: "2.5rem"}}
      onClick={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}  
    >
      <Box p={1}>
        {state.isLoading ? (
          <p>Loading...</p>
        ) : state.search.length > 2 && state.searchData > "0"? (
          state.searchData.map(post => (
            <Item
              key={post.id}
              user={post.userId}
              title={post.title}
              body={post.body}
            />
          ))
        ) : (<Item
            key={id}
            user={"System"}
            title={"No results Found..."}
        />)}
      </Box>
    </Popover>
    </div>
  );
}

export default GlobalSearchBar