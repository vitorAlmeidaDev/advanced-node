import { AuthenticationError } from '../../../src/domain/errors'
import { FacebookAuthenticationService } from '../../../src/data/services/'

import { mock, MockProxy } from 'jest-mock-extended'
import { LoadFacebookUserApi } from 'data/contracts/apis'

describe('FacebookAuthenticationService', () => {
  let loadFacebookUserApi: MockProxy<LoadFacebookUserApi>
  let sut: FacebookAuthenticationService
  const token: string = 'any_token'

  beforeEach(() => {
    loadFacebookUserApi = mock()
    sut = new FacebookAuthenticationService(loadFacebookUserApi)
  })

  it('should call LoadFacebookUserApi with correct params', async () => {
    await sut.perform({ token })

    expect(loadFacebookUserApi.loadUser).toHaveBeenCalledWith({ token })
    expect(loadFacebookUserApi.loadUser).toHaveBeenCalledTimes(1)
  })

  it('should return AuthenticationError when LoadFacebookUserApi returns undefined', async () => {
    loadFacebookUserApi.loadUser.mockResolvedValueOnce(undefined)

    const authResult = await sut.perform({ token })

    expect(authResult).toEqual(new AuthenticationError())
  })
})
