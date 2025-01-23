import { Avatar, AvatarImage } from "@radix-ui/react-avatar"
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover"
import { LogOut, User2 } from "lucide-react"
import { Button } from "./button"
import { Link, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { toast } from "sonner"
import axios from "axios"
import { USER_API_ENEDPOINT } from "@/utils/constant"
import { useDispatch } from "react-redux"
import { setUser } from "@/redux/authSlice"
import PropTypes from 'prop-types'; // Import PropTypes for prop validation

// Default avatar if user doesn't have a profile picture
const DefaultAvatar = ({ name }) => {
  return (
    <div className="w-10 h-10 flex items-center justify-center bg-gray-400 text-white rounded-full">
      {name ? name[0] : "U"}
    </div>
  );
}

// Prop validation for DefaultAvatar component
DefaultAvatar.propTypes = {
  name: PropTypes.string // Ensuring name is a string
};

const Navbar = () => {

  const { user } = useSelector(store => store.auth)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logout = async () => {
    try {
      const res = await axios.get(`${USER_API_ENEDPOINT}/logout`, { withCredentials: true })
      if (res.data.success) {
        dispatch(setUser(null))
        navigate('/login')
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  }

  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl px-4 py-3">
        <div>
          <h1 className="text-2xl font-bold md:text-xl">Job<span className="text-purple-500 md:text-xl">Connect</span></h1>
        </div>
        <div className="flex items-center gap-12 md:gap-4">
          {user ? (
            <ul className="flex font-medium items-center gap-5 hidden md:flex">
              {user.role === 'recruiter' ? (
                <>
                  <Link to='/admin/companies'><li>Companies</li></Link>
                  <Link to='/admin/jobs'><li>Jobs</li></Link>
                </>
              ) : (
                <>
                  <Link to='/'><li>Home</li></Link>
                  <Link to='/jobs'><li>Jobs</li></Link>
                  <Link to='/browse'><li>Browse</li></Link>
                </>
              )}
            </ul>
          ) : null}

          {!user ? (
            <div className="flex items-center gap-2">
              <Link to='/login'><Button variant='outline'>Login</Button></Link>
              <Link to='/signup'><Button className='bg-[#6A38C2] hover:bg-[#5b30a6]'>Signup</Button></Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  {user?.profile?.profilePic ? (
                    <AvatarImage className="w-10 h-10 rounded-full" src={user?.profile?.profilePic} alt={user?.name} />
                  ) : (
                    <DefaultAvatar name={user?.name} /> // Fallback avatar when no profile picture is available
                  )}
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="flex gap-4 space-y-2 bg-white">
                  <Avatar className="cursor-pointer">
                    {user?.profile?.profilePic ? (
                      <AvatarImage className="w-10 h-10 rounded-full" src={user?.profile?.profilePic} alt={user?.name} />
                    ) : (
                      <DefaultAvatar name={user?.name} />
                    )}
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{user?.name}</h4>
                    <p className="text-sm text-muted-foreground">{user?.email}</p>
                  </div>
                </div>
                <div className="flex flex-col py-2 text-gray-600 bg-white">
                  {user.role === 'student' && (
                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <User2 />
                      <Link to='/viewProfile'><Button variant='link' className='hover:underline'>View Profile</Button></Link>
                    </div>
                  )}
                  <div className="flex w-fit items-center gap-2 cursor-pointer">
                    <LogOut />
                    <Button variant='link' onClick={logout} className='hover:underline'>Logout</Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>

        {/* Hamburger menu for mobile view */}
        <div className="md:hidden flex items-center">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon" className="p-2 rounded-full">
                <span className="block w-6 h-0.5 bg-black"></span>
                <span className="block w-6 h-0.5 bg-black my-1"></span>
                <span className="block w-6 h-0.5 bg-black"></span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48 bg-white shadow-lg p-4 space-y-3">
              <div className="flex flex-col">
                {!user ? (
                  <>
                    <Link to='/login'><Button variant='outline' className="w-full">Login</Button></Link>
                    <Link to='/signup'><Button className='bg-[#6A38C2] hover:bg-[#5b30a6] w-full'>Signup</Button></Link>
                  </>
                ) : (
                  <>
                    {user.role === 'recruiter' ? (
                      <>
                        <Link to='/admin/companies'><Button variant='link' className="w-full">Companies</Button></Link>
                        <Link to='/admin/jobs'><Button variant='link' className="w-full">Jobs</Button></Link>
                      </>
                    ) : (
                      <>
                        <Link to='/'><Button variant='link' className="w-full">Home</Button></Link>
                        <Link to='/jobs'><Button variant='link' className="w-full">Jobs</Button></Link>
                        <Link to='/browse'><Button variant='link' className="w-full">Browse</Button></Link>
                      </>
                    )}
                  </>
                )}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  )
}


export default Navbar
