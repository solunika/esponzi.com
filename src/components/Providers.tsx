import { SearchProvider } from '@/contexts/SearchContext'
import { ReactNode } from 'react'

export function Providers({ children }: { children: ReactNode }) {
	return (
		<SearchProvider>
			{children}
		</SearchProvider>
	)
} 