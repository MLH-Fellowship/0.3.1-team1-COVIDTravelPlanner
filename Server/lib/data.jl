function clean_data(file)
    df = CSV.read(file)
    
    districts = unique(df.district)
    dname = format_string.(districts)
    
    dataset = Dict{String, Dict{String, Union{Dict{String, Vector{Float64}}, Nothing}}}()
    
    for (d, dn) in zip(districts, dname)
        if occursin("other", dn) || occursin("foreign", dn)
            continue
        end
        dsplit = df[df.district .== d, :]
        states = unique(dsplit.state)
        for state in states
            dsplit_2 = dsplit[dsplit.state .== state, :]

            state = format_string(state)
            if state ∉ keys(dataset)
                dataset[state] = Dict{String, Union{Dict{String, Vector{Float64}}, Nothing}}()
            end

            infected = Array(dsplit_2[dsplit_2.category .== "confirmed", :])[4:end]
            recovered = Array(dsplit_2[dsplit_2.category .== "recovered", :])[4:end]
            deceased = Array(dsplit_2[dsplit_2.category .== "deceased", :])[4:end]
            
            infected = infected .- recovered .- deceased
            
            idx = findfirst((infected .> 10) .& (.!ismissing.(infected)))
            if isnothing(idx)
                dataset[state][dn] = nothing
            else
                dataset[state][dn] = Dict{String, Vector{Float64}}()
                time = []
                infect = []
                recov = []
                dead = []
                test_time = Float64.([length(infected) - idx + 1 + i for i in 1:7])
                infected = infected[idx:end]
                recovered = recovered[idx:end]
                deceased = deceased[idx:end]
                for (i, (inf, rec, dec)) in enumerate(zip(infected, recovered, deceased))
                    if all(.!ismissing.([inf, rec, dec]))
                        append!(time, Float64(i))
                        append!(infect, inf)
                        append!(recov, rec)
                        append!(dead, dec)
                    end
                end
                dataset[state][dn]["infected"] = Float64.(infect)
                dataset[state][dn]["recovered"] = Float64.(recov)
                dataset[state][dn]["deceased"] = Float64.(dead)
                dataset[state][dn]["time_train"] = Float64.(time)
                dataset[state][dn]["time_test"] = Float64.(test_time)
            end
        end
    end
    
    return dataset
end