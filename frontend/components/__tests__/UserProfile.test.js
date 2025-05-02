import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { getFullName } from '../UserProfile'
import UserProfile from '../UserProfile'

// Unit tests for the helper function
describe('unit tests for getFullName', () => {
  it('should return the full name when provided both first and last names', () => {
    expect(getFullName('Gabe', 'Newell')).toBe('Gabe Newell');
  });

  it('should return only the last name when the first name is missing', () => {
    expect(getFullName(undefined, 'Newell')).toBe('Newell');
  });

  it('should return only the first name when the last name is missing', () => {
    expect(getFullName('Gabe', undefined)).toBe('Gabe');
  });

  it('should return "Anonymous" when both names are missing', () => {
    expect(getFullName(undefined, undefined)).toBe('Anonymous');
    expect(getFullName('', '')).toBe('Anonymous');
  });
});

// React Testing Library tests for the UserProfile component
describe('RTL tests for UserProfile', () => {
  const mockProps = {
    fname: 'Gabe',
    lname: 'Newell',
    email: 'gaben@valvesoftware.com',
    location: 'Bellevue, WA'
  };

  it('should render user profile correctly with provided props', () => {
    render(<UserProfile {...mockProps} />);

    expect(screen.getByText('Gabe Newell')).toBeInTheDocument();

    const profileImage = screen.getByAltText('Profile picture');
    expect(profileImage).toBeInTheDocument();
    expect(profileImage.src).toContain('gabe.png');

    expect(screen.getByRole('button', { name: 'Follow' })).toBeInTheDocument();

    expect(screen.getByTestId('location')).toHaveTextContent('Bellevue, WA');

    const emailLink = screen.getByText('gaben@valvesoftware.com');
    expect(emailLink).toBeInTheDocument();
    expect(emailLink).toHaveAttribute('href', 'mailto:gaben@valvesoftware.com');

    expect(screen.getByLabelText('Search posts:')).toBeInTheDocument();
    const searchInput = screen.getByRole('textbox', { name: 'Search posts:' });
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveValue('Search...');
    expect(searchInput).toHaveAttribute('readonly');

    expect(screen.getByTestId('user-profile')).toBeInTheDocument();
  });

  it('should render "Anonymous" when no names are provided', () => {
    render(<UserProfile />);
    expect(screen.getByText('Anonymous')).toBeInTheDocument();
  });

  it('should render only the first name when only the first name is provided', () => {
    render(<UserProfile fname="Gordon" />);
    expect(screen.getByText('Gordon')).toBeInTheDocument();
  });

  it('should render only the last name when only the last name is provided', () => {
    render(<UserProfile lname="Freeman" />);
    expect(screen.getByText('Freeman')).toBeInTheDocument();
  });
});
