"use client";
import { createContext, useState, useContext } from "react";

const ZipcodeContext = createContext();

export function ZipcodeProvider({ children }) {
	const [zipcode, setZipcode] = useState("");

	return (
		<ZipcodeContext.Provider value={{ zipcode, setZipcode }}>
			{children}
		</ZipcodeContext.Provider>
	);
}

export function useZipcode() {
	return useContext(ZipcodeContext);
}
