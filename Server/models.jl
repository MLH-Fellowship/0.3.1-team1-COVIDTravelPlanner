mutable struct User
    id::Int
    name::String
    password::String
    email::String
    token::UInt32
end

const USERS = Dict{Int, User}()
const NEXT_USER_ID = Ref(0)

function getNextUserId()
    id = NEXT_USER_ID[]
    NEXT_USER_ID[] += 1
    return id
end

mutable struct Schedule
    id::Int
    uid::Int
    starttime::Int64
    endtime::Int64
    place::String
    prediction::Float64
    timestamp::Int64
end

const SCHEDULES = Dict{Int, User}()
const NEXT_SCHEDULE_ID = Ref(0)

function getNextScheduleId()
    id = NEXT_SCHEDULE_ID[]
    NEXT_SCHEDULE_ID[] += 1
    return id
end
