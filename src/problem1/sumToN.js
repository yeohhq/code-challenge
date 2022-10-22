var sum_to_n_a = function (n) {
	// Naive solution, for-loop
	// O(n)
	let sum = 0
	for (let i = 1; i <= n; i++) {
		sum += i
	}

	return sum
}

var sum_to_n_b = function (n) {
	// Math sum to n formula
	// O(1)
	return (n * (n + 1)) / 2
}

var sum_to_n_c = function (n) {
	// Naive solution, while loop
	// O(n)
	let sum = 0
	let i = 1

	while (i <= n) {
		sum += i
		i++
	}

	return sum
}
