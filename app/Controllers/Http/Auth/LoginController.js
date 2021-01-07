'use strict'

class LoginController {
  
  index({ view }) {
    return view.render('auth.login')
  }

  async check({ request, auth, session, response}) {
    const { email, password } = request.all()
    await auth.attempt(email, password)

    return response.route('dashboard')
  }

  async logout({ auth, response }) {
    await auth.logout()

    return response.route('login.index')
  }
}

module.exports = LoginController
