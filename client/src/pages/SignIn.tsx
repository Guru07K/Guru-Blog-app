import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/store/hooks';
import { clearMessage, FailedAction, initProcess, signInSuccess } from '../redux/slice/User.slice';
import toast from 'react-hot-toast';

export default function SignIn() {
  type SignUpForm = {
    email: string;
    password: string;
  };
  const [formData, setFormData] = useState<SignUpForm>({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, error: errorMessage, loading: isLoading, message: successMessage } = useAppSelector((state) => state.user);

  const onChangeListener = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      dispatch(initProcess());
      const res: Response = await fetch('/app/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate('/');
        return;
      }
      dispatch(FailedAction(data.message));
    } catch (error: any) {
      dispatch(FailedAction(error.message));
    }
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage, { duration: 5000 });
      dispatch(clearMessage());
    }
    if (errorMessage) {
      toast.error(errorMessage, { duration: 8000 });
      dispatch(clearMessage());
    }
  }, [successMessage, errorMessage]);

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
                  'Sign In'
                )}
              </Button>
            </form>

            {/* Have an acoount */}
            <div className="flex gap-2 mt-5 text-sm">
              <span>Dont Have an account?</span>
              <Link to="/signup" className="text-blue-600">
                Sign Up
              </Link>
            </div>

            {errorMessage && (
              <>
                <Alert className="mt-5" color="failure">
                  {errorMessage}
                </Alert>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
