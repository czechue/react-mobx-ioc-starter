import styled from "styled-components";

export const Button = styled.button`
  font-size: inherit;
  font-weight: 700;
  display: inline-block;
  cursor: pointer;
  line-height: 1.1;
  color: ${({ theme }) => theme.color.primaryText};
  background-color: ${({ theme }) => theme.color.dark};
  padding: 0.5em 1.5em 0.7em;
`;
