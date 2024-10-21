import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface EducationalResourcesProps {
	resources: any[]
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
		<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
			{resources.map((resource, index) => (
				<Card
					key={index}
					className="hover:shadow-lg cursor-pointer bg-gray-800 text-white"
					onClick={() => handleCardClick(resource.url)}
				>
					<CardHeader>
						<CardTitle className="text-white">{resource.title}</CardTitle>
						<CardDescription className="text-gray-400">{resource.type}</CardDescription>
					</CardHeader>

					<CardContent>
						<p className="text-gray-300">{resource.description}</p>
					</CardContent>
				</Card>
			))}
		</div>
	)
}
