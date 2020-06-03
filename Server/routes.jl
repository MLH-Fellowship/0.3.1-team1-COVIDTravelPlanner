using Genie.Router
using RegisterController

route("/") do
  serve_static_file("welcome.html")
end

route("/register", RegisterController.register_page, method = "GET", named= :register_page)

route("/api/register", RegisterController.register, method = "POST", named = :create_user)
