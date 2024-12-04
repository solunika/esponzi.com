import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Book, ExternalLink } from 'lucide-react'

interface Resource {
	title: string
	type: string
	description: string
	url: string
}

interface EducationalResourcesProps {
	resources: Resource[]
}

export default function EducationalResources({ resources }: EducationalResourcesProps) {
	const handleCardClick = (url: string) => {
		try {
			if (url && url !== "#") {
				window.open(url, "_blank", "noopener,noreferrer");
			}
		} catch (error) {
			console.error("Error al abrir el enlace:", error);
		}
	};

	return (
		<div className="space-y-6">
			<div className="p-4 bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-xl text-white">
				<h2 className="text-xl font-bold flex items-center gap-2">
					<Book className="h-5 w-5" />
					Material Educativo
				</h2>
				<p className="text-indigo-100 mt-1">Recursos para entender y prevenir fraudes financieros</p>
			</div>

			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				{resources.map((resource, index) => (
					<Card
						key={index}
						className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-gray-200 overflow-hidden"
						onClick={() => handleCardClick(resource.url)}
					>
						<div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity">
							<ExternalLink className="h-4 w-4 text-gray-400" />
						</div>
						<CardHeader className="space-y-1 pb-4">
							<CardTitle className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-indigo-800">
								{resource.title}
							</CardTitle>
							<CardDescription className="flex items-center gap-2">
								<span className="px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700 border border-indigo-200">
									{resource.type}
								</span>
							</CardDescription>
						</CardHeader>

						<CardContent>
							<p className="text-gray-600 line-clamp-3 group-hover:text-gray-900 transition-colors">
								{resource.description}
							</p>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	)
}
