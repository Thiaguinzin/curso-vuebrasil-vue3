import mockAxios from 'axios'
import AuthServices from './auth'

jest.mock('axios')

describe('AuthService', () => {

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return a token when user login', async () => {
    const token ='123.123.123'
    mockAxios.post.mockImplementationOnce(() => {
      return Promise.resolve({data: {token}})
    })

    const response = await AuthServices(mockAxios).login({email: 'igor@igor.me', password: '123'})
    expect(response.data).toHaveProperty('token')
    expect(response.data).toMatchSnapshot()
  })

  it('should return an user when user register',async () => {
    const user = {
      name: 'Igor',
      password: '123',
      email: 'igor@igor.me'
    }

    mockAxios.post.mockImplementationOnce(() => {
      return Promise.resolve({data:user})
    })

    const reponse = await AuthServices(mockAxios).register(user)
    expect(reponse.data).toHaveProperty('name')
    expect(reponse.data).toHaveProperty('password')
    expect(reponse.data).toHaveProperty('email')
    expect(reponse.data).toMatchSnapshot()
  })

  it('should thrown an error when not found', async () => {
    const errors = { status: 404, statusText: 'Not Found' }
    mockAxios.post.mockImplementationOnce(() => {
      return Promise.resolve({request: errors})
    })

    const response = await AuthServices(mockAxios).login({email: 'igor@igor.me', password: '123'})
    expect(response.errors).toHaveProperty('status')
    expect(response.errors).toHaveProperty('statusText')
  })

})
