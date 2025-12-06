import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
  type SignUpForm = {
    user_name: string;
    email: string;
    password: string;
  };
  const [formData, setFormData] = useState<SignUpForm>({
    user_name: '',
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [responseMessage, setResponseMessage] = useState<string>('');

  const navigate = useNavigate();

  const onChangeListener = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');
    setResponseMessage('');

    try {
      setIsLoading(true);
      const res: Response = await fetch('/app/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setResponseMessage(data.message);
        // navigate('/signin');
        return;
      }

      setErrorMessage(data.message);
      setIsLoading(false);
    } catch (error: any) {
      if (error instanceof Error) setErrorMessage(error.message);
      else setErrorMessage(error);
    } finally {
      setIsLoading(false);
    }
  };

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
            <form className="flex flex-col gap-4" onSubmit={onSubmitHandler}>
              <div>
                <Label>UserName</Label>
                <TextInput type="text" placeholder="UserName" name="user_name" onChange={onChangeListener} />
              </div>
              <div>
                <Label>Email</Label>
                <TextInput type="email" placeholder="name@company.in" name="email" onChange={onChangeListener} />
              </div>
              <div>
                <Label>Password</Label>
                <TextInput type="password" placeholder="password" name="password" onChange={onChangeListener} />
              </div>
              <Button
                type="submit"
                className="bg-linear-to-r from-purple-500 to-pink-500 cursor-pointer hover:scale-105 transition-transform duration-200"
                disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Spinner size="sm" />
                    <span>Loading...</span>
                  </>
                ) : (
                  'Sign up'
                )}
              </Button>
            </form>

            {/* Have an acoount */}
            <div className="flex gap-2 mt-5 text-sm">
              <span>Have an account?</span>
              <Link to="/signin" className="text-blue-600">
                Sign In
              </Link>
            </div>

            {(errorMessage && (
              <>
                <Alert className="mt-5" color="failure">
                  {errorMessage}
                </Alert>
              </>
            )) ||
              (responseMessage && (
                <>
                  <Alert className="mt-5" color="success">
                    {' '}
                    {responseMessage}
                  </Alert>
                </>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
