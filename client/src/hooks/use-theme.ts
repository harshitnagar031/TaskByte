import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'light' | 'dark' | 'system';

interface ThemeStore {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: 'system',
      setTheme: (theme) => {
        set({ theme });
        // Update the data-theme attribute on the html element
        const html = document.documentElement;
        if (theme === 'system') {
          const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
          html.setAttribute('data-theme', systemTheme);
        } else {
          html.setAttribute('data-theme', theme);
        }
      },
    }),
    {
      name: 'theme-storage',
    }
  )
);

export const useTheme = () => {
  const { theme, setTheme } = useThemeStore();
  return { theme, setTheme };
};
