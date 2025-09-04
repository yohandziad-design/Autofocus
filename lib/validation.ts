export function isEmail(v: string) {
	return /.+@.+\..+/.test(v)
}

export function isPhone(v: string) {
	return /^\+?[0-9 ()-.]{6,}$/.test(v)
}

export function required(v: string | undefined | null) {
	return !!v && v.trim().length > 0
}
