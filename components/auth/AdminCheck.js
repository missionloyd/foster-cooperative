import Link from 'next/link';
import { useContext } from 'react';
import { UserContext } from '../../lib/context';

// Component's children only shown to logged-in users
export default function AdminCheck(props) {
  const { user } = useContext(UserContext);

  return (user?.uid === props?.user.uid) ? props.children : props.fallback || <Link href="/auth">This is not your profile...</Link>;
}