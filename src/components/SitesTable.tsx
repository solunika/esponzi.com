import React, { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Link, ArrowUpDown, AlertTriangle, ExternalLink, Info } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface Reference {
	title: string
	url: string
	type: 'news' | 'legal' | 'social'
}

export interface Site {
	name: string
	url: string
	isPonzi: boolean
	reason: string
	fecha: string
	references: Reference[]
}

interface SitesTableProps {
	sites: Site[]
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
			return sites
		}
	}, [sites, sortField, sortOrder])

	const SortableHeader = ({ field, children }: { field: SortField, children: React.ReactNode }) => (
		<TableHead
			onClick={() => handleSort(field)}
			className="font-semibold cursor-pointer bg-gray-50/50 hover:bg-gray-100/50 transition-colors"
		>
			<div className="flex items-center justify-between">
				<span>{children}</span>
				<ArrowUpDown className={`ml-2 h-4 w-4 transition-colors ${sortField === field
						? 'text-blue-600'
						: 'text-gray-400'
					}`} />
			</div>
		</TableHead>
	)

	return (
		<div className="space-y-4">
			<div className="p-4 bg-gradient-to-r from-red-500/10 to-red-600/10 border border-red-200 rounded-lg flex items-start gap-3">
				<AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
				<div>
					<h3 className="font-semibold text-red-900">Advertencia de Riesgo</h3>
					<p className="text-sm text-red-800">
						Los sitios listados aquí han sido reportados como potencialmente fraudulentos.
						Investigue cuidadosamente antes de realizar cualquier inversión.
					</p>
				</div>
			</div>

			<div className="rounded-xl border border-gray-200 overflow-hidden bg-white">
				<div className="overflow-x-auto">
					<Table>
						<TableHeader>
							<TableRow className="hover:bg-gray-50/50 [&>th]:py-4">
								<SortableHeader field="name">Nombre del Sitio</SortableHeader>
								<TableHead className="font-semibold bg-gray-50/50">Enlace</TableHead>
								<SortableHeader field="isPonzi">Estado</SortableHeader>
								<SortableHeader field="fecha">Fecha Reporte</SortableHeader>
								<TableHead className="font-semibold bg-gray-50/50">Motivo</TableHead>
								<TableHead className="font-semibold bg-gray-50/50 text-right">Referencias</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{sortedSites.map((site, index) => (
								<TableRow key={index} className="hover:bg-gray-50/75 transition-colors group">
									<TableCell className="font-medium">{site.name}</TableCell>
									<TableCell>
										<a
											href={site.url}
											target="_blank"
											rel="noopener noreferrer"
											className="text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1.5 w-fit group-hover:gap-2 transition-all"
										>
											<span className="truncate max-w-[300px]">{site.url}</span>
											<ExternalLink className="h-3.5 w-3.5 flex-shrink-0" />
										</a>
									</TableCell>
									<TableCell>
										<span className={`
											inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium
											${site.isPonzi
												? 'bg-red-100 text-red-800 border border-red-200'
												: 'bg-green-100 text-green-800 border border-green-200'
											}
										`}>
											<span className={`w-1.5 h-1.5 rounded-full ${site.isPonzi ? 'bg-red-500' : 'bg-green-500'
												}`} />
											{site.isPonzi ? 'Ponzi' : 'No Ponzi'}
										</span>
									</TableCell>
									<TableCell>
										<span className="text-gray-600 font-medium">{site.fecha}</span>
									</TableCell>
									<TableCell className="max-w-xs">
										<div className="flex items-center gap-2">
											<p className="text-gray-600 truncate">{site.reason}</p>
											<Popover>
												<PopoverTrigger>
													<Info className="h-4 w-4 text-gray-400 hover:text-gray-600 flex-shrink-0" />
												</PopoverTrigger>
												<PopoverContent className="w-80">
													<p className="text-sm text-gray-600">{site.reason}</p>
												</PopoverContent>
											</Popover>
										</div>
									</TableCell>
									<TableCell className="text-right">
										<Popover>
											<PopoverTrigger asChild>
												<Button
													variant="outline"
													size="sm"
													className="hover:bg-blue-50 border-blue-200 text-blue-700"
												>
													<Link className="h-4 w-4 mr-1.5" />
													<span className="mr-1">Referencias</span>
													<span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 text-xs flex items-center justify-center">
														{site.references?.length || 0}
													</span>
												</Button>
											</PopoverTrigger>
											<PopoverContent className="w-80 p-0">
												<div className="p-4 bg-gradient-to-r from-blue-600 to-blue-800">
													<h3 className="font-semibold text-white">Referencias en la red</h3>
													<p className="text-blue-100 text-sm">Fuentes verificadas</p>
												</div>
												<div className="p-2">
													{site.references?.length > 0 ? (
														<ul className="divide-y divide-gray-100">
															{site.references.map((ref, refIndex) => (
																<li key={refIndex} className="p-2 hover:bg-gray-50 rounded-lg">
																	<div className="flex items-start gap-2">
																		<span className={`
																			px-2 py-1 rounded-md text-xs font-medium shrink-0
																			${ref.type === 'news'
																				? 'bg-blue-100 text-blue-800 border border-blue-200'
																				: ref.type === 'social'
																					? 'bg-green-100 text-green-800 border border-green-200'
																					: 'bg-amber-100 text-amber-800 border border-amber-200'
																			}
																		`}>
																			{ref.type}
																		</span>
																		<a
																			href={ref.url}
																			target="_blank"
																			rel="noopener noreferrer"
																			className="text-gray-700 hover:text-blue-600 hover:underline text-sm flex-1 group"
																		>
																			<span className="flex items-center gap-1.5 group-hover:gap-2 transition-all">
																				<span>{ref.title}</span>
																				<ExternalLink className="h-3 w-3 text-gray-400" />
																			</span>
																		</a>
																	</div>
																</li>
															))}
														</ul>
													) : (
														<p className="text-sm text-gray-500 p-4 text-center">
															No hay referencias disponibles
														</p>
													)}
												</div>
											</PopoverContent>
										</Popover>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</div>
		</div>
	)
}
