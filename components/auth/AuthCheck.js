import Link from 'next/link';
import { useContext } from 'react';
import { UserContext } from '../../lib/context';

// Component's children only shown to logged-in users
export default function AuthCheck(props) {
  const { user } = useContext(UserContext);
  const { token } = useContext(UserContext);

  return (user || token) ? props.children : props.fallback || <Link href="/auth">You must be signed in</Link>;
}