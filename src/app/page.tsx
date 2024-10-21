"use client"

import React, { useState, useEffect } from 'react'
import Header from '@/components/Header'
import MainContent from '@/components/MainContent'
import Footer from '@/components/Footer'
import { loadDataFromYAML } from '@/utils/dataLoader'

export default function App() {
  const [sites, setSites] = useState([])
  const [resources, setResources] = useState([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sitesData = await loadDataFromYAML('/pages.yaml')
        const resourcesData = await loadDataFromYAML('/educational_resources.yaml')
        setSites(sitesData)
        setResources(resourcesData)
      } catch (error) {
        console.error('Error al cargar los datos:', error)
        setError('Hubo un problema al cargar los datos. Por favor, intenta de nuevo más tarde.')
      }
    }
    fetchData()
  }, [])

  if (error) {
    return <div className="text-center text-red-500 p-4">{error}</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900 flex flex-col">
      <Header />
      <MainContent sites={sites} resources={resources} />
      <Footer />
    </div>
  )
}
