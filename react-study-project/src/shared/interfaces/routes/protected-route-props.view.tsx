import { RouteProps, RouteComponentProps } from "react-router-dom";

export interface ProtectedRouteProps extends RouteProps {
  component: React.ComponentType<RouteComponentProps<any>> ;
}