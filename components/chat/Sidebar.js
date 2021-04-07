import styled from "styled-components";
import SearchIcon from "@material-ui/icons/Search";
import { Button } from "@material-ui/core";

function Sidebar() {

  const createChat = () => {
      const input = prompt(
          "Enter email"
      );

      if (!input) return null;

      if (!chatAlreadyExists(input) && input !== user) {

      }
  }   

  const chatAlreadyExists = (user) => {

  }

  return (
    <Container>
      <Search>
        <SearchIcon />
        <SearchInput placeholder="Search in chats"/>
      </Search>

      <SidebarButton onClick={createChat}>Start a new chat</SidebarButton>

      {/* List of Chats */}

    </Container>
  );
}

export default Sidebar;

const Container = styled.div``;

const Search = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 2px;
`;

const SidebarButton = styled(Button)`
  width: 100%;

  &&& {
      border-top: 1px solid whitesmoke;
      border-bottom: 1px solid whitesmoke;
  }
`;

const SearchInput = styled.input`
  outline-width: 0;
  border: none;
  flex: 1;
`;