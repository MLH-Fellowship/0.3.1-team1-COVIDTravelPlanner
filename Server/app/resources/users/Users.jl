module Users

import SearchLight: AbstractModel, DbId
import Base: @kwdef
using SearchLight, SHA

export User

@kwdef mutable struct User <: AbstractModel
  id::DbId = DbId()
  name::String = ""
  password::String = ""
  email::String = ""
end

function seed()
  SearchLight.save!(User(name= "Kanav", password=bytes2hex(sha256("testpassword")), email="test1@test.com"))
  SearchLight.save!(User(name= "Jivitesh", password=bytes2hex(sha256("testpassword")), email="test2@test.com"))
  SearchLight.save!(User(name= "Lakshya", password=bytes2hex(sha256("testpassword")), email="test3@test.com"))
  SearchLight.save!(User(name= "Avik", password=bytes2hex(sha256("testpassword")), email="test4@test.com"))
end

end
