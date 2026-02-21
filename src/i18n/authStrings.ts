import type { TranslatedText } from './strings';

export const auth: Record<string, TranslatedText> = {
  login: { zh: '点击登录', en: 'Login', fr: 'Connexion', ru: 'Войти', es: 'Iniciar sesión', ar: 'تسجيل الدخول' },
  notRegistered: { zh: '还未注册？点击注册', en: 'Not registered? Sign up', fr: 'Pas de compte ? Inscription', ru: 'Нет аккаунта? Регистрация', es: '¿Sin cuenta? Regístrate', ar: 'غير مسجل؟ سجّل' },
  registerLink: { zh: '点击注册', en: 'Sign up', fr: 'Inscription', ru: 'Регистрация', es: 'Registrarse', ar: 'سجّل' },
  register: { zh: '注册', en: 'Register', fr: 'Inscription', ru: 'Регистрация', es: 'Registrarse', ar: 'التسجيل' },
  email: { zh: '邮箱', en: 'Email', fr: 'E-mail', ru: 'Email', es: 'Correo', ar: 'البريد' },
  password: { zh: '密码', en: 'Password', fr: 'Mot de passe', ru: 'Пароль', es: 'Contraseña', ar: 'كلمة المرور' },
  confirmPassword: { zh: '确认密码', en: 'Confirm password', fr: 'Confirmer', ru: 'Подтвердить', es: 'Confirmar', ar: 'تأكيد' },
  verificationCode: { zh: '邮箱验证码', en: 'Verification code', fr: 'Code de vérification', ru: 'Код', es: 'Código', ar: 'رمز التحقق' },
  sendCode: { zh: '发送验证码', en: 'Send code', fr: 'Envoyer', ru: 'Отправить', es: 'Enviar', ar: 'إرسال' },
  submitLogin: { zh: '登录', en: 'Log in', fr: 'Connexion', ru: 'Войти', es: 'Entrar', ar: 'دخول' },
  submitRegister: { zh: '完成注册', en: 'Sign up', fr: 'S\'inscrire', ru: 'Зарегистрироваться', es: 'Registrarse', ar: 'تسجيل' },
  profile: { zh: '个人信息', en: 'Profile', fr: 'Profil', ru: 'Профиль', es: 'Perfil', ar: 'الملف' },
  nickname: { zh: '昵称', en: 'Nickname', fr: 'Pseudo', ru: 'Ник', es: 'Apodo', ar: 'اللقب' },
  changeAvatar: { zh: '更换头像', en: 'Change avatar', fr: 'Changer photo', ru: 'Фото', es: 'Cambiar avatar', ar: 'تغيير الصورة' },
  saveProfile: { zh: '保存', en: 'Save', fr: 'Enregistrer', ru: 'Сохранить', es: 'Guardar', ar: 'حفظ' },
  logout: { zh: '退出登录', en: 'Logout', fr: 'Déconnexion', ru: 'Выход', es: 'Cerrar sesión', ar: 'تسجيل الخروج' },
  errorInvalidCredentials: { zh: '邮箱或密码错误', en: 'Invalid email or password', fr: 'Email ou mot de passe incorrect', ru: 'Неверный email или пароль', es: 'Email o contraseña incorrectos', ar: 'بريد أو كلمة مرور غير صحيحة' },
  errorInvalidCode: { zh: '验证码错误', en: 'Invalid verification code', fr: 'Code invalide', ru: 'Неверный код', es: 'Código inválido', ar: 'رمز غير صحيح' },
  errorEmailExists: { zh: '该邮箱已注册', en: 'Email already registered', fr: 'Email déjà utilisé', ru: 'Email уже зарегистрирован', es: 'Email ya registrado', ar: 'البريد مسجل مسبقاً' },
  demoHint: { zh: '（演示：验证码填 123456）', en: '(Demo: code is 123456)', fr: '(Démo: code 123456)', ru: '(Демо: код 123456)', es: '(Demo: código 123456)', ar: '(العرض: 123456)' }
};
