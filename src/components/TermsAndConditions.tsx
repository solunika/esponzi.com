import React from 'react'

const termsAndConditions = `
# Términos y Condiciones de Esponzi.com

## 1. Aceptación de los Términos

Al acceder y utilizar Esponzi.com, usted acepta cumplir con estos Términos y Condiciones. Si no está de acuerdo con alguna parte de estos términos, no podrá utilizar nuestros servicios.

## 2. Uso del Servicio

Esponzi.com es una plataforma diseñada para detectar y concientizar sobre estafas Ponzi. Nuestro servicio proporciona información y recursos educativos, pero no debe considerarse como asesoramiento financiero o legal.

## 3. Contenido del Usuario

Al enviar información o sugerencias a Esponzi.com, usted garantiza que tiene el derecho de hacerlo y nos otorga una licencia no exclusiva para usar, modificar y distribuir dicho contenido.

## 4. Precisión de la Información

Aunque nos esforzamos por proporcionar información precisa y actualizada, no podemos garantizar la exactitud, integridad o actualidad de toda la información presentada en Esponzi.com.

## 5. Limitación de Responsabilidad

Esponzi.com no se hace responsable de ningún daño directo, indirecto, incidental, consecuente o punitivo que surja del uso o la imposibilidad de usar nuestros servicios.

## 6. Modificaciones de los Términos

Nos reservamos el derecho de modificar estos Términos y Condiciones en cualquier momento. Los cambios entrarán en vigor inmediatamente después de su publicación en Esponzi.com.

## 7. Ley Aplicable

Estos Términos y Condiciones se regirán e interpretarán de acuerdo con las leyes del país en el que Esponzi.com está registrado, sin tener en cuenta sus disposiciones sobre conflictos de leyes.

Al utilizar Esponzi.com, usted reconoce haber leído, entendido y aceptado estos Términos y Condiciones.
`

export default function TermsAndConditions() {
	return (
		<div className="prose prose-sm max-w-none">
			{termsAndConditions.split('\n').map((line, index) => {
				if (line.startsWith('# ')) {
					return <h1 key={index} className="text-2xl font-bold mt-4 mb-2">{line.slice(2)}</h1>
				} else if (line.startsWith('## ')) {
					return <h2 key={index} className="text-xl font-semibold mt-3 mb-1">{line.slice(3)}</h2>
				} else if (line.trim() !== '') {
					return <p key={index} className="my-1">{line}</p>
				}
				return null
			})}
		</div>
	)
}
