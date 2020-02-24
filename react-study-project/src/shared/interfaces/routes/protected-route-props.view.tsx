import { RouteProps, RouteComponentProps } from "react-router-dom";

export interface ProtectedRouteProps extends RouteProps {
  component: React.FC<RouteComponentProps<any, any, any>>;
}