'use client'

import React from 'react'
import { Search, Heart, Shield, AlertTriangle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import DonationWallets from './DonationWallets'
import { useSearch } from '@/contexts/SearchContext'

export default function Header() {
	const { searchTerm, setSearchTerm } = useSearch()

	const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value)
	}

	return (
		<header className="relative bg-gradient-to-b from-gray-50 to-white border-b border-gray-200">
			<div className="absolute inset-0 bg-grid-gray-200/50 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />

			<div className="relative container mx-auto px-4 pt-8 pb-6">
				<div className="flex items-center gap-2 mb-2">
					<Shield className="h-8 w-8 text-blue-600" />
					<h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
						Esponzi.com
					</h1>
				</div>

				<div className="max-w-3xl mb-8">
					<p className="text-lg text-gray-600 leading-relaxed space-y-2">
						<span className="block font-medium text-gray-900 mb-2">
							Protegiendo inversores, detectando fraudes.
						</span>
						Nuestra misión es proporcionar información clara y accesible sobre esquemas fraudulentos,
						ayudando a las personas a identificar y evitar estafas financieras antes de que sea tarde.
					</p>

					<div className="flex items-center gap-2 mt-4 text-sm text-amber-800">
						<AlertTriangle className="h-4 w-4 text-amber-600" />
						<p>Investigar antes de invertir puede salvar tu patrimonio.</p>
					</div>
				</div>

				<div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
					<div className="flex-grow relative group">
						<div className="absolute inset-0 bg-blue-100 rounded-lg opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity -z-10" />
						<div className="relative flex items-center bg-white shadow-sm hover:shadow-md transition-shadow rounded-lg">
							<div className="px-4 py-3 border-r border-gray-100">
								<Search className="h-5 w-5 text-gray-400" />
							</div>
							<Input
								type="text"
								placeholder="Buscar por nombre, motivo o estado..."
								value={searchTerm}
								onChange={handleSearch}
								className="flex-grow border-none focus:ring-0 px-4 py-3 placeholder:text-gray-400"
							/>
							{searchTerm && (
								<button
									onClick={() => setSearchTerm("")}
									className="px-4 py-2 text-gray-400 hover:text-gray-600"
								>
									×
								</button>
							)}
						</div>
					</div>

					<Popover>
						<PopoverTrigger asChild>
							<Button
								variant="outline"
								className="flex items-center gap-2 bg-white hover:bg-blue-50 border-blue-200 text-blue-700 hover:text-blue-800 shadow-sm hover:shadow-md transition-all px-6"
							>
								<Heart className="h-4 w-4" />
								<span>Apoyar el Proyecto</span>
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-80 p-0">
							<div className="p-4 bg-gradient-to-r from-blue-600 to-blue-800">
								<h3 className="font-semibold text-white">Apoya nuestra misión</h3>
								<p className="text-blue-100 text-sm">Tu donación nos ayuda a mantener este recurso gratuito</p>
							</div>
							<div className="p-4">
								<DonationWallets />
							</div>
						</PopoverContent>
					</Popover>
				</div>
			</div>
		</header>
	)
}
