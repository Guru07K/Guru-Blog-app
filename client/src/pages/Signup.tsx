import { Button, Label, TextInput } from 'flowbite-react';
import { Link } from 'react-router-dom';

export default function Signup() {
  return (
    <>
      <div className="min-h-screen mt-20">
        <div
          className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row
        md:items-center gap-5">
          {/* left */}
          <div className="flex-1">
            <Link to="/" className="font-bold dark:text-white text-4xl">
              <span className="px-2 py-2 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">Guru's</span>
              Blog
            </Link>
            <p className="text-sm mt-5">This is demo projects</p>
          </div>

          {/* right */}
          <div className="flex-1">
            <form className="flex flex-col gap-4">
              <div>
                <Label>UserName</Label>
                <TextInput type="text" placeholder="UserName" id="user_name" />
              </div>
              <div>
                <Label>Email</Label>
                <TextInput type="email" placeholder="name@company.in" id="email" />
              </div>
              <div>
                <Label>Password</Label>
                <TextInput type="password" placeholder="password" id="password" />
              </div>
              <Button
                type="submit"
                className="bg-linear-to-r from-purple-500 to-pink-500 cursor-pointer hover:scale-103 transition-transform duration-200">
                Sign up
              </Button>
            </form>

            {/* Have an acoount */}
            <div className="flex gap-2 mt-5 text-sm">
              <span>Have an account?</span>
              <Link to="/signin" className="text-blue-600">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
