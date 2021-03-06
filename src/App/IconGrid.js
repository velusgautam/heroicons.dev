import Context from "./Context"
import copyToClipboard from "./helpers/copyToClipboard"
import Icon from "./Icon"
import React from "react"

const IconCard = React.memo(({ status, outline, solid, ...props }) => {
	const ref = React.useRef()

	const ctx = React.useContext(Context)
	const [text, setText] = React.useState(props.name)

	// TODO: Add paper-clip icon to copied!
	const handleClick = async e => {
		const { outerHTML } = ref.current
		if (!navigator.clipboard) {
			copyToClipboard(outerHTML)
			setText("copied!")
			setTimeout(() => {
				setText(props.name)
			}, 1e3)
		} else {
			try {
				await navigator.clipboard.writeText(outerHTML)
			} catch (error) {
				console.error(error)
				return
			}
		}
		setText("copied!")
		setTimeout(() => {
			setText(props.name)
		}, 1e3)
	}

	return (
		<div className="pb-1/1 relative">
			<div className="absolute inset-0">
				<button className="p-3 flex flex-row justify-center items-center w-full h-full text-gray-800 dark:text-gray-100 hover:text-gray-100 bg-white dark:bg-gray-800 hover:bg-indigo-500 rounded-lg-xl focus:outline-none shadow focus:shadow-outline transition duration-150" onPointerDown={e => e.preventDefault()} onClick={handleClick}>
					<Icon
						ref={ref}
						className="w-8 h-8"
						svg={!ctx.solid ? outline : solid}
					/>
					<div className="p-2 absolute inset-0 flex flex-row justify-center items-end">
						<p className="text-center font-ibm-plex-mono font-semibold text-sm leading-snug">
							{text}
						</p>
					</div>
					{status && (
						<div className="p-2 absolute inset-0 flex flex-row justify-end items-start">
							<p className="px-2 py-px font-ibm-plex-mono font-bold text-sm tracking-widest leading-snug text-white bg-indigo-500 rounded-full transform scale-90 origin-top-right">
								NEW
							</p>
						</div>
					)}
				</button>
			</div>
		</div>
	)
})

const IconGrid = React.memo(props => {
	const ctx = React.useContext(Context)

	return (
		<div style={{ minHeight: "calc(100vh - 6rem - 5.5rem - 1.5rem)" /* 100vh - py-20 - <Search> - h-6 */ }}>
			<div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
				{ctx.icons.map(each => (
					<IconCard key={each.name} {...each} />
				))}
			</div>
		</div>
	)
})

export default IconGrid
