import { LoadFacebookUserApi } from 'data/contracts/apis'
import { AuthenticationError } from '../../domain/errors'
import { FacebookAuthentication } from 'domain/features'
import { LoadUserAccountRepository, CreateFacebookAccountRepository } from 'data/contracts/repos'
export class FacebookAuthenticationService {
  constructor (
    private readonly loadFacebookUser: LoadFacebookUserApi,
    private readonly loadUserAccountRepository: LoadUserAccountRepository,
    private readonly createFacebookAccountRepository: CreateFacebookAccountRepository
  ) {}

  async perform (params: FacebookAuthentication.Params): Promise<AuthenticationError> {
    const fbData = await this.loadFacebookUser.loadUser(params)
    if (fbData !== undefined) {
      await this.loadUserAccountRepository.load({ email: fbData.email })
      await this.createFacebookAccountRepository.createFromFacebook(fbData)
    }
    return new AuthenticationError()
  }
}
