import slugify from "slugify";

export function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

export function slugifyy(str) {
	return slugify(str, {
		lower: true,
	});
}

export function unique(value, index, self) {
	return self.indexOf(value) === index;
}