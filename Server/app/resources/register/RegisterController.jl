module RegisterController

  using Users
  using Genie.Router, Genie.Renderer.Html
  import SearchLight: save!
  using SHA

  function register()
    new_user = User(name = @params(:name), email = @params(:email), password = bytes2hex(sha256(@params(:password))))
    s = save!(new_user)
    html(:register, :new)
  end

  function register_page()
    html(:register, :new)
  end

end
