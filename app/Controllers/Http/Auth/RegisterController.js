'use strict'

const User = use('App/Models/User')
const { validate } = use('Validator')

class RegisterController {
  
  index({view}) {
    return view.render('auth.register')
  }

  async store({ request, session, response }) {
    
    const rules = {
      name: 'required',
      email: 'required|unique:users,email',
      password: 'required'
    }

    const messages = {
      'name.required': 'Nama lengkap tidak boleh kosong',
      'email.required': 'Alamat email tidak boleh kosong',
      'email.unique': 'Alamat email sudah terdaftar',
      'password.required': 'Password tidak boleh kosong',
    }

    const validation = await validate(request.all(), rules, messages)

    /*jika validasi gagal*/
    if(validation.fails()) {
      session.withErrors(validation.messages()).flashExcept(['password'])
      return response.redirect('back')
    }

    /*membuat user*/
    const user = await User.create({
      name: request.input('name'),
      email: request.input('email'),
      password: request.input('password')
    })

    /*tampilkan pesan sukses*/
    session.flash({notification: 'Pendaftaran berhasil'})
    return response.redirect('back')
  }
}

module.exports = RegisterController
