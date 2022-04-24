let BASE_URL = ""
const TIME_OUT = 3000

if (import.meta.env.MODE === "development") {
  BASE_URL = "/api"
} else if (import.meta.env.MODE === "production") {
  BASE_URL = "/api"
}

export { BASE_URL, TIME_OUT }
