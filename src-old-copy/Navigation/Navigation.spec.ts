// import { NavigationPresenter } from './NavigationPresenter'
// import { Router } from '../Routing/Router'
// import { Types } from '../Core/Types'
// import { AppTestHarness } from '../TestTools/AppTestHarness'
// import { GetSuccessfulRegistrationStub } from '../TestTools/GetSuccessfulRegistrationStub'
//
// let appTestHarness = null
// let navigationPresenter = null
// let router = null
// let routerGateway = null
//
// describe('navigation', () => {
//   beforeEach(async () => {
//     appTestHarness = new AppTestHarness()
//     appTestHarness.init()
//     appTestHarness.bootStrap(() => {})
//     navigationPresenter = appTestHarness.container.get(NavigationPresenter)
//     router = appTestHarness.container.get(Router)
//     routerGateway = appTestHarness.container.get(Types.IRouterGateway)
//   })
//
//   describe('before login', () => {
//     it('anchor default state', () => {
//       expect(navigationPresenter.viewModel.currentSelectedVisibleName).toBe('')
//       expect(navigationPresenter.viewModel.showBack).toBe(false)
//       expect(navigationPresenter.viewModel.menuItems).toEqual([])
//     })
//   })
//
//   describe('login', () => {
//     beforeEach(async () => {
//       await appTestHarness.setupLogin(GetSuccessfulRegistrationStub, 'login')
//     })
//   })
// })
