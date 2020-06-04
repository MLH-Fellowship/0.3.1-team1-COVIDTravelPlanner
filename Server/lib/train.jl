update_loss_log(run_logs, loss) = append!(run_logs["loss"], loss)
Zygote.@nograd update_loss_log

function train(prob, t, u0, p3, ps, data, epochs, opt, avg_meter,
               plen; cont_train = false)
    log_infected = log.(abs.(data["infected"]) .+ 1.0)
    log_recovered = log.(abs.(data["recovered"] .+ data["deceased"]) .+ 1.0)
    weightage = data["time_train"] ./ length(data["time_train"])
    
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
        infect_loss = 3.0 * sum(weightage .* abs2.(log_infected .- log.(abs.(prediction[2, :]) .+ 1.0)))
        recover_loss = sum(weightage .* abs2.(log_recovered .- log.(abs.(prediction[3, :]) .+ 1.0)))
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
    
    # min_loss, idx = findmin(run_logs["loss"])
    # idx1 = (idx - 1) * (plen + 2) + 1
    # idx2 = idx * (plen + 2)
    # p3 = run_logs["p3"][idx1:idx2]
    
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

function train_named_locations(file::String, districts, states; each_epochs = 200, retrain = false)
    data_all = clean_data(file)
    train_named_locations(data_all, districts, states; each_epochs = each_epochs, retrain = retrain)
end

function train_named_locations(data_all, districts, states; each_epochs = 200, retrain = false)
    avg_meter = RunningAverageMeter()
    districts = format_string.(districts)
    for state in format_string.(states)
        data_state = data_all[state]
        @info "Starting to train models for State: $state"
        for district in keys(data_state)
            if length(districts) > 0 && district ∉ districts
                continue
            end
            df = data_state[district]
            if isnothing(df)
                continue
            end
            filepath = joinpath(@__DIR__, "../data/" * state * "_" * district * ".bson")
            if isfile(filepath) && !retrain
                @info "Model already trained for District $district"
                continue
            end
            @info "District $district"
            t_train = df["time_train"]
            t_test = df["time_test"]

            u0_1 = df["infected"][1]
            u0_2 = df["recovered"][1] + df["deceased"][1]
            ps, re, u0, prob, p3, plen =
                construct_model(t_train, t_test, u0_1, u0_2, hidden_dim = 30,
                                test_model = false)
            opt = ADAM(1e-2)
            @show df["infected"], df["recovered"] .+ df["deceased"], df["time_train"]
            u0, p = train(prob, t_train, u0, p3, ps, df, each_epochs, opt, avg_meter, plen,
                          cont_train = false)
    
            @show inference(prob, u0, p, t_train)[2:3]
            @show inference(prob, u0, p, t_test)[2:3]
            BSON.@save filepath u0 p t_train t_test
            @info "Saved model to $filepath"
        end
    end
end

function train_all_districts(file; each_epochs = 200, retrain = false)
    data_all = clean_data(file)
    train_named_locations(data_all, [], collect(keys(data_all)); each_epochs = each_epochs, retrain = retrain)
end

prediction(state::String, district::String, day_num::Int64) =
    prediction(state, district, [day_num])

function prediction(state::String, district::String, day_num::Vector{Int})
    filepath = joinpath(@__DIR__, "../data/" * format_string(state) * "_" * format_string(district) * ".bson")
    if !isfile(filepath)
        return nothing
    end
    BSON.@load filepath u0 p t_train t_test
#     @show t_train, t_test
    _, _, _, prob, _, _ =
        construct_model(t_train, t_test, u0[2], u0[3], hidden_dim = 30, test_model = false)
    s_nn, i_nn, r_nn, t_nn = inference(prob, u0, p, t_train)
#     @show i_nn, r_nn
    s_nn, i_nn, r_nn, t_nn = inference(prob, u0, p, t_test)
    return i_nn[day_num], r_nn[day_num]
end