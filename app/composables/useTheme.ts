type ThemeOption = 'light' | 'dark' | 'system'

export function useTheme() {
    const preference = useState<ThemeOption>('theme-preference', () => 'system')
    const resolved = useState<'light' | 'dark'>('theme-resolved', () => 'dark')

    const applyTheme = (theme: 'light' | 'dark') => {
        resolved.value = theme
        if (import.meta.client) {
            document.documentElement.classList.toggle('dark', theme === 'dark')
            document.documentElement.classList.toggle('light', theme === 'light')
        }
    }

    const resolveSystemTheme = (): 'light' | 'dark' => {
        if (import.meta.client) {
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
        }
        return 'dark'
    }

    const setTheme = (option: ThemeOption) => {
        preference.value = option
        if (import.meta.client) {
            localStorage.setItem('theme-preference', option)
        }

        if (option === 'system') {
            applyTheme(resolveSystemTheme())
        } else {
            applyTheme(option)
        }
    }

    const init = () => {
        if (!import.meta.client) return

        const saved = localStorage.getItem('theme-preference') as ThemeOption | null
        const pref = saved || 'system'
        preference.value = pref

        if (pref === 'system') {
            applyTheme(resolveSystemTheme())
        } else {
            applyTheme(pref)
        }

        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (preference.value === 'system') {
                applyTheme(e.matches ? 'dark' : 'light')
            }
        })
    }

    return {
        preference,
        resolved,
        setTheme,
        init,
    }
}
