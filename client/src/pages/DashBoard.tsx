import { use, useEffect } from 'react';
import { useAppSelector } from '../redux/store/hooks';

export default function DashBoard() {
  const { user } = useAppSelector((state) => state.user);

  useEffect(() => {
    console.log('user', user);
  }, [use]);
  return <div>DashBoard</div>;
}
