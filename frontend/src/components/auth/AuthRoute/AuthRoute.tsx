
import { Navigate } from 'react-router-dom'

interface IAuthRouteProps {
    children: JSX.Element,
    isLoggedIn: boolean
}

export default function AuthRoute (props: IAuthRouteProps) {
  if (props.isLoggedIn) {
    return <Navigate to='/dashboard' replace />
  }
  return props.children
}

// import { Navigate } from 'react-router-dom';

// interface AuthRouteProps {
//     redirectedPath: string;
//     isLoggedIn: boolean;
//     outlet: JSX.Element
// }

// const AuthRoute: React.FC<AuthRouteProps> = ({isLoggedIn, redirectedPath, outlet}) => {
//   if (!isLoggedIn) {
//     return outlet
//   } else {
//     return <Navigate to={redirectedPath} />
//   }
// };

// export default AuthRoute;
