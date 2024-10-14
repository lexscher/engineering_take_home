import React from 'react'
import styled from "styled-components";

export const AppWrapper = ({ children }) => <Wrapper>{children}</Wrapper>

const Wrapper = styled.div`
  height: 95vh;
  padding: 12px 175px;
  background-color: #f2f2ff;
  font-family: Arial, sans-serif;
  overflow-y: scroll;
  scrollbar-color: #5084ff #ebe6e6;
  scrollbar-width: thin;
`
