import yaml from 'yaml'

export async function loadDataFromYAML(file: string) {
	try {
		const response = await fetch(file)
		if (!response.ok) {
			throw new Error('Error al cargar el archivo YAML')
		}
		const textData = await response.text()
		const data = yaml.parse(textData)
		return data
	} catch (error) {
		console.error('Error al cargar los datos:', error)
		throw error // Re-lanzamos el error para manejarlo en el componente que llama a esta función
	}
}
