import { HomePageProps } from "../home/HomePage";

export type PageType = 'home';

export interface PagePropsAbstract<T extends PageType = PageType> {
    type: T;
}

export type PageProps = HomePageProps;
