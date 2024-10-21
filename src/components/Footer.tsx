import React, { useState } from 'react'
import { Github } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import TermsAndConditions from './TermsAndConditions'

export default function Footer() {
	const [isTermsDialogOpen, setIsTermsDialogOpen] = useState(false)

	return (
		<footer className="bg-white border-t mt-auto">
			<div className="container mx-auto px-4 py-6 flex flex-col sm:flex-row justify-between items-center">
				<p className="text-sm text-gray-600 mb-4 sm:mb-0">
					Sin cookies, sin tracking, 100% open source y gratis
				</p>
				<div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
					<button
						onClick={() => setIsTermsDialogOpen(true)}
						className="text-sm text-blue-600 hover:underline"
					>
						Al utilizar esta plataforma, aceptás nuestros Términos y Condiciones.
					</button>
					<a href="https://github.com/yourusername/esponzi" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
						<Github className="h-5 w-5" />
					</a>
				</div>
			</div>

			<Dialog open={isTermsDialogOpen} onOpenChange={setIsTermsDialogOpen}>
				<DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
					<DialogHeader>
						<DialogTitle>Términos y Condiciones</DialogTitle>
					</DialogHeader>
					<TermsAndConditions />
				</DialogContent>
			</Dialog>
		</footer>
	)
}
