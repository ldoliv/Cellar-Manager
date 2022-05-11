
export function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

export function unique(value, index, self) {
	return self.indexOf(value) === index;
}