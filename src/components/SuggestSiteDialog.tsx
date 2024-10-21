import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface SuggestSiteDialogProps {
	isOpen: boolean
	setIsOpen: (isOpen: boolean) => void
}

export default function SuggestSiteDialog({ isOpen, setIsOpen }: SuggestSiteDialogProps) {
	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button>Sugerir un sitio</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Sugerir un sitio</DialogTitle>
				</DialogHeader>
				{/* Aquí iría el formulario para sugerir un sitio */}
				<p>Formulario para sugerir un sitio (pendiente de implementar)</p>
			</DialogContent>
		</Dialog>
	)
}
