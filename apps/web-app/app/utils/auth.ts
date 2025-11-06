export function tryActionThatRequiresLogin() {
  const route = useRoute()
  const toast = useToast()
  const id = 'login-required'

  toast.add({
    id,
    title: 'Требуется войти как пользователь',
    description: 'Нажмите сюда, чтобы перейти на страницу входа',
    color: 'error',
    icon: 'i-lucide-log-in',
    duration: 4000,
    onClick: () => {
      toast.remove(id)
      navigateTo(`/sign-in?redirectTo=${route.path}`)
    },
  })
}
