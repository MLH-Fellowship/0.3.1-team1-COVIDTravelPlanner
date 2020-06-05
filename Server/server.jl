using HTTP, JSON2, Sockets
using Dates
const ROUTER = HTTP.Router()

include("lib/Covid19Modelling.jl")

using .Covid19Modelling

include("models.jl")
include("router.jl")

println("[log] precompilation complete, starting server at port 8081")
HTTP.serve(ROUTER, "0.0.0.0", 8081)
