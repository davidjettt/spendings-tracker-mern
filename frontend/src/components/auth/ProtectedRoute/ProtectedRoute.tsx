import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
    // redirectedPath: string;
    // isLoggedIn: boolean;
    // outlet: JSX.Element
    isLoggedIn: boolean
    children: JSX.Element
}

export default function ProtectedRoute (props: ProtectedRouteProps) {
    if (!props.isLoggedIn) {
      return <Navigate to='/' replace />
    }
    return props.children
  }

// const ProtectedRoute: React.FC<ProtectedRouteProps> = ({isLoggedIn, redirectedPath, outlet}) => {
//   if (isLoggedIn) {
//     return outlet
//   } else {
//     return <Navigate to={redirectedPath} replace />
//   }
// };

// export default ProtectedRoute;
