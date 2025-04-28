"use client";

import { useState, useEffect } from "react";
import styles from "./ZipCodeUpdater.module.css";

const ZipCodeUpdater = () => {
	const [zipCode, setZipCode] = useState("");

	useEffect(() => {
		// Load saved zipcode from sessionStorage on component mount
		const savedZipCode = sessionStorage.getItem("zipCode");
		if (savedZipCode) {
			setZipCode(savedZipCode);
		}
	}, []);

	const handleUpdate = () => {
		if (zipCode.trim()) {
			sessionStorage.setItem("zipCode", zipCode.trim());
			alert("Zip code updated successfully!");
		} else {
			alert("Please enter a valid zip code");
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<div className={styles.label}>Update your delivery location:</div>
				<div className={styles.inputGroup}>
					<input
						type="text"
						value={zipCode}
						onChange={(e) => setZipCode(e.target.value)}
						placeholder="Enter zip code"
						className={styles.input}
					/>
					<button onClick={handleUpdate} className={styles.button}>
						Update
					</button>
				</div>
			</div>
		</div>
	);
};

export default ZipCodeUpdater;
