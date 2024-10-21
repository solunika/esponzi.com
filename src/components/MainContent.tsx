import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SitesTable from './SitesTable'
import EducationalResources from './EducationalResources'
import SuggestSiteDialog from './SuggestSiteDialog'

interface MainContentProps {
	sites: any[]
	resources: any[]
}

export default function MainContent({ sites, resources }: MainContentProps) {
	const [isDialogOpen, setIsDialogOpen] = useState(false)

	return (
		<main className="flex-grow container mx-auto px-4 py-8">
			<Tabs defaultValue="sites" className="space-y-4">
				<TabsList>
					<TabsTrigger value="sites">Sitios Reportados</TabsTrigger>
					<TabsTrigger value="education">Material Educativo</TabsTrigger>
				</TabsList>
				<TabsContent value="sites">
					<SitesTable sites={sites} />
				</TabsContent>
				<TabsContent value="education">
					<EducationalResources resources={resources} />
				</TabsContent>
			</Tabs>

			<SuggestSiteDialog isOpen={isDialogOpen} setIsOpen={setIsDialogOpen} />
		</main>
	)
}
