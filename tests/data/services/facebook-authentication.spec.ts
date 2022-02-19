import { FacebookAuthentication } from 'domain/features'

class FacebookAuthenticationService {
  constructor (
    private readonly loadFacebookUser: LoadFacebookUser
  ) {}

  async perform (params: FacebookAuthentication.Params): Promise<void> {
    await this.loadFacebookUser.loadUser(params)
  }
}
interface LoadFacebookUser {
  loadUser: (params: LoadFacebookUser.Params) => Promise<void>
}

namespace LoadFacebookUser {
  export type Params = {
    token: string
  }
}

class LoadFacebookUserApi implements LoadFacebookUser {
  token?: string
  async loadUser (params: LoadFacebookUser.Params): Promise<void> {
    this.token = params.token
  }
}

describe('FacebookAuthenticationService', () => {
  it('should call LoadFacebookUserApi with correct params', async () => {
    const loadFacebookUserApi = new LoadFacebookUserApi()
    const sut = new FacebookAuthenticationService(loadFacebookUserApi)

    await sut.perform({ token: 'any_token' })

    expect(loadFacebookUserApi.token).toBe('any_token')
  })
})
