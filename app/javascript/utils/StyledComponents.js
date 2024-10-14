import styled from "styled-components";

export const Divider = styled.div`
  border-top: 8px solid #5084ff;
  border-radius: 4px;
  margin: 5px 0;
`

export const Button = styled.button`
  background-color: #2364ff;
  color: white;
  padding: 7px 15px;
  margin: 8px 0;
  border: none;
  border-radius: 2px;
  cursor: pointer;
  font-size: 16px;
  transition: 0.3s;

  &:hover {
    background-color: black;
  }
`;

export const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ListItem = styled.li`
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 32px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;

  
  &:hover {
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
  }

  &:not(:last-child) {
    margin-bottom: 15px;
  }
`;

export const MiniListItem = styled.li`
  background-color: black;
  color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
  margin-bottom: 15px;
  
  &:hover {
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
  }
`;

export const BigFormWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  background-color: #cad8ff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: row;
`;

export const FormWrapper = styled.div`
  width: 250px;
  max-height: 275px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const ScrollingFormWrapper = styled.div`
  width: 250px;
  height: 425px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow-y: scroll;
  scrollbar-color: #5084ff #ebe6e6;
  scrollbar-width: thin;
`;

export const Label = styled.label`
  font-size: 14px;
  margin-bottom: 5px;
  display: block;
  color: #333;
`;

export const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin: 8px 0;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  transition: 0.3s;

  &:focus {
    border-color: #371b30;
    outline: none;
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin: 8px 0;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
  background-color: white;
  font-size: 16px;
  color: #333;
  transition: 0.3s;

  &:focus {
    border-color: #371b30;
    outline: none;
  }

  option {
    background-color: white;
    color: #333;
  }
`;
