module Covid19Modelling

using CSV
using Measures
using Flux
using DifferentialEquations
using DiffEqFlux
using LaTeXStrings
using Zygote
using BSON
using LinearAlgebra

include("utils.jl")
include("data.jl")
include("model.jl")
include("train.jl")

export train_all_districts, prediction

end