import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SitesTable from './SitesTable'
import EducationalResources from './EducationalResources'
import SuggestSiteDialog from './SuggestSiteDialog'
import { Site } from './SitesTable'
import { Table2, BookOpen, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Resource {
	title: string
	type: string
	description: string
	url: string
}

interface MainContentProps {
	sites: Site[]
	resources: Resource[]
}

export default function MainContent({ sites, resources }: MainContentProps) {
	const [isDialogOpen, setIsDialogOpen] = useState(false)

	return (
		<main className="flex-grow container mx-auto px-4 py-8 max-w-7xl">
			<div className="flex justify-between items-center mb-6">
				<div>
					<h1 className="text-2xl font-bold text-gray-900">Panel de Control</h1>
					<p className="text-gray-600">Monitoreo y educación sobre fraudes financieros</p>
				</div>
				<Button
					onClick={() => setIsDialogOpen(true)}
					className="bg-blue-600 hover:bg-blue-700 text-white"
				>
					<Plus className="h-4 w-4 mr-2" />
					Sugerir Sitio
				</Button>
			</div>

			<div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
				<Tabs defaultValue="sites" className="w-full">
					<div className="border-b border-gray-200">
						<TabsList className="h-auto p-0">
							<TabsTrigger
								value="sites"
								className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 px-6 py-3 flex items-center gap-2"
							>
								<Table2 className="h-4 w-4" />
								Sitios Reportados
							</TabsTrigger>
							<TabsTrigger
								value="education"
								className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 px-6 py-3 flex items-center gap-2"
							>
								<BookOpen className="h-4 w-4" />
								Material Educativo
							</TabsTrigger>
						</TabsList>
					</div>

					<div className="p-6">
						<TabsContent value="sites" className="m-0">
							<SitesTable sites={sites} />
						</TabsContent>
						<TabsContent value="education" className="m-0">
							<EducationalResources resources={resources} />
						</TabsContent>
					</div>
				</Tabs>
			</div>

			<SuggestSiteDialog isOpen={isDialogOpen} setIsOpen={setIsDialogOpen} />
		</main>
	)
}
