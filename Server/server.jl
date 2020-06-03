using HTTP, JSON2, Sockets

const ROUTER = HTTP.Router()

include("diffeqflux.jl")
include("models.jl")
include("router.jl")

HTTP.serve(ROUTER, Sockets.localhost, 8081)
