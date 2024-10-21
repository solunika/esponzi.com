import React, { useState } from 'react'
import { Search, Heart } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import DonationWallets from './DonationWallets'

export default function Header() {
	const [searchTerm, setSearchTerm] = useState("")

	const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value)
	}

	return (
		<header className="bg-white shadow-sm">
			<div className="container mx-auto px-4 py-6">
				<h1 className="text-4xl font-bold text-primary mb-2">Esponzi.com</h1>
				<p className="text-lg text-gray-600 mb-4">
					Esponzi.com, es una web que intenta ayudar a la gente a no caer en estafas de inversión.
					Nuestro objetivo es proporcionar información clara y accesible sobre posibles esquemas fraudulentos,
					ayudando a proteger a las personas de caer en trampas financieras.

					Juntos, podemos crear un entorno financiero más seguro y transparente.
				</p>
				<div className="flex justify-between items-center">
					<div className="flex items-center bg-white shadow-sm rounded-lg p-2 flex-grow mr-4">
						<Search className="mr-2 h-5 w-5 text-gray-400" />
						<Input
							type="text"
							placeholder="Buscar sitios o propuestas..."
							value={searchTerm}
							onChange={handleSearch}
							className="flex-grow border-none focus:ring-0"
						/>
					</div>
					<Popover>
						<PopoverTrigger asChild>
							<Button variant="outline" className="flex items-center gap-2">
								<Heart className="h-4 w-4" />
								Donar
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-80">
							<DonationWallets />
						</PopoverContent>
					</Popover>
				</div>
			</div>
		</header>
	)
}
