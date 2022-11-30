import { useState } from "react";

interface TabsProps {
	tabs: {
		name: string;
		content: JSX.Element;
	}[];
}

function Tabs({ tabs }: TabsProps) {
	const [currentTab, setCurrentTab] = useState(tabs[0]);

	return (
		<div className="flex flex-col gap-4 my-4">
			<div className="flex border-2 rounded-lg border-primary-500 items-center justify-around ">
				{tabs.map((tab, index) => (
					<button
						key={tab.name}
						className={`flex-grow p-2 transition-all ${
							currentTab.name == tab.name
								? "bg-primary-500 text-white"
								: "bg-white text-primary-500"
						} ${index == 0 ? "rounded-l-md" : ""} 
              ${index == tabs.length - 1 ? "rounded-r-md" : ""}`}
						onClick={() => setCurrentTab(tab)}
					>
						{tab.name}
					</button>
				))}
			</div>
			{currentTab.content}
		</div>
	);
}

export default Tabs;
