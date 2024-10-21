import React, { useState, useMemo } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Link, ArrowUpDown } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface SitesTableProps {
	sites: any[]
}

type SortField = 'name' | 'fecha' | 'isPonzi'
type SortOrder = 'asc' | 'desc'

export default function SitesTable({ sites }: SitesTableProps) {
	const [sortField, setSortField] = useState<SortField>('fecha')
	const [sortOrder, setSortOrder] = useState<SortOrder>('desc')

	const handleSort = (field: SortField) => {
		if (field === sortField) {
			setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
		} else {
			setSortField(field)
			setSortOrder('asc')
		}
	}

	const sortedSites = React.useMemo(() => {
		try {
			return [...sites].sort((a, b) => {
				let comparison = 0
				if (sortField === 'name') {
					comparison = a.name.localeCompare(b.name)
				} else if (sortField === 'fecha') {
					comparison = new Date(a.fecha).getTime() - new Date(b.fecha).getTime()
				} else if (sortField === 'isPonzi') {
					comparison = (a.isPonzi === b.isPonzi) ? 0 : a.isPonzi ? -1 : 1
				}
				return sortOrder === 'asc' ? comparison : -comparison
			})
		} catch (error) {
			console.error('Error al ordenar los sitios:', error)
			return sites // Devuelve los sitios sin ordenar en caso de error
		}
	}, [sites, sortField, sortOrder])

	const SortableHeader = ({ field, children }: { field: SortField, children: React.ReactNode }) => (
		<TableHead className="font-semibold cursor-pointer" onClick={() => handleSort(field)}>
			<div className="flex items-center">
				{children}
				<ArrowUpDown className="ml-2 h-4 w-4" />
			</div>
		</TableHead>
	)

	return (
		<div className="bg-white shadow-sm rounded-lg overflow-hidden">
			<Table>
				<TableHeader>
					<TableRow>
						<SortableHeader field="name">Nombre</SortableHeader>
						<TableHead className="font-semibold">Enlace</TableHead>
						<SortableHeader field="isPonzi">Estado</SortableHeader>
						<SortableHeader field="fecha">Fecha</SortableHeader>
						<TableHead className="font-semibold">Motivo</TableHead>
						<TableHead className="font-semibold">Referencias</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{sortedSites.map((site, index) => (
						<TableRow key={index} className="hover:bg-gray-50">
							<TableCell className="font-medium">{site.name}</TableCell>
							<TableCell>
								<a href={site.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
									{site.url}
								</a>
							</TableCell>
							<TableCell>
								<span className={`px-2 py-1 rounded-full text-xs font-semibold ${site.isPonzi ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
									{site.isPonzi ? 'Ponzi' : 'No Ponzi'}
								</span>
							</TableCell>
							<TableCell className="text-sm text-gray-600">{site.fecha}</TableCell>
							<TableCell className="text-sm text-gray-600">{site.reason}</TableCell>
							<TableCell>
								<Popover>
									<PopoverTrigger asChild>
										<Button variant="outline" size="sm">
											<Link className="h-4 w-4 mr-2" />
											Referencias
										</Button>
									</PopoverTrigger>
									<PopoverContent className="w-80">
										<h3 className="font-semibold mb-2">Referencias en la red</h3>
										<ul className="space-y-2">
											{site.references && site.references.map((ref: any, refIndex: number) => (
												<li key={refIndex} className="flex items-start">
													<span className={`px-2 py-1 rounded text-xs font-semibold mr-2 ${ref.type === 'news' ? 'bg-blue-100 text-blue-800' :
														ref.type === 'social' ? 'bg-green-100 text-green-800' :
															'bg-yellow-100 text-yellow-800'
														}`}>
														{ref.type}
													</span>
													<a href={ref.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">
														{ref.title}
													</a>
												</li>
											))}
										</ul>
									</PopoverContent>
								</Popover>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	)
}
