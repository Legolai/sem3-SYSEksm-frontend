import React, { ReactNode } from "react";

interface ModalType {
	children?: ReactNode;
	isOpen: boolean;
	toggle: () => void;
}

export default function Modal(props: ModalType) {
	return (
		<>
			{props.isOpen && (
				<div className="z-50 w-screen h-screen absolute top-0 left-0 bg-black/50 flex justify-center items-center" onClick={props.toggle}>
					<div onClick={(e) => e.stopPropagation()} className="block bg-white w-1/3 h-1/3">
						{props.children}
					</div>
				</div>
			)}
		</>
	);
}