
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
    @show USERS[r[1]]
    return HTTP.Response(200, "{ \"token\": $(token) }")
  end
end

HTTP.@register(ROUTER, "POST",   "/api/v1/register", createUser)
HTTP.@register(ROUTER, "POST",   "/api/v1/login", login)
HTTP.@register(ROUTER, "POST",   "/api/v1/user", getUser)

