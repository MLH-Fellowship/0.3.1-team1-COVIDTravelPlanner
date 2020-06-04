using HTTP, JSON2, Sockets

const ROUTER = HTTP.Router()

include("diffeqflux.jl")
include("models.jl")
include("router.jl")

println("[log] precompilation complete, starting server at port 8081")
HTTP.serve(ROUTER, Sockets.localhost, 8081)
