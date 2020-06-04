using NNlib, Flux, LinearAlgebra, DiffEqBase

function createUser(req::HTTP.Request)
  data = JSON2.read(IOBuffer(HTTP.payload(req)))
  r = findall(x -> isequal(x.email, data.email), USERS)
  if !isempty(r)
    println("log: cannot create user $(data.email)")
    return HTTP.Response(400, "{ \"message\": \"email already used\" }")
  end
  user = User(getNextUserId(), data.name, data.password, data.email, 0)
  USERS[user.id] = user
  println("log: create user $(user.email)")
  return HTTP.Response(200, JSON2.write(user))
end

function getUser(req::HTTP.Request)
    data = JSON2.read(IOBuffer(HTTP.payload(req)))
    token = data.token
    r = findall(x -> (x.token == token), USERS)
    if isempty(r)
      return HTTP.Response(400, "{ \"message\": \"user not found\" }")
    else
      println("log: get user $(r[1].email)")
      return HTTP.Response(200, JSON2.write(r[1]))
    end
end

function login(req::HTTP.Request)
  input = JSON2.read(IOBuffer(HTTP.payload(req)))
  r = findall(x -> (x.email == input.email && x.password == input.password), USERS)
  if isempty(r)
    return HTTP.Response(400, "{ \"message\": \"email not found\" }")
  else
    token = rand(UInt32)
    USERS[r[1]].token = token
    return HTTP.Response(200, "{ \"token\": $(token) }")
  end
end

function get_day_offset(epoch)
  d = unix2datetime(epoch)
  return day(d) - 4 # 4 means 4 june
end

function add_schedule(req::HTTP.Request)
  data = JSON2.read(IOBuffer(HTTP.payload(req)))
  token, starttime, endtime, state, district = data.token, data.starttime, data.endtime, data.state, data.district
  r = findall(x -> (x.token == token), USERS)
  if isempty(r)
    return HTTP.Response(400, "{ \"message\": \"user not found\" }")
  else
    user  = USERS[r[1]]
    pred = prediction(state, district, get_day_offset(starttime))
    if pred isa Nothing
      sched = Schedule(getNextScheduleId(), user.id, starttime, endtime, state * "_" * district, 0, Int(round(time())))
    else
      sched = Schedule(getNextScheduleId(), user.id, starttime, endtime, state * "_" * district, pred[1][1], Int(round(time())))
    end
    SCHEDULES[sched.id] = sched
    return HTTP.Response(200, JSON2.write(sched))
  end
end

function get_shedules(req::HTTP.Request)
  data = JSON2.read(IOBuffer(HTTP.payload(req)))
  token = data.token
  r = findall(x -> (x.token == token), USERS)
  if isempty(r)
    return HTTP.Response(400, "{ \"message\": \"user not found\" }")
  else
    user  = USERS[r[1]]
    idxs = findall(x -> (x.uid == user.id), SCHEDULES)
    out = Array{Schedule}(undef, 0)
    for i in idxs
      push!(out, SCHEDULES[i])
    end
    return HTTP.Response(200, JSON2.write(out))
  end
end


function get_status(req::HTTP.Request)
  data = JSON2.read(IOBuffer(HTTP.payload(req)))
  district, state = data.district, data.state
  vector = Vector(collect(1:7))
  pred = Covid19Modelling.prediction(state, district, vector)
  if pred isa Nothing
    infected, rd = zeros(7), zeros(7)
  else
    infected, rd = pred
  end
  out = Dict("infected" => infected, "rd" => rd)
  return HTTP.Response(200, [Pair("Access-Control-Allow-Origin", "*")]; body=JSON2.write(out))
end

HTTP.@register(ROUTER, "POST",   "/api/v1/register", createUser)
HTTP.@register(ROUTER, "POST",   "/api/v1/login", login)
HTTP.@register(ROUTER, "POST",   "/api/v1/user", getUser)
HTTP.@register(ROUTER, "POST",   "/api/v1/schedule/add", add_schedule)
HTTP.@register(ROUTER, "POST",   "/api/v1/schedule/list", get_shedules)
HTTP.@register(ROUTER, "POST",   "/api/v1/status", get_status)

