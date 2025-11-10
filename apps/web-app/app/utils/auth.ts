import SignInRequired from '~/components/modal/SignInRequired.vue'

export function tryActionThatRequiresLogin() {
  const route = useRoute()
  const overlay = useOverlay()
  const modalSignIn = overlay.create(SignInRequired)

  modalSignIn.open({ link: `/sign-in?redirectTo=${encodeURIComponent(route.path)}`, onClick: modalSignIn.close })
}
