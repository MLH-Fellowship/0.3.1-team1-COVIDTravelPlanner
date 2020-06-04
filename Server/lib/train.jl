update_loss_log(run_logs, loss) = append!(run_logs["loss"], loss)
Zygote.@nograd update_loss_log

function train(prob, t, u0, p3, data, epochs, opt, avg_meter, plen; cont_train = false)
    log_infected = log.(abs.(data["infected"]))
    log_recovered = log.(abs.(data["recovered"] .+ data["dead"]))    
    
    run_logs = Dict(
        "loss" => [],
        "p1"   => [],
        "p2"   => [],
        "p3"   => [],
    )

    dat = Iterators.repeated((), epochs)

    function predict_adjoint()
        Array(concrete_solve(prob, Rosenbrock23(autodiff = false), u0, p3, saveat=t))
    end
    
    if !cont_train
        reset!(avg_meter)
    end
    
    function loss_adjoint()
        prediction = predict_adjoint()
        infect_loss = sum(abs2, log_infected .- log.(abs.(prediction[2, :])))
        recover_loss = sum(abs2, log_recovered .- log.(abs.(prediction[3, :])))
        loss = infect_loss + recover_loss

        update(avg_meter, loss)
        update_loss_log(run_logs, loss)

        return loss
    end
    
    loss_adjoint()
    
    cb = function()
        println("Running Mean Loss : $(avg_meter.val)")
        
        append!(run_logs["p1"], p3[plen + 1])
        append!(run_logs["p2"], p3[plen + 2])
        append!(run_logs["p3"], p3)
    end
    
    Flux.train!(loss_adjoint, ps, dat, opt, cb = cb)
    
    min_loss, idx = findmin(run_logs["loss"])
    idx1 = (idx - 1) * (plen + 2) + 1
    idx2 = idx * (plen + 2)
    p3 = run_logs["p3"][idx1:idx2]
    
    return u0, p3
end

function inference(prob, u0, p, t)
    prediction = Array(concrete_solve(prob, Rosenbrock23(autodiff = false), u0, p, saveat=t))

    S_NN = prediction[1, :]
    I_NN = prediction[2, :]
    R_NN = prediction[3, :]
    T_NN = prediction[4, :]
    
    return S_NN, I_NN, R_NN, T_NN
end