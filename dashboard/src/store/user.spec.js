import useStore from '../hooks/useStore'
import { setCurrentUser, resetUserStore, setApiKey, clearCurrentUser } from './user'

describe('UserStore', () => {

  afterEach(() => {
    resetUserStore();
  })

  it('should set current user', () => {
    const store = useStore()
    setCurrentUser({name: 'Thiago'})
    expect(store.User.currentUser.name).toBe('Thiago')
  })

  it('should set api_key on current user', () => {
    const store = useStore()
    setApiKey('123')
    expect(store.User.currentUser.apiKey).toBe('123')
  })

  it('should clean current user', () => {
    const store = useStore()
    setCurrentUser({name: 'Thiago', apiKey: '123'})
    clearCurrentUser()
    expect(store.User.currentUser).toStrictEqual({})
  })

})
