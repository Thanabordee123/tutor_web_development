import { ReactElement, useState, useEffect } from 'react'
import  { ReactComponent as BoxIcon } from '../assets/icons/BoxIcon.svg'
import { ReactComponent as CrossIcon } from '../assets/icons/CrossIcon.svg'
import { ReactComponent as UnHideIcon } from '../assets/icons/UnHideIcon.svg'
import { ReactComponent as HideIcon } from '../assets/icons/HideIcon.svg'


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

interface LoginPopup {
    onClickCrossIcon : (isShowModal:boolean) => void
}

function LoginPopup({onClickCrossIcon}:LoginPopup) {
  const [userName, setUserName] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [isNoUserName, setIsNoUserName] = useState<boolean>(false)
  const [isNoPassword, setIsNoPassword] = useState<boolean>(false)
  const [isAccess, setIsAccess] = useState<boolean>(false)
  const [isNoPermission, setIsNoPermission] = useState<boolean>(false)
  const [isShowModal, setIsShowModal] = useState<boolean>(false)
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false)

  const handleUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    let userName = e.target.value
    setUserName(userName) 
  }

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    let password = e.target.value
    setPassword(password)
  }

  const validateSubmitBtn = () => {
    if (userName.length > 0) {
      setIsNoUserName(false)
    }
    if (userName.length === 0) {
      setIsNoUserName(true)
    }
    if (password.length > 0) {
      setIsNoPassword(false)
    }
    if (password.length === 0) {
      setIsNoPassword(true)
    }
    const userAccounts = mockUser.find(obj => obj)
    if (userName != userAccounts?.userName || password != userAccounts?.passWord) {
      setIsNoPermission(true)
    }
    if (userName === userAccounts?.userName && password === userAccounts?.passWord) {
      setIsNoPermission(false)
      setIsAccess(true)
    }
  }

  const updateIsShowModal = () => {
    setIsShowModal(false)
    onClickCrossIcon(isShowModal)
  }

  return (
    <div 
        className='h-screen w-screen fixed z-11 absolute top-0 left-0 flex items-center justify-center backdrop-brightness-50'
        >
        <div 
            className={`flex flex-col w-[1000px] h-[600px] p-[12px] rounded shadow-lg bg-light-blue border-light-blue`}
        >
            <CrossIcon 
                className="self-end cursor-pointer"
                onClick={() => updateIsShowModal()}
            />
            <div className='flex justify-center items-center flex-row'>
                <BoxIcon className="h-24 w-24 item-center"></BoxIcon>
                <label className='font-semibold text-white text-4xl tracking-tight'>
                    คณิต นายโอม
                </label>
            </div>
            <div className='my-2'/>
            <div className='flex justify-center items-center flex-row'>
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                        Username
                        </label>
                        <input 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="username" 
                        type="text" 
                        placeholder="Username"
                        onChange={handleUserName}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                          Password
                        </label>
                        <div className="relative">
                          <input 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="password" 
                            type={isShowPassword ? "text" : "password"}
                            placeholder="******************"
                            onChange={handlePassword}
                          />
                          { !isShowPassword ?
                            <UnHideIcon 
                              className="cursor-pointer absolute top-1/2 transform -translate-y-3 right-3"
                              onClick={() => setIsShowPassword(!isShowPassword)}
                            />
                            : <HideIcon 
                              className="cursor-pointer absolute top-1/2 transform -translate-y-3 right-3"
                              onClick={() => setIsShowPassword(!isShowPassword)}
                            />
                          }
                        </div>
                        {
                          isNoUserName && !isNoPassword ?
                          <p className="text-red-500 text-xs italic">Please enter an username.</p>
                          : ''
                        }
                        {
                          isNoPassword && !isNoUserName ?
                          <p className="text-red-500 text-xs italic">Please enter a password.</p>
                          : ''
                        }
                        {
                          isNoPassword && isNoUserName ?
                          <p className="text-red-500 text-xs italic">Please enter username and password.</p>
                          : ''
                        }
                        {
                          isNoPermission ?
                          <p className="text-red-500 text-xs italic">username or password not correct please try again.</p>
                          : ''
                        }
                    </div>
                    <div className="flex items-center justify-between">
                        <button 
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                        type="button"
                        onClick={() => validateSubmitBtn()} 
                        >
                        Sign In
                        </button>
                        <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                        Forgot Password?
                        </a>
                    </div>
                </form>
            </div>
            <p className="text-center text-white text-xs">
            &copy;2023 คณิต นายโอม All rights reserved.
            </p>
        </div>
    </div>
  );
}

export default LoginPopup;
