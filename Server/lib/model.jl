function construct_model(tspan, tspan_train, tspan_test, dsize_train, dsize_test;
                         hidden_dim = 10, test_model = true)
    ann = Chain(Dense(4, hidden_dim, relu), Dense(hidden_dim, 1))
    p1, re = Flux.destructure(ann)
    p2 = Float64[0.5, 0.03]
    p3 = [p1; p2]
    
    ps = Flux.params(p3)
    
    u0 = Float64[327000000.0, 518, 7, 10]
    
    function QSIR(du, u, p, t)
        β = abs(p[length(p1) + 1])
        γ = 0.007627
        du[1]=  -β * u[1] * u[2] / u0[1]
        du[2] = β * u[1] * u[2] / u0[1] - γ * u[2] - abs(re(p[1:length(p1)])(u)[1]) * u[2] / u0[1]
        du[3] = γ * u[2]
        du[4] = abs(re(p[1:length(p1)])(u)[1] * u[2] / u0[1])
    end
    
    prob = ODEProblem(QSIR, u0, tspan, p3)
    t = range(tspan[1], tspan[2], length = dsize_train + dsize_test)
    t_train = range(tspan_train[1], tspan_train[2], length = dsize_train)
    t_test = range(tspan_test[1], tspan_test[2], length = dsize_test)
    
    if test_model
        sol = Array(concrete_solve(prob, Rosenbrock23(autodiff = false), u0, p3, saveat=t))
    end
    
    return ps, re, u0, prob, t, t_train, t_test, p3, length(p1)
end