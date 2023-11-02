import styled from 'styled-components';
import React from 'react';

export const SearchButton = styled.button.attrs(props => ({
  type: 'button',
  className: 'btn btn-info btn-flat',
  disabled: props.disabled,
}))``;

export const ButtonIcon = styled(props => (
  <i className={props.className} />
)).attrs(props => ({
  className: !props.loading ? props.icon : 'la la-spinner',
}))``;
