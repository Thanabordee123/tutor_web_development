import { ReactElement, useState, useEffect } from 'react'
import  { ReactComponent as BoxIcon } from '../assets/icons/BoxIcon.svg'

interface UserAccount {
  userName: string,
  passWord: string
}

const mockUser : Array<UserAccount> = [
  {
    userName: "thanaborde123",
    passWord: "genjuro123"
  },
  {
    userName: "oummy",
    passWord: "160143"
  }
]

function App() {
  const [userName, setUserName] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [isSubmitData, setIsSubmitData] = useState<boolean>(false)
  const [isNoUserName, setIsNoUserName] = useState<boolean>(false)
  const [isNoPassword, setIsNoPassword] = useState<boolean>(false)
  const [isInvalidUserData, setIsInvalidUserData] = useState<boolean>(false)
  const [isLogin, setIsLogin] = useState<boolean>(false)

  const handleUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    let userName = e.target.value
    setUserName(userName) 
  }

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    let password = e.target.value
    setPassword(password)
  }

  const handleLogin = () => {
    setIsSubmitData(true)
    if (isSubmitData === true) {
      if (userName.length === 0) {
        setIsNoUserName(true)
      }
      if (password.length === 0) {
        setIsNoPassword(true)
      }
      if (userName.length && password.length > 0) {
        let checkUserName = mockUser.find(obj => obj.userName === userName)
        let checkPassword = mockUser.find(obj => obj.passWord === password)
        if (!checkUserName || !checkPassword) {
          setIsInvalidUserData(true)
        }
        else{
          setIsInvalidUserData(false)
          setIsLogin(true)
        }
      }
    }
  }

  return (
    <div className='w-screen h-screen flex justify-center items-center bg-light-blue'>
      <div className="flex justify-center items-center flex-col">
        <div className='flex justify-center items-center flex-row'>
          <BoxIcon className="h-24 w-24 item-center"></BoxIcon>
          <label className='font-semibold text-white text-4xl tracking-tight'>
            คณิต นายโอม
          </label>
        </div>
        <div className='my-2'/>
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Username
            </label>
            <input 
              className=
              { 
                isNoUserName ? 
                `shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`
                :`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`
              } 
              id="username" 
              type="text" 
              placeholder="Username"
              onChange={handleUserName}
              />
            {
              isNoUserName ?
              <p className="text-red-500 text-xs italic">Please choose a username.</p>
              : ''
            }
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input 
              className=
              {
                isNoPassword ? `shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`
                :`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`
              }
              id="password" 
              type="password" 
              placeholder="******************"
              onChange={handlePassword}
              />
            {
              isNoPassword ?
              <p className="text-red-500 text-xs italic">Please choose a password.</p>
              : ''
            }
          </div>
          <div className="flex items-center justify-between">
            <button 
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
              type="button" 
              onClick={handleLogin}
              >
              Sign In
            </button>
            <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
              Forgot Password?
            </a>
          </div>
        </form>
        <p className="text-center text-white text-xs">
          &copy;2023 Mr.Ohm Corp. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default App;
