export const apiKey =
	"eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjN2Y0YTQ0OTY4YjViYWU1OGM5ZmJlMWY3NjdjMDdjZiIsIm5iZiI6MTc0ODg3MDIwNy4yOTc5OTk5LCJzdWIiOiI2ODNkYTQzZjQxOTk0N2YwMTc1Mzg1OTAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.i2pWZKhI9sPAVziS1viTfGPGakjiGEkuHNln6h3FxiI";

const res = await fetch("https://api.themoviedb.org/3/trending/movie/day", {
	method: "GET",
	headers: {
		Authorization: `Bearer ${apiKey}`,
		accept: "application/json",
	},
});
const json = await res.json();
console.log(json);
