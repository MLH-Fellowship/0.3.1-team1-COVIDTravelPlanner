module Server

using Logging, LoggingExtras

function main()
  Base.eval(Main, :(const UserApp = Server))

  include(joinpath("..", "genie.jl"))

  Base.eval(Main, :(const Genie = Server.Genie))
  Base.eval(Main, :(using Genie))
end; main()

end
