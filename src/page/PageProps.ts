import { HomePageProps } from "../home/HomePage";
import { LoginPageProps } from "../login/LoginPage";

export type PageType = 'home' | 'login';

export interface PagePropsAbstract<T extends PageType = PageType> {
    type: T;
}

export type PageProps = HomePageProps | LoginPageProps;
