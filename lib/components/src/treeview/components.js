import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import Icons from '../icons/util/index';

export const Container = styled.div(({ theme }) => ({
  background: `linear-gradient(to bottom, ${theme.asideStripe}, ${
    theme.asideStripe
  } 50%, transparent 50%, transparent)`,
  backgroundSize: '100% 80px',
}));
export const TreeWrapper = styled.div({});
TreeWrapper.displayName = 'TreeWrapper';

export const ListWrapper = styled.div({});
ListWrapper.displayName = 'ListWrapper';

export const A = styled.a({
  height: 40,
  display: 'flex',
  alignItems: 'center',
  color: 'inherit',
  textDecoration: 'none',
});
A.displayName = 'A';

const FilterField = styled.input(({ theme }) => ({
  height: 24,
  boxSizing: 'border-box',
  width: `calc(100% - ${1 * theme.layoutMargin}px)`,
  background: theme.inputFill,
  border: '0 none',
  marginLeft: theme.layoutMargin,
  marginRight: theme.layoutMargin,
  marginBottom: theme.layoutMargin,
  color: theme.mainTextColor,
  padding: theme.layoutMargin,
  paddingLeft: 0,
  borderBottom: '1px solid rgba(0, 0, 0, 0.05)',

  '&:focus': {
    outline: 0,
    borderBottom: `1px solid ${theme.highlightColor}`,
  },
}));

export class Filter extends Component {
  state = {
    placeholder: 'Press "/" to search...',
  };

  set = e => {
    this.setState({
      placeholder: e.type === 'focus' ? 'Type to search...' : 'Press "/" to search...',
    });
  };

  render() {
    const { placeholder } = this.state;
    return (
      <FilterField onFocus={this.set} onBlur={this.set} {...this.props} placeholder={placeholder} />
    );
  }
}

export const LeafStyle = styled.div(
  {
    height: 40,
    display: 'flex',
    alignItems: 'center',
    flex: 1,
  },
  ({ depth, theme }) => ({
    paddingLeft: theme.layoutMargin + depth * (theme.layoutMargin * 2),
  }),
  ({ isSelected, theme }) =>
    theme.asideSelected && isSelected
      ? theme.asideSelected
      : {
          background: isSelected ? '#CFD8DC' : 'transparent',
        }
);

const RotatingChevron = styled(Icons.ChevronRight)(
  {
    transition: 'transform .1s linear',
    marginRight: 10,
  },
  ({ isRotated = false }) =>
    isRotated
      ? {
          transform: 'rotateZ(90deg)',
        }
      : {}
);

export const DefaultLeaf = ({ name, ...rest }) => <LeafStyle {...rest}>{name}</LeafStyle>;
DefaultLeaf.displayName = 'DefaultLeaf';
DefaultLeaf.propTypes = {
  name: PropTypes.node.isRequired,
  depth: PropTypes.number.isRequired,
};
export const DefaultHead = ({ name, depth, isExpanded = true, isSelected }) => (
  <LeafStyle isSelected={isSelected} depth={depth}>
    <RotatingChevron isRotated={isExpanded ? true : undefined} />
    <strong>{name}</strong>
  </LeafStyle>
);
DefaultHead.displayName = 'DefaultHead';
DefaultHead.propTypes = {
  name: PropTypes.node.isRequired,
  depth: PropTypes.number.isRequired,
};

export const Link = ({ href, children, path, ...rest }) => (
  <A href={href} {...rest}>
    {children}
  </A>
);
Link.displayName = 'Link';
Link.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  path: PropTypes.string.isRequired,
};