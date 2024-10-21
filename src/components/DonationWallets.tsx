import React from 'react'
import { Bitcoin, Coins, Heart } from 'lucide-react'
import { Input } from "@/components/ui/input"

const walletAddresses = [
	{ type: 'Bitcoin', address: 'bc1qpllhlmatm4wdr3f8v8thwkl4g6uh8h58k0ps5d', icon: Bitcoin },
	{ type: 'Ethereum', address: '0x558292761BD0e7a4Cc68f514f429234B434f7E38', icon: Coins },
	{ type: 'Cardano', address: 'addr1q98tvtmev548vdzn52kwns53j4gtgq5xhcz0qkf0f0my6mlyguxfuw9k5dre7t0gadwfu5r4m60f6nllsmjletnqycksume0zt', icon: Heart },
]

export default function DonationWallets() {
	return (
		<div>
			<h2 className="font-semibold mb-2">Donar con criptomonedas</h2>
			<div className="space-y-2">
				{walletAddresses.map((wallet, index) => (
					<div key={index} className="flex items-center gap-2">
						<wallet.icon className="h-5 w-5" />
						<span className="font-medium">{wallet.type}:</span>
						<Input
							value={wallet.address}
							readOnly
							className="flex-1 text-xs"
							onClick={(e) => e.currentTarget.select()}
						/>
					</div>
				))}
			</div>
		</div>
	)
}
