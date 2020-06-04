mutable struct RunningAverageMeter{T<:AbstractFloat}
    momentum::T
    val::Union{Nothing, T}
    avg::T
end

RunningAverageMeter(;momentum::T = 0.99f0) where {T<:AbstractFloat} =
    RunningAverageMeter(momentum, nothing, T(0))

function reset!(r::RunningAverageMeter{T}) where T
    r.val = nothing
    r.avg = T(0)
    return r
end

Zygote.@nograd reset!

function update(r::RunningAverageMeter, val)
    if isnothing(r.val)
        r.avg = val
    else
        r.avg = r.avg * r.momentum + val * (1 - r.momentum)
    end
    r.val = val
    return nothing
end

Zygote.@nograd update