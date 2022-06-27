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
  border-width: ${({ theme }) => theme.border.thin};
`;

export const Input = styled.input`
  width: 100%;
  font-size: inherit;
  font-family: var(--font-mono);
  border-width: ${({ theme }) => theme.border.thin};
  border-radius: 0;
  padding: ${({ theme }) => theme.space.s_1};
  background: ${({ theme }) => theme.color.light};
`;
