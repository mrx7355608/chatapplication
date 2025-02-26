import { render, fireEvent, screen } from '@testing-library/react';
import ThemeSelector from '@/components/theme-selector';

describe('ThemeSelector', () => {
  
  beforeEach(() => {
    // Mock localStorage
    Storage.prototype.setItem = jest.fn();
    Storage.prototype.getItem = jest.fn().mockReturnValue(null); // Default is null for initial tests
  });

  it('should update the main html tag\'s attribute data-theme to the selected theme', () => {
    render(<ThemeSelector />);
    
    const draculaThemeButton = screen.getByLabelText('Dracula');
    
    fireEvent.click(draculaThemeButton);
    
    expect(document.documentElement.getAttribute('data-theme')).toBe('dracula');
  });

  it('should create/update a cookie when the theme is updated', () => {
    render(<ThemeSelector />);
    
    const cyberpunkThemeButton = screen.getByLabelText('Cyberpunk');
    
    fireEvent.click(cyberpunkThemeButton);
    
    expect(localStorage.setItem).toHaveBeenCalledWith('current-theme', 'cyberpunk');
  });

});

